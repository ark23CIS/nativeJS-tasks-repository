"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var deleteEmptyElementsAfterSplit = function deleteEmptyElementsAfterSplit(arr) {
  return arr.reduce(function (p, c) {
    return c !== "" ? [].concat(_toConsumableArray(p), [c]) : p;
  }, []);
};
var textFormatter = {
  deleteEmptyElementsAfterSplit: function deleteEmptyElementsAfterSplit(arr) {
    return arr.reduce(function (p, c) {
      return c !== "" ? [].concat(_toConsumableArray(p), [c]) : p;
    }, []);
  },
  format: function format(_ref) {
    var text = _ref.text,
        _ref$maxSizeOfString = _ref.maxSizeOfString,
        maxSizeOfString = _ref$maxSizeOfString === undefined ? "" : _ref$maxSizeOfString,
        _ref$maxNumberOfStrin = _ref.maxNumberOfString,
        maxNumberOfString = _ref$maxNumberOfStrin === undefined ? "" : _ref$maxNumberOfStrin,
        _ref$formatType = _ref.formatType,
        formatType = _ref$formatType === undefined ? "" : _ref$formatType;

    var delimiters = [" ./?,<>[]{}|\\-+()*&^:;%$#@!^_"];
    var chunks = void 0;
    console.log(chunks);
    if (maxSizeOfString < text.length && maxSizeOfString !== "") {
      return "";
    }
    for (var i = 1; i < text.length; i++) {
      if (text[i] === " " && delimiters[0].includes(text[i - 1])) {
        text = text.slice(0, i) + text.slice(i + 1);
        i--;
      }
    }
    switch (formatType) {
      case "sentences":
        text = this.deleteEmptyElementsAfterSplit(text.split(/[!?.]/)).join("\n");
        break;
      case "words":
        chunks = this.deleteEmptyElementsAfterSplit(text.split(/[ !?.-/();':\"]/));
        chunks = chunks.join("\n");
      case "chars":
        text = this.deleteEmptyElementsAfterSplit(text.split(/[ !?.-/();':\"]/).join("").split("")).join("\n");
      default:
        break;
    }
    if (chunks !== undefined) text = chunks;
    if (text.split("\n").length < maxNumberOfString) return "";
    return text;
  }
};

console.log(textFormatter.format({ formatType: "words", text: "Alice send. Bob!" }));