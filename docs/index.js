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
  parent: '#sv',
  direction: 'horizontal',
  gutterSize: 10,
  minSize: 0,
  sizes: [25, 50, 25],
  onDragEnd: (values) => {
    console.log('onDragEnd', values);
  }
};

window.SplitViews(options);

const sp = window.SplitViews({
  parent: '#sv2',
  direction: 'vertical',
  gutterSize: 5,
  minSize: 0
});

document.querySelector('.pre-html-code').textContent = `
<!-- 
  horizontal (or vertical) className are required 
  when you wish to use 2 instances
  of SplitViews in the same page
-->

<div class="split-view horizontal">
  <div>child 1</div>

  <!-- ClassName 'sp-gutter' is required -->
  <span class="sp-gutter"></span>

  <div>child 2</div>

  <span class="sp-gutter"></span>

  <div class="split-view2 vertical">
    <div>Child 3</div>
    <span class="sp-gutter"></span>
    <div>Child 4</div>
  </div>

</div>`;

hljs.highlightAll();
