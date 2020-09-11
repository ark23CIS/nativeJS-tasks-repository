var TextFormatter = {
  deleteEmptyElementsAfterSplit: function (arr) {
    return arr.reduce((p, c) => (c !== "" ? [...p, c] : p), []);
  },
  format: function ({ text, maxSizeOfString, maxNumberOfStrings, formatType }) {
    maxSizeOfString = maxSizeOfString || Number.MAX_SAFE_INTEGER;
    maxNumberOfStrings = maxNumberOfStrings || Number.MAX_SAFE_INTEGER;
    formatType = formatType || "overflow";
    if (maxSizeOfString === 0 || maxNumberOfStrings === 0) return "";
    const delimiters = [" ./?,<>[]{}|\\-+()*&^:;%$#@!^_"];
    let chunks;
    for (let i = 1; i < text.length; i++) {
      if (text[i] === " " && delimiters[0].includes(text[i - 1])) {
        text = text.slice(0, i) + text.slice(i + 1);
        i--;
      }
    }
    let symbols;
    switch (formatType) {
      case "overflow":
      case "chars":
        chunks = text.split("");
        break;
      case "words":
      case "sentences":
        symbols =
          formatType === "words"
            ? text.match(/[ !,.:;?()]/g)
            : text.match(/[!.?]/g);
        chunks =
          formatType === "words"
            ? text.split(/[ !,.:;?()]/g)
            : text.split(/[!.?]/g);
        if (!symbols) break;
        symbols = [];
        for (let i = 0; i < chunks.length - 1; i++) {
          symbols.push(
            text.split(new RegExp(`${chunks[i]}|${chunks[i + 1]}`))[1]
          );
          if (i === chunks.length - 2) {
            symbols.push(
              text.split(new RegExp(`${chunks[i]}|${chunks[i + 1]}`))[2]
            );
          }
        }
        chunks = chunks.map((el, i) => `${el}${symbols[i]}`);
        break;
    }
    var textFormArray = [];
    let noContinue = false;
    for (
      let i = 0;
      i < chunks.length && textFormArray.length < maxNumberOfStrings;
      i++
    ) {
      let remainingCharacters = 0;
      if (chunks[i].length <= maxSizeOfString) {
        if (noContinue) break;
        textFormArray[textFormArray.length] = chunks[i];
        remainingCharacters = maxSizeOfString - chunks[i].length;
        for (
          var j = i + 1;
          j < chunks.length && remainingCharacters >= chunks[j].length;
          j++
        ) {
          remainingCharacters -= chunks[j].length;
          textFormArray[textFormArray.length - 1] += chunks[j];
        }
        if (formatType === "overflow") noContinue = true;
        i = j - 1;
      } else {
        throw new Error("Not enough size to wrap a word");
      }
    }
    return textFormArray.join("\n");
  },
};
