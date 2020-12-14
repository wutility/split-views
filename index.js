function SplitPane (options) {

  let defaultOptions = {
    parentId:'split-pane',
    direction: 'vertical',
    gutterSize: 5,
    minSize: 200,
    sizes: [25, 75],
    ...options
  };

  let splitContainer = document.getElementById(defaultOptions.parentId),
    splitChildren = [...splitContainer.children];

  let isMouseOnGutter = false,
    childSize = 100 / splitChildren.length;

  let direction = defaultOptions.direction,
    gutterId = 0,
    leftChild = null,
    rightChild = null;

  console.log(childSize);

  splitChildren.forEach((el, index) => {

    let prop = direction === 'vertical' ? 'width' : 'height';
    el.style[prop] = `calc(${childSize}% - 2.5px)`;

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
      gutterId = +e.target.dataset.id;

      leftChild = splitChildren[gutterId];
      rightChild = splitChildren[gutterId + 1];

      splitContainer.addEventListener('mousemove', onMouseMove, false);
    }
  }

  function onMouseUp (e) {
    isMouseOnGutter = false;
    splitContainer.removeEventListener('mousemove', onMouseMove, false);
  }

  function onMouseMove (e) {
    if (isMouseOnGutter && leftChild && rightChild) {

      let leftChildInfos = leftChild.getBoundingClientRect();
      let rightChildInfos = rightChild.getBoundingClientRect();

      let leftElNewSize = direction === 'vertical'
        ? (e.clientX - leftChildInfos.x)
        : (e.clientY - leftChildInfos.y);

      let nextElNewWidth = direction === 'vertical'
        ? rightChildInfos.width + (leftChildInfos.width - leftElNewSize)
        : rightChildInfos.height + (leftChildInfos.height - leftElNewSize);

      if (leftElNewSize >= 0 && nextElNewWidth >= 0) {

        let prop = direction === 'vertical' ? 'width' : 'height';

        leftChild.style[prop] = `calc(${leftElNewSize}px)`;
        rightChild.style[prop] = `calc(${nextElNewWidth}px)`;
      }
    }
  }

  splitContainer.addEventListener('mousedown', onMouseDown, false);
  splitContainer.addEventListener('mouseup', onMouseUp, false);
}