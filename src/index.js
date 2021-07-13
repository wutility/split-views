export default function SplitViews (ops) {
  function isNode (node) {
    return typeof node === "string" ? document.querySelector(node) : node;
  }

  function convertSizes (sizes) {
    return sizes && sizes.length > 0 ? sizes.map(s => s / 100) : [];
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

  let parentEL = options.parent,
    children = Array.from(parentEL.children),
    leftChild = null,
    rightChild = null,
    isHorizontal = options.direction === 'horizontal',
    isMouseDown = false;

  let leftSize = 0, rightSize = 0, sumGrow = 0, sumSize = 0, lastPos = 0;

  parentEL.style.flexDirection = isHorizontal ? 'row' : 'column';

  let isNotGutter = 0;
  for (const child of children) {
    if (child.classList.contains('sp-gutter')) {
      child.style.flex = `0 0 ${ops.gutterSize}px`;
      child.style.cursor = isHorizontal ? 'col-resize' : 'row-resize'
    }
    else {
      child.style.flex = options.sizes.length > 0 ? options.sizes[isNotGutter] : 1;
      isNotGutter++;
    }
  }

  function onMouseDown (event) {
    isMouseDown = true;

    let gutter = event.target;

    if (!parentEL || !gutter.classList.contains('sp-gutter')) {
      isMouseDown = false;
      return;
    }    

    leftChild = gutter.previousElementSibling;
    rightChild = gutter.nextElementSibling;

    if (leftChild && rightChild) {
      leftSize = isHorizontal ? leftChild.offsetWidth : leftChild.offsetHeight;
      rightSize = isHorizontal ? rightChild.offsetWidth : rightChild.offsetHeight;
      lastPos = isHorizontal ? event.pageX : event.pageY;

      sumSize = leftSize + rightSize;
      sumGrow = Number(leftChild.style.flexGrow) + Number(rightChild.style.flexGrow);

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    event.preventDefault();
    event.stopPropagation();
  }

  function onMouseMove (event) {
    if (isMouseDown) {
      let pageDir = isHorizontal ? event.pageX : event.pageY;
      let diff = pageDir - lastPos;

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
    event.preventDefault();
    event.stopPropagation();
  }

  function onMouseUp () {
    isMouseDown = false;
    if (options.onDragEnd) {
      let newSizes = [];
      for (const child of children) {
        if (!child.classList.contains('sp-gutter')) newSizes.push(child.style.flexGrow * 100);
      }
      options.onDragEnd(newSizes);
    }
    window.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("mouseup", onMouseUp)
  }

  window.addEventListener("mousedown", onMouseDown)
}
