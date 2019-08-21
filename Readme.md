# ⌛ Formel

⚡️ **format number, string utility**

[![](https://data.jsdelivr.com/v1/package/npm/formel/badge)](https://www.jsdelivr.com/package/npm/formel) ![badgen](https://badgen.net/bundlephobia/min/formel) ![badgen](https://badgen.net/bundlephobia/minzip/formel)

## Usage

```js
import formel from "formel";
or;
var formel = require("formel");
```

Or include it via jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/formel@1.0.0/index.min.js"></script>
```

## Methods & Examples

- **formel.split(String, [spread], [seprator]) : String**

```js
formel.split("12456789") // 1 245 678
formel.split("12456789", 3, "-") // 1-245-678
formel.split("12456789", 4, "/") // 124/5678
```

## Notes
- Run both in a browser and in Node.js.

## License
MIT