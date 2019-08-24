# 🔢😊 Formel

⚡️ **Simply and lightweight JavaScript library for the browser and for Node.js that provides extra String methods.**

[![](https://data.jsdelivr.com/v1/package/npm/formel/badge)](https://www.jsdelivr.com/package/npm/formel) ![badgen](https://badgen.net/bundlephobia/min/formel) ![badgen](https://badgen.net/bundlephobia/minzip/formel)

## Usage

```js
import formel from "formel";
or;
var formel = require("formel");
```

Or include it via jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/formel@1.0.1/index.min.js"></script>
```

## Methods & Examples

- **rmTags() : String**

```js
formel("<script>hello world</script> fine<br />").rmTags().val() // hello world fine
```

- **compact() : String**

```js
formel("  hello   world  ").compact().val() // hello world
```

- **capitalize() : String**

```js
formel("hello world").capitalize().val() // Hello world
```

- **reverseStr() : String**

```js
formel("welcome").reverseStr().val() // emoclew
```
- **splitInto([spread], [seprator]) : String**

```js
formel("12456789").splitInto().val() // 123 456 789
formel("hello").splitInto(2, "-").val() // he-ll-o
formel("welcome 2019").splitInto(4).val() // we lc om e  20 19
```

## Notes
- Run both in a browser and in Node.js.

## License
MIT