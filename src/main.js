function formel(str) {

  return {
    val : str || "",
    revstr() {
      this.val = this.val.split('').reverse().join('');
      return this;
    },
    compact() {
      this.val = this.val.replace(/\s+/g, ' ').trim();
      return this;
    },
    capitalize() {
      this.val = this.val.trim();
      this.val = this.val[0].toUpperCase() + this.val.slice(1).toLowerCase();
      return this;
    },
    rmSpaces() {
      this.val = this.val.replace(/\s+/g, '');
      return this;
    },
    rmTags() {
      this.val = this.val.replace(/<(.|\n)*?>/g, "");
      return this;
    },
    splitInto(spread = 3, separator = " ") {

      let newStr = "";

      this.val = this.val.split("");

      for (let i = 0; i < this.val.length; i++) {
        if (i > 0 && i % spread === 0) {
          newStr += separator;
        }
        newStr += this.val[i];
      }

      this.val = newStr;
      return this;
    }
  }

}
export default formel;
