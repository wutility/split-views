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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/split-views@1.0.3/build/index.css" />
<script src="https://cdn.jsdelivr.net/npm/split-views@1.0.3/build/index.umd.min.js"></script>
<!-- Access via global object : window.SplitViews -->
```

### Methods && Examples
- **SplitViews(options: Object): void**  
```js
let defaultOptions = {
  parentId: 'split-view', // default css: #split-view { display: flex; }
  direction: 'vertical', // or 'horizontal'
  gutterSize: 5,
  minSize: 20
};

SplitViews(defaultOptions);
```

### Notes
- All pull requests are welcome, feel free.

### Author
- [Haikel Fazzani](https://github.com/haikelfazzani)

## License
MIT