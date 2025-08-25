# SplitViews

A lightweight, zero-dependency TypeScript library for creating resizable split
views (panes) in web applications.

## Features

- Create horizontal or vertical split views
- Configurable gutter size and styling
- Support for minimum pane sizes
- Initial size configuration
- Snap-to-minimum size behavior
- Drag and drag-end event callbacks
- Programmatic size control
- Touch-friendly

<div align="center" style="width:100%; text-align:center; margin-bottom:20px;">
  <img src="https://badgen.net/bundlephobia/minzip/split-views" alt="split-views" />
  <img src="https://badgen.net/bundlephobia/dependency-count/split-views" alt="split-views" />
  <img src="https://badgen.net/npm/v/split-views" alt="split-views" />
  <img src="https://badgen.net/npm/dt/split-views" alt="split-views" />
  <img src="https://data.jsdelivr.com/v1/package/npm/split-views/badge" alt="split-views"/>
</div>

![Split views](https://i.ibb.co/0h4gVd5/split-views.gif)

<hr />

### [Demo](https://wutility.github.io/split-views)

```js
import SplitViews from 'split-views';
```

Or include it via jsDelivr CDN (UMD):
```html
<script src="https://cdn.jsdelivr.net/npm/split-views/build/index.min.js"></script>
<!-- Or via unpkg -->
<script src="https://unpkg.com/split-views"></script>
<!-- Access via global object : window.SplitViews -->
```

## Usage

```javascript
import SplitViews from "splitviews";

const split = SplitViews({
  root: "#container",
  direction: "horizontal",
  gutterSize: 10,
  minSize: [100, 200],
  sizes: [30, 70],
  snapOffset: 0,
  onDrag: (sizes) => console.log("Dragging:", sizes),
  onDragEnd: (sizes) => console.log("Drag ended:", sizes),
});

// Programmatically set sizes
split.setSizes([40, 60]);

// Get current sizes
split.getSizes();

// Destroy the split view
split.destroy();
```

HTML structure:

```html
<div id="container">
  <div>Pane 1</div>
  <div>Pane 2</div>
</div>
```

## API

### SplitViews(options: SplitOptions)

Initializes a new split view.

#### Options

| Property          | Type                         | Description                       | Default               |
| ----------------- | ---------------------------- | --------------------------------- | --------------------- |
| `root`            | `HTMLElement \| string`      | Container element or selector     | -                     |
| `direction`       | `'horizontal' \| 'vertical'` | Split direction                   | `'horizontal'`        |
| `gutterSize`      | `number`                     | Gutter size in pixels             | `10`                  |
| `gutterClassName` | `string`                     | CSS class for gutters             | `'split-zero-gutter'` |
| `minSize`         | `number \| number[]`         | Minimum pane size(s) in pixels    | `0`                   |
| `sizes`           | `number[]`                   | Initial pane sizes as percentages | Equal distribution    |
| `snapOffset`      | `number`                     | Snap threshold in pixels          | `0`                   |
| `onDrag`          | `(sizes: number[]) => void`  | Callback during drag              | -                     |
| `onDragEnd`       | `(sizes: number[]) => void`  | Callback after drag               | -                     |

#### Methods

- `destroy()`: Removes gutters and resets styles
- `setSizes(sizes: number[])`: Programmatically set pane sizes
- `getSizes(): number[]`: Get current pane sizes

## Example

```html
<script src="https://cdn.jsdelivr.net/npm/split-views/build/index.min.js"></script>

<div id="container" style="height: 400px">
  <div style="background: #eee">Pane 1</div>
  <div style="background: #ddd">Pane 2</div>
</div>

<script>
  window.SplitViews({
    root: "#container",
    direction: "horizontal",
    gutterSize: 8,
    minSize: 100,
    sizes: [40, 60],
  });
</script>
```

## License

MIT License
