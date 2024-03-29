interface IOption {
  parent: HTMLElement | string,
  direction?: string,
  gutterCln?: string,
  gutterSize?: number,
  minSize?: number,
  sizes: Array<number>,
  onDragEnd?: any
}

export default function SplitViews(op: IOption) {
  const isNode = (n: HTMLElement | string) => typeof n === "string" ? document.querySelector(n) : n;
  const convertSizes = (s: Array<number>) => s && s.length > 0 ? s.map(s => s / 100) : [];

  const setSizes = (children: Array<HTMLElement>, isHr: boolean) => {
    let isNotGutter = 0
    for (const child of children) {
      if (child.classList.contains(ops.gutterCln)) {
        child.style.flex = `0 0 ${ops.gutterSize}px`
        child.style.cursor = (isHr ? 'col' : 'row') + '-resize'
      }
      else {
        child.style.flex = '' + (ops.sizes.length > 0 ? ops.sizes[isNotGutter] : 1)
        isNotGutter++
      }
    }
  }

  let ops = {
    parent: isNode(op.parent) || '.split-view',
    direction: op.direction,
    gutterCln: 'sp-gutter',
    gutterSize: op.gutterSize || 5,
    minSize: op.minSize || 0,
    sizes: convertSizes(op.sizes),
    onDragEnd: op.onDragEnd
  };

  let parentEL: any = ops.parent,
    children = [...parentEL.children],
    leftChild: HTMLElement,
    rightChild: HTMLElement,
    gutter: any,
    addEvent = parentEL.addEventListener,
    rmEvent = parentEL.removeEventListener

  let isHr = ops.direction === 'horizontal',
    isTouch = false,
    isMouseDown = false;

  let leftSize = 0,
    rightSize = 0,
    sumGrow = 0,
    sumSize = 0,
    lastPos = 0;

  parentEL.dataset.minsize = ops.minSize
  parentEL.style.flexDirection = isHr ? 'row' : 'column';

  setSizes(children, isHr);

  const resize = () => {
    leftChild.style.flexGrow = (sumGrow * (leftSize / sumSize)).toString();
    rightChild.style.flexGrow = (sumGrow * (rightSize / sumSize)).toString();
  }

  function onStart(e: any) {
    gutter = e.target
    isMouseDown = true

    if (!gutter.classList.contains(ops.gutterCln)) {
      isMouseDown = false
      return
    }

    parentEL = gutter.parentNode
    isHr = parentEL.classList.contains('horizontal')

    isTouch = /^touch/g.test(e.type)
    leftChild = gutter.previousElementSibling
    rightChild = gutter.nextElementSibling

    if (leftChild && rightChild) {

      leftSize = isHr
        ? leftChild.offsetWidth
        : leftChild.offsetHeight

      rightSize = isHr
        ? rightChild.offsetWidth
        : rightChild.offsetHeight

      e = isTouch
        ? e.changedTouches[0]
        : e

      lastPos = isHr
        ? e.pageX
        : e.pageY

      sumSize = leftSize + rightSize
      sumGrow = Number(leftChild.style.flexGrow) + Number(rightChild.style.flexGrow)
    }

    if (isTouch) {
      addEvent("touchmove", onMove)
      addEvent("touchend", onStop)
      addEvent("touchcancel", onStop)
    }
    else {
      addEvent("mousemove", onMove)
      addEvent("mouseup", onStop)
    }
  }

  function onMove(e: any) {
    if (isMouseDown) {
      e = isTouch
        ? e.changedTouches[0]
        : e

      const minsize = parseInt(parentEL.dataset.minsize, 10);

      let pageDir = isHr ? e.pageX : e.pageY,
        diff = pageDir - lastPos;

      leftSize += diff;
      rightSize -= diff;

      if (leftSize > minsize && rightSize > minsize) {
        resize();
      }

      lastPos = pageDir
    }

    if (!isTouch) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  function onStop() {
    isMouseDown = false
    gutter = null

    if (ops.onDragEnd) {
      const newSizes: Array<number> = []
      for (const child of children) {
        if (!child.classList.contains(ops.gutterCln)) newSizes.push(child.style.flexGrow * 100)
      }
      ops.onDragEnd(newSizes)
    }

    rmEvent("touchmove", onMove)
    rmEvent("touchend", onStop)
    rmEvent("touchcancel", onStop)
    rmEvent("mousemove", onMove)
    rmEvent("mouseup", onStop)
  }

  addEvent("touchstart", onStart)
  addEvent("mousedown", onStart)

  return {
    parent: parentEL,
    destroy() {
      rmEvent("touchstart", onStart)
      rmEvent("mousedown", onStart)
    }
  }
}
