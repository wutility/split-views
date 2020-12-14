function SplitPane (options) {

  let defaultOptions = {
    parentId: 'split-pane',
    direction: 'vertical',
    gutterSize: 5,
    minSize: 20,
    ...options
  };

  let splitContainer = document.getElementById(defaultOptions.parentId),
    splitChildren = [...splitContainer.children];

  let isMouseOnGutter = false,
    childSize = 100 / splitChildren.length;

  let direction = defaultOptions.direction,
    gutterId = 0,
    offset = 0,
    leftChild = null,
    rightChild = null;

  splitChildren.forEach((el, index) => {
    let prop = direction === 'vertical' ? 'width' : 'height';
    el.style[prop] = `calc(${childSize}% - ${defaultOptions.gutterSize/2}px)`;

    if (index < splitChildren.length - 1) {
      const gutter = document.createElement('span');
      const gutterCls = direction === 'vertical' ? "gutter-vertical" : "gutter-horizontal";

      gutter.classList.add("gutter", gutterCls);
      gutter.dataset.id = index;
      el.parentNode.insertBefore(gutter, el.nextSibling);
    }
  });

  function onMouseDown (e) {
    if (e.target.classList.contains('gutter')) {
      isMouseOnGutter = true;
      gutterId = parseInt(e.target.dataset.id, 10);

      leftChild = splitChildren[gutterId];
      rightChild = splitChildren[gutterId + 1];

      splitContainer.addEventListener('mousemove', onMouseMove, false);
    }
  }

  function onMouseUp () {
    isMouseOnGutter = false;
    splitContainer.removeEventListener('mousemove', onMouseMove, false);
  }

  function onMouseMove (e) {
    if (isMouseOnGutter && leftChild && rightChild) {

      let leftChildInfos = leftChild.getBoundingClientRect();
      let rightChildInfos = rightChild.getBoundingClientRect();

      if (e.target.classList.contains('gutter')) {
        offset = direction === 'vertical'
          ? (e.target.offsetLeft - e.clientX)
          : (e.target.offsetTop - e.clientY);
      }

      let leftElNewSize = direction === 'vertical'
        ? (e.clientX - leftChildInfos.x) - offset
        : (e.clientY - leftChildInfos.y) - offset;

      let rightElNewSize = direction === 'vertical'
        ? (rightChildInfos.width + (leftChildInfos.width - leftElNewSize))
        : (rightChildInfos.height + (leftChildInfos.height - leftElNewSize));

      if (leftElNewSize >= defaultOptions.minSize && rightElNewSize >= defaultOptions.minSize) {

        let prop = direction === 'vertical' ? 'width' : 'height';

        leftChild.style[prop] = leftElNewSize + 'px';
        rightChild.style[prop] = rightElNewSize + 'px';
      }
    }

    e.preventDefault();
    e.stopPropagation();
  }

  splitContainer.addEventListener('mousedown', onMouseDown, false);
  splitContainer.addEventListener('mouseup', onMouseUp, false);
}