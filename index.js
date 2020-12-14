let splitContainer = document.getElementById('split-pane');
let splitContainerChildren = [...splitContainer.children];
let isMouseDown = false;

let sepId = 0;

let elementInitWidth = 0;
let currentElement = 0;
let nextElement = 0;

splitContainerChildren.forEach((el, i) => {

  elementInitWidth = (splitContainer.clientWidth / splitContainerChildren.length);  

  if (i < splitContainerChildren.length - 1) {
    el.style.width = 'calc(' + elementInitWidth + 'px - 1.875px)';
    const seperator = document.createElement('span');
    seperator.classList.add("seperator");
    seperator.dataset.id = i;

    el.parentNode.insertBefore(seperator, el.nextSibling);
  }
  else {
    el.style.width = elementInitWidth + 'px';
  }
});


function onSeperatorDown (e) {
  if (e.target.classList.contains('seperator')) {
    isMouseDown = true;
    sepId = +e.target.dataset.id;
    currentElement = splitContainerChildren[sepId].getBoundingClientRect();
    nextElement = splitContainerChildren[sepId + 1].getBoundingClientRect();
  }

  e.stopPropagation();
  e.preventDefault();
}

function onSeperatorUp (e) {
  isMouseDown = false;
  e.stopPropagation();
  e.preventDefault();
}

window.addEventListener('mousemove', (e) => {
  if (isMouseDown && splitContainerChildren[sepId]) {
    let diff = e.clientX - currentElement.x;
    let nextElNewWidth = nextElement.width + (currentElement.width - diff);

    if (diff >= 0 && nextElNewWidth >= 0) {
      splitContainerChildren[sepId].setAttribute("style", `width: calc(${diff}px)`);
      splitContainerChildren[sepId + 1].setAttribute("style", `width: calc(${nextElNewWidth}px)`);
    }
  }
  e.stopPropagation();
  e.preventDefault();
}, false);

window.addEventListener('mousedown', onSeperatorDown, false);
window.addEventListener('mouseup', onSeperatorUp, false);