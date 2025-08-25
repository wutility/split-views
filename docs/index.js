let defaultOptions = {
  direction: 'horizontal',
  gutterSize: 5,
  minSize: 0,
  snapOffset: 20,
};

let sp = SplitViews({
  root: '#split',
  ...defaultOptions,
  sizes: [50, 50]
});

const container = document.getElementById('split');

document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();

  if (sp) sp.destroy();

  const elements = e.target.elements;

  [...elements].forEach(el => {
    defaultOptions = { ...defaultOptions, [el.name]: isNaN(el.value) ? el.value : Number(el.value) };
  });


  const result = 100 / defaultOptions.columns;
  const sizes = new Array(defaultOptions.columns).fill(result);
  container.innerHTML = '';

  sizes.forEach((s,i) => {
    container.innerHTML += `<div class="pane"><span>Pane ${i+1}</span></div>`
  });

  sp = SplitViews({
    root: container,
    ...defaultOptions,
    sizes,
    onDragEnd: (newSizes) => {
      console.log(newSizes);
    }
  });

});