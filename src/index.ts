export interface SplitOptions {
  root: HTMLElement | string;
  direction?: 'horizontal' | 'vertical';
  gutterSize?: number;
  gutterClassName?: string;
  minSize?: number | number[];
  sizes?: number[];
  snapOffset?: number;
  onDrag?: (sizes: number[]) => void;
  onDragEnd?: (sizes: number[]) => void;
}

export default function SplitViews(opts: SplitOptions) {
  const toEl = (sel: HTMLElement | string): HTMLElement =>
    typeof sel === 'string' ? (document.querySelector(sel) as HTMLElement) : sel;

  const clamp = (n: number, min: number, max: number): number => Math.min(Math.max(n, min), max);

  const HORIZONTAL = 'horizontal' as const;
  const VERTICAL = 'vertical' as const;

  let root: HTMLElement;
  let panes: HTMLElement[];

  if (Array.isArray(opts.root)) {
    throw new Error('SplitViews: root must be HTMLElement | string');
  }

  root = toEl(opts.root);
  panes = Array.from(root.children) as HTMLElement[];

  const dir = opts.direction === VERTICAL ? VERTICAL : HORIZONTAL;
  const isH = dir === HORIZONTAL;
  const gutterSz = opts.gutterSize ?? 10;
  const snapOffset = opts.snapOffset ?? 0;

  const mins: ReadonlyArray<number> = Array.isArray(opts.minSize)
    ? opts.minSize
    : Array(panes.length).fill(opts.minSize ?? 0);

  if (Array.isArray(opts.minSize) && panes.length !== mins.length) {
    throw new Error('SplitViews: minSize array length must equal pane count');
  }

  /* ---------- build gutters --------------------------------------------- */
  const gutters: HTMLElement[] = [];
  panes.forEach((pane, idx) => {
    pane.setAttribute('data-split-pane', String(idx));
    pane.style.flex = '0 0 auto';
  });
  for (let i = 1; i < panes.length; i++) {
    const g = document.createElement('div');
    g.className = opts.gutterClassName ?? 'split-gutter';
    g.style.cssText = `flex: 0 0 var(--split-gutter-size, ${gutterSz}px); cursor: var(--split-cursor, ${isH ? 'col-resize' : 'row-resize'}); touch-action: none;`;
    g.setAttribute('role', 'separator');
    g.setAttribute('aria-orientation', isH ? 'vertical' : 'horizontal');
    g.tabIndex = 0;
    g.dataset.gutterIndex = String(i - 1);
    root.insertBefore(g, panes[i]);
    gutters.push(g);
  }

  /* ---------- container -------------------------------------------------- */
  root.style.display = 'flex';
  root.style.flexDirection = isH ? 'row' : 'column';
  root.style.setProperty('--split-gutter-size', `${gutterSz}px`);
  root.style.setProperty('--split-cursor', isH ? 'col-resize' : 'row-resize');

  /* ---------- sizes (via CSS variables) --------------------------------- */
  let currentSizes: number[] = opts.sizes?.length ? [...opts.sizes] : Array(panes.length).fill(100 / panes.length);

  function applySizes(indices?: number[]): void {
    const totalPct = currentSizes.reduce((a, b) => a + b, 0);
    const safeSizes = totalPct === 0 ? Array(panes.length).fill(100 / panes.length) : currentSizes.map(s => (s / totalPct) * 100);
    const gutterTotal = gutters.length * gutterSz;

    const targets = indices ?? panes.map((_, i) => i);

    requestAnimationFrame(() => {
      targets.forEach(i => {
        const pct = safeSizes[i];
        const val = `calc(${pct}% - ${(pct / 100) * gutterTotal}px)`;
        root.style.setProperty(`--pane-${i}-size`, val);
        panes[i].style.flexBasis = `var(--pane-${i}-size)`;
      });
    });
  }
  applySizes();

  /* ---------- drag state ------------------------------------------------- */
  let activeGutter: HTMLElement | null = null;
  let prevIdx = -1;
  let nextIdx = -1;
  let startCoord = 0;
  let prevStartPct = 0;
  let nextStartPct = 0;
  let lastClientCoord = 0;
  let isTicking = false;
  let rootPx = 0;

  /* ---------- handlers (reused) ----------------------------------------- */
  const onMove = (ev: PointerEvent): void => {
    if (!activeGutter) return;

    lastClientCoord = isH ? ev.clientX : ev.clientY;

    if (!isTicking) {
      requestAnimationFrame(() => {
        if (!activeGutter) {
          isTicking = false;
          return;
        }

        const deltaPx = lastClientCoord - startCoord;
        const deltaPct = (deltaPx / rootPx) * 100;

        let prevPct = prevStartPct + deltaPct;
        let nextPct = nextStartPct - deltaPct;

        const prevMinPx = mins[prevIdx];
        const nextMinPx = mins[nextIdx];
        const prevMinPct = (prevMinPx / rootPx) * 100;
        const nextMinPct = (nextMinPx / rootPx) * 100;

        const prevSnap = ((prevMinPx + snapOffset) / rootPx) * 100;
        const nextSnap = ((nextMinPx + snapOffset) / rootPx) * 100;

        if (prevPct <= prevSnap) prevPct = prevMinPct;
        if (nextPct <= nextSnap) nextPct = nextMinPct;

        prevPct = clamp(prevPct, prevMinPct, 100 - nextMinPct);
        nextPct = clamp(nextPct, nextMinPct, 100 - prevMinPct);

        const total = prevPct + nextPct;
        if (total > 0) {
          prevPct = (prevPct / total) * (prevStartPct + nextStartPct);
          nextPct = (nextPct / total) * (prevStartPct + nextStartPct);
        }

        currentSizes[prevIdx] = prevPct;
        currentSizes[nextIdx] = nextPct;

        applySizes([prevIdx, nextIdx]);
        opts.onDrag?.([...currentSizes]);
        isTicking = false;
      });
      isTicking = true;
    }
  };

  const onUp = (ev: PointerEvent): void => {
    if (!activeGutter) return;
    activeGutter.releasePointerCapture(ev.pointerId);
    activeGutter.removeEventListener('pointermove', onMove);
    opts.onDragEnd?.([...currentSizes]);
    activeGutter = null;
  };

  function onDown(ev: PointerEvent, gutter: HTMLElement): void {
    ev.preventDefault();
    activeGutter = gutter;
    prevIdx = parseInt(gutter.dataset.gutterIndex!);
    nextIdx = prevIdx + 1;

    startCoord = isH ? ev.clientX : ev.clientY;
    prevStartPct = currentSizes[prevIdx];
    nextStartPct = currentSizes[nextIdx];
    rootPx = isH ? root.offsetWidth : root.offsetHeight;

    gutter.setPointerCapture(ev.pointerId);
    gutter.addEventListener('pointermove', onMove);
    gutter.addEventListener('pointerup', onUp, { once: true });
  }

  // Delegate pointerdown to root
  const onRootDown = (e: Event) => {
    const target = e.target as HTMLElement;
    if (gutters.includes(target)) {
      onDown(e as PointerEvent, target);
    }
  };

  root.addEventListener('pointerdown', onRootDown);

  /* ---------- public API ------------------------------------------------- */
  return {
    root,
    destroy(): void {
      gutters.forEach(g => g.remove());
      root.removeEventListener('pointerdown', onRootDown);

      root.style.removeProperty('display');
      root.style.removeProperty('flex-direction');
      root.style.removeProperty('--split-gutter-size');
      root.style.removeProperty('--split-cursor');

      panes.forEach((pane, i) => {
        pane.style.removeProperty('flex-basis');
        pane.style.removeProperty('flex');
        root.style.removeProperty(`--pane-${i}-size`);
      });
    },
    setSizes(sizes: number[]): void {
      if (sizes.length !== panes.length) return;
      currentSizes = [...sizes];
      applySizes();
    },
    getSizes: (): number[] => [...currentSizes]
  };
}