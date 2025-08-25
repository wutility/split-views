
// Horizontal split view
const horizontalSplit = SplitViews({
  root: '#split-horizontal',
  direction: 'horizontal',
  gutterSize: 5,
  minSize: 0,
  snapOffset: 20,
  sizes: [30, 40, 30], // Initial sizes in percentages
  onDragEnd: (newSizes) => {
    console.log('Horizontal new sizes:', newSizes);
  }
});

// Vertical split view
const verticalSplit = SplitViews({
  root: '#split-vertical',
  direction: 'vertical',
  gutterSize: 5,
  minSize: 0,
  sizes: [30, 70], // Initial sizes in percentages
  onDragEnd: (newSizes) => {
    console.log('Vertical new sizes:', newSizes);
  }
});

// Example of destroying a split view (optional)
// setTimeout(() => {
//   horizontalSplit.destroy();
//   console.log('Horizontal split view destroyed');
// }, 10000);