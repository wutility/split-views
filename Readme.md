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
<script src="https://cdn.jsdelivr.net/npm/formel@1.0.6/build/index.min.js"></script>
```
### Example
```js
formel(string) // constructor
.capitalize() // method
.val // get value

// chaining methods
formel("  hello   world  ")
.compact()
.capitalize()
.val // Hello world
```
## Methods & Examples

### - rmTags() ###

remove all html tags from a string
```js
formel("<script>hello world</script> fine<br />").rmTags().val // hello world fine
```

### - rmSpaces() ###
remove all spaces from a string
```js
formel("  hello   world  ").rmSpaces().val // helloworld
```

### - compact() ###
remove all extra spaces from a string
```js
formel("  hello   world  ").compact().val // hello world
```

### - capitalize() ###

```js
formel("hello world").capitalize().val // Hello world
```

### - revstr() ###
reverse a string
```js
formel("welcome").revstr().val // emoclew
```
### - splitInto([spread], [seprator]) ###

```js
formel("12456789").splitInto().val // 123 456 789
formel("hello").splitInto(2, "-").val // he-ll-o
formel("welcome 2019").splitInto(4).val // we lc om e  20 19
```

## Notes
- Works both in Node.js and in the browser.
- All pull requests are welcome, feel free.

## License
MIT