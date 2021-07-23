export default function SplitViews (ops) {
  function isNode (node) {
    return typeof node === "string" ? document.querySelector(node) : node
  }

  function convertSizes (sizes) {
    return sizes && sizes.length > 0 ? sizes.map(s => s / 100) : []
  }

  let options = {
    parent: isNode(ops.parent) || '.split-view',
    direction: ops.direction || true,
    gutterCln: ops.gutterCln || 'sp-gutter',
    gutterSize: ops.gutterSize || 5,
    minSize: (ops.minSize || 0) / 100,
    sizes: convertSizes(ops.sizes),
    onDragEnd: ops.onDragEnd || null
  };

  let isTouch = null,
    addEvent = window.addEventListener,
    rmEvent = window.removeEventListener;

  let parentEL = options.parent,
    children = Array.from(parentEL.children),
    leftChild = null,
    rightChild = null,
    gutter = null,
    isHr = options.direction === 'horizontal',
    isMouseDown = false;

  let leftSize = 0, rightSize = 0, sumGrow = 0, sumSize = 0, lastPos = 0;

  parentEL.style.flexDirection = isHr ? 'row' : 'column';

  let isNotGutter = 0;
  for (const child of children) {
    if (child.classList.contains('sp-gutter')) {
      child.style.flex = `0 0 ${ops.gutterSize}px`;
      child.style.cursor = (isHr ? 'col' : 'row') + '-resize'
    }
    else {
      child.style.flex = options.sizes.length > 0 ? options.sizes[isNotGutter] : 1;
      isNotGutter++;
    }
  }

  function onStart (e) {
    gutter = e.target
    isMouseDown = true

    if (!gutter.classList.contains('sp-gutter')) {
      isMouseDown = false;
      return;
    }

    isTouch = /^touch/g.test(e.type)
    leftChild = gutter.previousElementSibling;
    rightChild = gutter.nextElementSibling;

    if (leftChild && rightChild) {
      leftSize = isHr ? leftChild.offsetWidth : leftChild.offsetHeight;
      rightSize = isHr ? rightChild.offsetWidth : rightChild.offsetHeight;

      e = isTouch ? e.changedTouches[0] : e;
      lastPos = isHr ? e.pageX : e.pageY

      sumSize = leftSize + rightSize
      sumGrow = Number(leftChild.style.flexGrow) + Number(rightChild.style.flexGrow);
    }

    if (isTouch) {
      addEvent("touchmove", onMove);
      addEvent("touchend", onStop);
      addEvent("touchcancel", onStop);
    }
    else {
      addEvent("mousemove", onMove);
      addEvent("mouseup", onStop);
    }
  }

  function onMove (e) {
    if (isMouseDown) {
      e = isTouch ? e.changedTouches[0] : e      

      let pageDir = isHr ? e.pageX : e.pageY,
        diff = pageDir - lastPos;

      leftSize += diff;
      rightSize -= diff;

      let isMinSize = leftSize < options.minSize || rightSize < options.minSize;

      if (!isMinSize) {
        let prevGrowNew = sumGrow * (leftSize / sumSize);
        let nextGrowNew = sumGrow * (rightSize / sumSize);

        isMinSize = prevGrowNew < options.minSize || nextGrowNew < options.minSize;

        if (leftChild && rightChild && !isMinSize) {
          leftChild.style.flexGrow = prevGrowNew;
          rightChild.style.flexGrow = nextGrowNew;
        }
      }

      lastPos = pageDir;
    }

    if (!isTouch) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  function onStop () {
    isMouseDown = false
    gutter = null

    if (options.onDragEnd) {
      const newSizes = [];
      for (const child of children) {
        if (!child.classList.contains('sp-gutter')) newSizes.push(child.style.flexGrow * 100);
      }
      options.onDragEnd(newSizes);
    }

    if (isTouch) {
      rmEvent("touchmove", onMove)
      rmEvent("touchend", onStop)
      rmEvent("touchcancel", onStop)
    }
    else {
      rmEvent("mousemove", onMove)
      rmEvent("mouseup", onStop)
    }
  }

  addEvent("touchstart", onStart)
  addEvent("mousedown", onStart)
}
