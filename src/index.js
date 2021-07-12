import './index.css';

export default function SplitViews (ops) {
  function isNode (node) {
    return typeof node === "string" ? document.querySelector(node) : node;
  }

  function convertSizes (sizes) {
    return sizes && sizes.length > 0 ? sizes.map(s => s / 100) : [];
  }

  let options = {
    parent: isNode(ops.parent) || '.split-view',
    direction: ops.direction,
    gutterSize: ops.gutterSize || 5,
    minSize: (ops.minSize || 20) / 100,
    sizes: convertSizes(ops.sizes),
    onDragEnd: ops.onDragEnd || null
  };

  let parentEL = options.parent,
    children = Array.from(parentEL.children),
    leftChild = null,
    rightChild = null,
    isHorizontal = true,
    isMouseDown = false;

  let leftSize = 0,
    rightSize = 0,
    sumGrow = 0,
    sumSize = 0,
    lastPos = 0;

  let isNotGutter = 0;
  for (const child of children) {
    if (child.classList.contains('gutter')) {
      child.style.flex = `0 0 ${ops.gutterSize}px`;
    }
    else {
      child.style.flex = options.sizes.length > 0 ? options.sizes[isNotGutter] : 1;
      isNotGutter++;
    }
  }

  function onMouseDown (event) {
    isMouseDown = true;

    let gutter = event.target;

    if (!gutter.classList.contains('gutter') && gutter.tagName !== "SPAN") {
      isMouseDown = false;
      return;
    }

    if (!parentEL) {
      isMouseDown = false;
      return;
    }

    isHorizontal = parentEL.classList.contains("horizontal")

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
      let pageDir = isHorizontal ? event.pageX : event.pageY,
        diff = pageDir - lastPos;

      leftSize += diff;
      rightSize -= diff;

      let prevGrowNew = sumGrow * (leftSize / sumSize);
      let nextGrowNew = sumGrow * (rightSize / sumSize);

      if (leftChild && rightChild && (prevGrowNew > options.minSize && nextGrowNew > options.minSize)) {
        leftChild.style.flexGrow = prevGrowNew;
        rightChild.style.flexGrow = nextGrowNew;
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
        if (!child.classList.contains('gutter')) newSizes.push(child.style.flexGrow * 100);
      }
      options.onDragEnd(newSizes);
    }
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  window.addEventListener("mousedown", onMouseDown);
}
