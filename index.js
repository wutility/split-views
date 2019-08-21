(function (name, factory) {
  if (typeof module != "undefined") {
    module.exports = factory();
  } else if (typeof define == "function" && typeof define.amd == "object") {
    define(factory);
  } else {
    this[name] = factory();
  }
})("formel", function () {

  return {

    split(num, spread, separator) {

      var result = "", spread = spread || 3, separator = separator || " ";

      num = num.split("").reverse();

      for (var i = num.length - 1; i > 0; i--) {
        if (i % spread === 0) {
          result += separator;
        }
        result += num[i];
      }

      return result;
    }

  };
});
