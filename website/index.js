const formControl = document.querySelector('.form-control');
const splitViewsContainer = document.querySelector('.split-view');

function createChilds (num) {
  splitViewsContainer.innerHTML = '';

  for (let i = 0; i < num; i++) {
    const div = document.createElement('div')
    const p = document.createElement('p')
    p.textContent = 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    div.appendChild(p)

    splitViewsContainer.appendChild(div)
  }
}

let options = {
  parent: '.split-view',
  direction: 'horizontal',
  gutterSize: 10,
  minSize: 10,
  sizes: [25, 50, 25],
  onDragEnd: (values) => {
    console.log('onDragEnd', values);
  }
};

let direction = options.direction;
let sp = window.SplitViews(options);

function onSubmit (e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  for (const pair of formData.entries()) {
    let value = isNaN(pair[1]) ? pair[1] : +pair[1];
    options = { ...options, [pair[0]]: value };
  }

  splitViewsContainer.classList.replace(direction, options.direction)
  direction = options.direction;

  if (options.direction === 'horizontal') {
    splitViewsContainer.style.flexDirection = 'row';
    for (let child of splitViewsContainer.children) {
      child.style.width = '100%'
    }
  }

  if (options.direction === 'vertical') {
    splitViewsContainer.style.flexDirection = 'column';
    for (let child of splitViewsContainer.children) {
      child.style.height = '100%'
    }
  }

  window.SplitViews(options)
}

document.querySelector('.pre-html-code').textContent = `<!-- html skeleton -->
<div class="split-view horizontal"> <!-- horizontal or vertical (class required) -->
  <div>child</div>
  <span class="gutter"></span> <!--(tag and class 'gutter' required) -->
  <div>child</div>
  <span class="gutter"></span>
  <div>child</div>
</div>`;

hljs.highlightAll();

formControl.addEventListener('submit', onSubmit, false);