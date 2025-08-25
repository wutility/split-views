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
    typeof sel === 'string'
      ? (document.querySelector(sel) as HTMLElement)
      : sel;

  const clamp = (n: number, min: number, max: number) =>
    Math.min(Math.max(n, min), max);

  const HORIZONTAL = 'horizontal';
  const VERTICAL = 'vertical';

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

  const mins = Array.isArray(opts.minSize)
    ? opts.minSize
    : Array(panes.length).fill(opts.minSize ?? 0);

  if (panes.length !== mins.length) {
    throw new Error('SplitViews: minSize array length must equal pane count');
  }

  /* ---------- build gutters --------------------------------------------- */
  const gutters: HTMLElement[] = [];
  panes.forEach((pane, idx) => {
    pane.setAttribute('data-split-zero-pane', String(idx));
  });
  for (let i = 1; i < panes.length; i++) {
    const g = document.createElement('div');
    g.className = opts.gutterClassName ?? 'split-zero-gutter';
    g.style.cssText = `
      flex: 0 0 ${gutterSz}px;
      cursor: ${isH ? 'col-resize' : 'row-resize'};
      background: #ddd;
      touch-action: none;
    `;
    root.insertBefore(g, panes[i]);
    gutters.push(g);
  }

  /* ---------- container -------------------------------------------------- */
  root.style.display = 'flex';
  root.style.flexDirection = isH ? 'row' : 'column';

  /* ---------- sizes ------------------------------------------------------ */
  let currentSizes: number[] = opts.sizes?.length
    ? [...opts.sizes]
    : Array(panes.length).fill(100 / panes.length);

  function applySizes() {
    const totalPct = currentSizes.reduce((a, b) => a + b, 0);
    const safeSizes =
      totalPct === 0
        ? Array(panes.length).fill(100 / panes.length)
        : currentSizes.map(s => (s / totalPct) * 100);
    const dim = isH ? 'width' : 'height';
    const gutterTotal = gutters.length * gutterSz;

    panes.forEach((pane, i) => {
      const pct = safeSizes[i];
      (pane.style as any)[dim] = `calc(${pct}% - ${(pct / 100) * gutterTotal}px)`;
      pane.style.flex = '0 0 auto';
    });
  }
  applySizes();

  /* ---------- drag state ------------------------------------------------- */
  let activeGutter: HTMLElement | null = null;
  let aIdx = -1;
  let bIdx = -1;
  let startCoord = 0;
  let aStartPct = 0;
  let bStartPct = 0;
  let lastClientCoord = 0;
  let isTicking = false;

  /* ---------- listeners -------------------------------------------------- */
  function onDown(ev: PointerEvent, gutter: HTMLElement) {
    ev.preventDefault();
    activeGutter = gutter;
    aIdx = gutters.indexOf(gutter);
    bIdx = aIdx + 1;

    startCoord = isH ? ev.clientX : ev.clientY;
    aStartPct = currentSizes[aIdx];
    bStartPct = currentSizes[bIdx];

    gutter.setPointerCapture(ev.pointerId);
    gutter.addEventListener('pointermove', onMove);
    gutter.addEventListener('pointerup', onUp, { once: true });
  }

  function onMove(ev: PointerEvent) {
    if (!activeGutter) return;

    lastClientCoord = isH ? ev.clientX : ev.clientY;

    if (!isTicking) {
      requestAnimationFrame(() => {
        if (!activeGutter) {
          isTicking = false;
          return;
        }

        const deltaPx = lastClientCoord - startCoord;
        const rootPx = isH ? root.offsetWidth : root.offsetHeight;
        const deltaPct = (deltaPx / rootPx) * 100;

        let aPct = aStartPct + deltaPct;
        let bPct = bStartPct - deltaPct;

        const aMinPx = mins[aIdx];
        const bMinPx = mins[bIdx];
        const aMinPct = (aMinPx / rootPx) * 100;
        const bMinPct = (bMinPx / rootPx) * 100;

        /* snap logic ------------------------------------------------------ */
        const aSnap = (aMinPx + snapOffset) / rootPx * 100;
        const bSnap = (bMinPx + snapOffset) / rootPx * 100;

        if (aPct <= aSnap) aPct = aMinPct;
        if (bPct <= bSnap) bPct = bMinPct;

        aPct = clamp(aPct, aMinPct, 100 - bMinPct);
        bPct = clamp(bPct, bMinPct, 100 - aMinPct);

        const total = aPct + bPct;
        if (total > 0) {
          aPct = (aPct / total) * (aStartPct + bStartPct);
          bPct = (bPct / total) * (aStartPct + bStartPct);
        }

        currentSizes[aIdx] = aPct;
        currentSizes[bIdx] = bPct;

        applySizes();
        opts.onDrag?.(currentSizes);
        isTicking = false;
      });
      isTicking = true;
    }
  }

  function onUp(ev: PointerEvent) {
    if (!activeGutter) return;
    activeGutter.releasePointerCapture(ev.pointerId);
    activeGutter.removeEventListener('pointermove', onMove);

    opts.onDragEnd?.(currentSizes);
    activeGutter = null;
  }

  gutters.forEach(g => {
    g.addEventListener('pointerdown', e => onDown(e, g));
  });

  /* ---------- public API ------------------------------------------------- */
  return {
    root,
    destroy() {
      gutters.forEach(g => g.remove());

      root.style.display = '';
      root.style.flexDirection = '';
      panes.forEach(pane => {
        pane.style.width = '';
        pane.style.height = '';
        pane.style.flex = '';
      });
    },
    setSizes(sizes: number[]) {
      if (sizes.length !== panes.length) return;
      currentSizes = [...sizes];
      applySizes();
    },
    getSizes: () => [...currentSizes]
  };
}