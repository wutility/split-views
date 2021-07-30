export default function SplitViews (op) {
  const isNode = n => typeof n === "string" ? document.querySelector(n) : n;
  const convertSizes = s => s && s.length > 0 ? s.map(s => s / 100) : [];

  const setSizes = (children, isHr) => {
    let isNotGutter = 0
    for (const child of children) {
      if (child.classList.contains(ops.gutterCln)) {
        child.style.flex = `0 0 ${ops.gutterSize}px`
        child.style.cursor = (isHr ? 'col' : 'row') + '-resize'
      }
      else {
        child.style.flex = ops.sizes.length > 0 ? ops.sizes[isNotGutter] : 1
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

  let isTouch = false,
    parentEL = ops.parent,
    children = Array.from(parentEL.children),
    addEvent = parentEL.addEventListener,
    rmEvent = parentEL.removeEventListener

  let leftChild,
    rightChild,
    gutter,
    isHr = ops.direction === 'horizontal',
    isMouseDown = false;

  let leftSize = 0,
    rightSize = 0,
    sumGrow = 0,
    sumSize = 0,
    lastPos = 0;

  parentEL.dataset.minsize = ops.minSize
  parentEL.style.flexDirection = isHr ? 'row' : 'column'

  setSizes(children, isHr)

  function onStart (e) {
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

  function onMove (e) {
    if (isMouseDown) {
      e = isTouch
        ? e.changedTouches[0]
        : e

      let pageDir = isHr ? e.pageX : e.pageY,
        diff = pageDir - lastPos;

      leftSize += diff
      rightSize -= diff

      const minsize = parentEL.dataset.minsize

      if (leftSize >= minsize && rightSize >= minsize) {
        leftChild.style.flexGrow = sumGrow * (leftSize / sumSize)
        rightChild.style.flexGrow = sumGrow * (rightSize / sumSize)
      }

      lastPos = pageDir
    }

    if (!isTouch) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  function onStop () {
    isMouseDown = false
    gutter = null

    if (ops.onDragEnd) {
      const newSizes = []
      for (const child of children) {
        if (!child.classList.contains(ops.gutterCln))
          newSizes.push(child.style.flexGrow * 100);
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
}
