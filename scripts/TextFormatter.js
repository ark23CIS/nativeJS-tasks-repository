const deleteEmptyElementsAfterSplit = (arr) =>
  arr.reduce((p, c) => (c !== "" ? [...p, c] : p), []);
const textFormatter = {
  deleteEmptyElementsAfterSplit: function (arr) {
    return arr.reduce((p, c) => (c !== "" ? [...p, c] : p), []);
  },
  format: function ({
    text,
    maxSizeOfString = "",
    maxNumberOfString = "",
    formatType = "",
  }) {
    const delimiters = [" ./?,<>[]{}|\\-+()*&^:;%$#@!^_"];
    let chunks;
    console.log(chunks);
    if (maxSizeOfString < text.length && maxSizeOfString !== "") {
      return "";
    }
    for (let i = 1; i < text.length; i++) {
      if (text[i] === " " && delimiters[0].includes(text[i - 1])) {
        text = text.slice(0, i) + text.slice(i + 1);
        i--;
      }
    }
    switch (formatType) {
      case "sentences":
        text = this.deleteEmptyElementsAfterSplit(text.split(/[!?.]/)).join(
          "\n"
        );
        break;
      case "words":
        chunks = this.deleteEmptyElementsAfterSplit(
          text.split(/[ !?.-/();':\"]/)
        );
        chunks = chunks.join("\n");
      case "chars":
        text = this.deleteEmptyElementsAfterSplit(
          text
            .split(/[ !?.-/();':\"]/)
            .join("")
            .split("")
        ).join("\n");
      default:
        break;
    }
    if (chunks !== undefined) text = chunks;
    if (text.split("\n").length < maxNumberOfString) return "";
    return text;
  },
};

console.log(
  textFormatter.format({ formatType: "words", text: "Alice send. Bob!" })
);
