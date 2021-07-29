# ✂ SplitViews  
**Utility for resizable split views.**

- Fast (Performance First).
- Simple to use.
- Lightweight <1kb.
- Zero dependencies.
- No events listeners are attached to Window.
- Compatible: Firefox - Chrome - Safari - Opera - Android - (FlexBox is not supported in IE).

<div align="center" style="width:100%; text-align:center;">
<img src="https://badgen.net/bundlephobia/minzip/split-views" alt="split-views" />
  <img src="https://badgen.net/bundlephobia/dependency-count/split-views" alt="split-views" />
  <img src="https://badgen.net/npm/v/split-views" alt="split-views" />
  <img src="https://badgen.net/npm/dt/split-views" alt="split-views" />
  <img src="https://data.jsdelivr.com/v1/package/npm/split-views/badge" alt="split-views"/>
</div>  

<hr />  

### [Demo](https://split-views.netlify.app/)

```js
$ npm i split-views
// or
$ yarn add split-views
```

## Usage
```js
import SplitViews from 'split-views';
```

Or include it via jsDelivr CDN (UMD):
```html
<script src="https://cdn.jsdelivr.net/npm/split-views@2.0.11/build/index.umd.min.js"></script>
<!-- Or via unpkg -->
<script src="https://unpkg.com/split-views"></script>
<!-- Access via global object : window.SplitViews -->
```

## Documentation

- **SplitViews(options: Object): void**  

| Options      | Type                          | Default        | Description                                 |
| ------------ | ----------------------------- | -------------- | ------------------------------------------- |
| `parent`     | `HTMLElement` or `String`  | `'.split-view'` | Parent element.                             |
| `sizes`      | `Array<Number>`               | `[]`           | Initial sizes of each element in %.         |
| `minSize`    | `Number`                      | `0`           | Minimum size.                               |
| `gutterSize` | `Number`                      | `5`            | Gutter size (seperator).                    |
| `direction`  | `String`                      | `'horizontal'`   | Resize direction: horizontal or vertical. |
| `onDragEnd`  | `Method`                      |    `null`        | Callback with new sizes in %.               |

## Methods & Examples
```js
const options = {
  parent: '#parent-id', // or HTMLElement
  direction: 'horizontal',
  gutterSize: 5,
  minSize: 20,
  sizes: [25, 50, 25],
  onDragEnd: (newSizes) => {
    console.log(newSizes);
  }
};

SplitViews(options);
```

## Notes
- Tested on Chrome 70, Firefox 70, Edge 70, Opera 70, Safari 11, Android (>= 4).
- SplitViews is flex-based.
- All pull requests are welcome, feel free.

## Author
- [Haikel Fazzani](https://github.com/haikelfazzani)

## License
MIT