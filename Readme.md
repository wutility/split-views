<p align="center">
<img src="https://i.ibb.co/X7hHvx7/Split-Views.png" alt="split viewes"/>
</p>

<div align="center" style="width:100%; text-align:center;">
<img src="https://badgen.net/bundlephobia/minzip/split-views" alt="split-views" />
  <img src="https://badgen.net/bundlephobia/dependency-count/split-views" alt="split-views" />
  <img src="https://badgen.net/npm/v/split-views" alt="split-views" />
  <img src="https://badgen.net/npm/dt/split-views" alt="split-views" />
  <img src="https://data.jsdelivr.com/v1/package/npm/split-views/badge" alt="split-views"/>
</div>  

<hr />  

# [Demo](https://split-views.onrender.com)

```html
$ npm i split-views
// or
$ yarn add split-views
```

## Usage
```js
import SplitPane from 'split-views';
import 'split-views/build/index.css';
```

Or include it via jsDelivr CDN (UMD):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/split-views@1.0.5/build/index.css" />
<script src="https://cdn.jsdelivr.net/npm/split-views@1.0.5/build/index.umd.min.js"></script>
<!-- Access via global object : window.SplitViews -->
```

### Documentation

- **SplitViews(options?: Object): void**  

| Options      | Type                          | Default        | Description                                 |
| ------------ | ----------------------------- | -------------- | ------------------------------------------- |
| `parent`     | `HTMLElement` or `String (id)`| `'split-view'` | Parent element.                             |
| `sizes`      | `Array<Number>`               | `[]`           | Initial sizes of each element in percents.  |
| `minSize`    | `Number`                      | `20`           | Minimum size.                               |
| `gutterSize` | `Number`                      | `5`            | Gutter size.                                |
| `direction`  | `String`                      | `'vertical'`   | Direction to split: horizontal or vertical. |
| `onDragEnd`  | `Function`                    |                | Callback on drag end.                       |

### Examples
```js
const options = {
  parent: 'my-uniq-id',
  direction: 'horizontal',
  gutterSize: 15,
  minSize: 50,
  sizes: [25, 50, 25],
  onDragEnd: (newSizes) => {
    console.log(newSizes);
  }
};

SplitViews(options);
```

### Notes
- All pull requests are welcome, feel free.

### Author
- [Haikel Fazzani](https://github.com/haikelfazzani)

## License
MIT