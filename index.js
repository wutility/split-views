function isNode (node) {
  return typeof node === "string" ? document.getElementById(node) : node;
}

export default function SplitViews (options) {

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
    parentChildren = Array.from(parentElement.children),
    isMouseOnGutter = false,
    childSize = 100 / parentChildren.length;

  let direction = defaultOptions.direction,
    sizes = defaultOptions.sizes,
    onDragEnd = defaultOptions.onDragEnd,
    gutterId = 0,
    leftChild = null,
    rightChild = null,
    gutterOffset = defaultOptions.gutterSize / 2;

  parentChildren.forEach((el, index) => {
    let prop = direction === 'vertical' ? 'width' : 'height';
    el.style[prop] = sizes.length === parentChildren.length
      ? `calc(${sizes[index]}% - ${gutterOffset}px)`
      : `calc(${childSize}% - ${gutterOffset}px)`;

    if (index < parentChildren.length - 1) {
      const gutter = document.createElement('span');
      const gutterCls = direction === 'vertical' ? "gutter-vertical" : "gutter-horizontal";

      gutter.classList.add("gutter", gutterCls);

      gutter.style[prop] = defaultOptions.gutterSize + 'px';
      gutter.dataset.id = index;
      el.parentNode.insertBefore(gutter, el.nextSibling);
    }
  });

  function onMouseDown (e) {
    if (e.target && e.target.classList.contains('gutter')) {
      isMouseOnGutter = true;
      gutterId = parseInt(e.target.dataset.id, 10);

      leftChild = parentChildren[gutterId];
      rightChild = parentChildren[gutterId + 1];

      parentElement.addEventListener('mousemove', onMouseMove, false);
      parentElement.addEventListener('mouseup', onMouseUp, false);
    }
  }

  function onMouseUp () {
    isMouseOnGutter = false;
    parentElement.removeEventListener('mousemove', onMouseMove, false);
    parentElement.removeEventListener('mouseup', onMouseUp, false);

    if (onDragEnd) {
      let newSizes = parentChildren.map(el => el.getBoundingClientRect().width / parentElement.offsetWidth * 100);
      onDragEnd(newSizes);
    }
  }

  function onMouseMove (e) {
    if (isMouseOnGutter && leftChild && rightChild) {

      let leftChildInfos = leftChild.getBoundingClientRect();
      let rightChildInfos = rightChild.getBoundingClientRect();

      let leftElNewSize = direction === 'vertical'
        ? (e.clientX - leftChildInfos.x)
        : (e.clientY - leftChildInfos.y);

      let rightElNewSize = direction === 'vertical'
        ? (rightChildInfos.width + (leftChildInfos.width - leftElNewSize))
        : (rightChildInfos.height + (leftChildInfos.height - leftElNewSize));

      if (leftElNewSize >= defaultOptions.minSize && rightElNewSize >= defaultOptions.minSize) {

        let prop = direction === 'vertical' ? 'width' : 'height';

        leftChild.style[prop] = (leftElNewSize - gutterOffset) + 'px';
        rightChild.style[prop] = (rightElNewSize + gutterOffset) + 'px';
      }
    }

    e.preventDefault();
    e.stopPropagation();
  }

  parentElement.addEventListener('mousedown', onMouseDown, false);
}
