# SplitViews

A lightweight, framework-agnostic split-pane library for resizable layouts.\
Zero dependencies. Modern **Pointer Events**. CSS-variable driven sizing.

- ✨ **Modern**: Uses Pointer Events + `setPointerCapture` (no global listeners)
- ⚡ **Performant**: Batched DOM writes, CSS variables for sizes, minimal
  reflows
- 🧩 **Composable**: Works with nested splits, no framework required
- ♿ **Accessible**: ARIA roles, orientations, keyboard focusable gutters

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
import SplitViews from "split-views";
```

Or include it via jsDelivr CDN (UMD):

```html
<script
  src="https://cdn.jsdelivr.net/npm/split-views/dist/index.umd.min.js"
></script>
<!-- Access via global object : window.SplitViews -->
<!-- Or via unpkg -->
<script src="https://unpkg.com/split-views"></script>
```

## Quick Start

HTML:

```html
<div id="editor" class="split-root" style="height: 400px">
  <div>Left Pane</div>
  <div>Right Pane</div>
</div>
```

JavaScript:

```js
import SplitViews from "splitviews";

const split = SplitViews({
  root: "#editor",
  direction: "horizontal", // 'vertical' or 'horizontal' (default)
  gutterSize: 8,
  sizes: [30, 70], // percentages; defaults to equal split
  minSize: [120, 200], // px per pane or single px applied to all
  snapOffset: 8, // px tolerance before snapping to min
  onDrag: (sizes) => {
    console.log("resizing...", sizes);
  },
  onDragEnd: (sizes) => {
    console.log("final sizes:", sizes);
  },
});
```

---

## Options

| Option            | Type                         | Default          | Description                                               |
| ----------------- | ---------------------------- | ---------------- | --------------------------------------------------------- |
| `root`            | `HTMLElement \| string`      | **required**     | Container element or selector. Children become panes.     |
| `direction`       | `'horizontal' \| 'vertical'` | `'horizontal'`   | Split direction.                                          |
| `gutterSize`      | `number`                     | `10`             | Gutter thickness in px.                                   |
| `gutterClassName` | `string`                     | `'split-gutter'` | Class applied to each gutter.                             |
| `minSize`         | `number \| number[]`         | `0`              | Per-pane minimum size in px (array) or single px for all. |
| `sizes`           | `number[]`                   | equal split      | Initial sizes in percentages.                             |
| `snapOffset`      | `number`                     | `0`              | Extra px tolerance before snapping to min.                |
| `onDrag`          | `(sizes:number[])=>void`     | —                | Called on every drag frame.                               |
| `onDragEnd`       | `(sizes:number[])=>void`     | —                | Called when dragging stops.                               |

---

## API

```ts
type SplitHandle = {
  root: HTMLElement;
  setSizes(sizes: number[]): void; // percentages per pane
  getSizes(): number[]; // percentages per pane
  destroy(): void; // remove gutters, listeners, inline styles
};
```

---

## Styling

The library sets:

- `display: flex` and `flex-direction` on `root`
- `flex-basis` per pane (via CSS variables)
- Basic `cursor` and `touch-action` on gutters

You control the look of gutters:

```css
.split-root {
  contain: layout size style; /* hint for performance */
}

.split-gutter {
  background: transparent;
  position: relative;
}

/* Visible hairline */
.split-gutter::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
}

.split-gutter:hover::before {
  background: rgba(0, 0, 0, 0.2);
}
```

CSS variables you can use:

- `--pane-<index>-size`: applied as `flex-basis` for each pane
- `--split-gutter-size`: gutter thickness
- `--split-cursor`: cursor type (`col-resize` / `row-resize`)

---

## Accessibility

Gutters automatically have:

- `role="separator"`
- `aria-orientation="vertical"` (for horizontal split) or `"horizontal"` (for
  vertical split)
- `tabIndex="0"` so they can be focused

---

## Nested Splits

You can nest multiple instances:

```js
const outer = SplitViews({ root: "#root", direction: "horizontal" });
const inner = SplitViews({
  root: '#root [data-split-pane="1"]',
  direction: "vertical",
});
```

Each instance manages only its direct children.

---

## Performance Notes

- Uses `setPointerCapture` → no global listeners.
- DOM writes batched with `requestAnimationFrame`.
- CSS variables used for sizes → fast style recalculation.
- Avoid heavy work in `onDrag`; debounce if needed.
- Clean `destroy()` ensures no leaks.

---

## Browser Support

- Chromium, Firefox, Safari (modern versions with **Pointer Events**).
- No IE support (Pointer Events required).

---

## License

MIT © 2025
