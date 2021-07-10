export default function SplitViews (options) {
  function isNode (node) {
    return typeof node === "string" ? document.getElementById(node) : node;
  }

  function numFormat (num) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });
    return formatter.format(num)
  }

  let defaultOptions = {
    parent: 'split-view',
    direction: 'vertical',
    gutterSize: 5,
    minSize: 20,
    sizes: [],
    onDragEnd: options.onDragEnd,
    ...options
  };

  let parentElement = isNode(defaultOptions.parent),
    children = Array.from(parentElement.children),
    isMouseOnGutter = false,
    childSize = 100 / children.length;

  let direction = defaultOptions.direction,
    sizes = defaultOptions.sizes,
    onDragEnd = defaultOptions.onDragEnd,
    gutterId = 0,
    offset = 0;

  let leftChild = null, rightChild = null, leftChildRect = {}, rightChildRect = {};
  let sizeDir = direction === 'vertical' ? 'width' : 'height';

  for (let index = 0; index < children.length; index++) {
    const child = children[index];

    let gutterSize = defaultOptions.gutterSize / 2;

    child.style[sizeDir] = sizes.length === children.length
      ? `calc(${sizes[index]}% - ${gutterSize}px)`
      : `calc(${childSize}% - ${gutterSize}px)`;

    if (index < children.length - 1) {
      const gutter = document.createElement('span'),
        gutterCls = direction === 'vertical' ? "gutter-vertical" : "gutter-horizontal";

      gutter.classList.add("gutter", gutterCls);

      gutter.style[sizeDir] = defaultOptions.gutterSize + 'px';
      gutter.dataset.id = index;
      child.parentNode.insertBefore(gutter, child.nextSibling);
    }
  }

  function onMouseDown (e) {
    if (e.target && e.target.classList.contains('gutter')) {
      isMouseOnGutter = true;
      gutterId = parseInt(e.target.dataset.id, 10);

      offset = direction === 'vertical' ? e.offsetX : e.offsetY;

      leftChild = children[gutterId];
      rightChild = children[gutterId + 1];

      leftChildRect = leftChild.getBoundingClientRect();
      rightChildRect = rightChild.getBoundingClientRect();

      parentElement.addEventListener('mousemove', onMouseMove, false);
      parentElement.addEventListener('mouseup', onMouseUp, false);
    }
  }

  function onMouseUp () {
    isMouseOnGutter = false;
    parentElement.removeEventListener('mousemove', onMouseMove, false);
    parentElement.removeEventListener('mouseup', onMouseUp, false);

    if (onDragEnd) {
      let parentSize = direction === 'vertical'
        ? parentElement.offsetWidth
        : parentElement.offsetHeight;

      let newSizes = children.map(child => child.getBoundingClientRect().width / parentSize * 100);
      onDragEnd(newSizes);
    }
  }

  function onMouseMove (e) {
    if (isMouseOnGutter && leftChild && rightChild) {

      let parentSize = direction === 'vertical'
        ? parentElement.offsetWidth : parentElement.offsetHeight;

      let leftElNewSize = direction === 'vertical'
        ? (e.clientX - leftChildRect.x) - offset
        : (e.clientY - leftChildRect.y) - offset;

      let rightElNewSize = direction === 'vertical'
        ? rightChildRect.width + (leftChildRect.width - leftElNewSize)
        : rightChildRect.height + (leftChildRect.height - leftElNewSize);

      let leftP = numFormat(leftElNewSize / parentSize * 100);
      let rightP = numFormat(rightElNewSize / parentSize * 100);

      if (leftP >= defaultOptions.minSize && rightP >= defaultOptions.minSize) {
        leftChild.style[sizeDir] = leftP + '%';
        rightChild.style[sizeDir] = rightP + '%';
      }
    }

    e.preventDefault();
    e.stopPropagation();
  }

  parentElement.addEventListener('mousedown', onMouseDown, false);
}