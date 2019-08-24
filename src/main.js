function formel(str) {

  var output = "";

  return {
    reverseStr() {
      output = str.split('').reverse().join('');
      return this;
    },

    splitInto(spread = 3, separator = " ") {

      let newStr = "";

      str = str.split("");

      for (let i = 0; i < str.length; i++) {
        if (i > 0 && i % spread === 0) {
          newStr += separator;
        }
        newStr += str[i];
      }

      output = newStr;
      return this;
    },
    capitalize() {
      output = str[0].toUpperCase() + str.slice(1).toLowerCase();
      return this;
    },
    compact() {
      output = str.replace(/\s+/g, ' ').trim();
      return this;
    },
    rmTags() {
      output = str.replace(/<(.|\n)*?>/g, "");
      return this;
    },
    val() {
      return output;
    }
  }

}

export default formel;
