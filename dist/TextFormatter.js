"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var TextFormatter = {
  deleteEmptyElementsAfterSplit: function deleteEmptyElementsAfterSplit(arr) {
    return arr.reduce(function (p, c) {
      return c !== "" ? [].concat(_toConsumableArray(p), [c]) : p;
    }, []);
  },
  format: function format(_ref) {
    var text = _ref.text,
        maxSizeOfString = _ref.maxSizeOfString,
        maxNumberOfStrings = _ref.maxNumberOfStrings,
        formatType = _ref.formatType;

    maxSizeOfString = maxSizeOfString || Number.MAX_SAFE_INTEGER;
    maxNumberOfStrings = maxNumberOfStrings || Number.MAX_SAFE_INTEGER;
    formatType = formatType || "overflow";
    if (maxSizeOfString === 0 || maxNumberOfStrings === 0) return "";
    var delimiters = [" ./?,<>[]{}|\\-+()*&^:;%$#@!^_"];
    var chunks = void 0;
    for (var i = 1; i < text.length; i++) {
      if (text[i] === " " && delimiters[0].includes(text[i - 1])) {
        text = text.slice(0, i) + text.slice(i + 1);
        i--;
      }
    }
    var symbols = void 0;
    switch (formatType) {
      case "overflow":
      case "chars":
        chunks = text.split("");
        break;
      case "words":
      case "sentences":
        symbols = formatType === "words" ? text.match(/[ !,.:;?()]/g) : text.match(/[!.?]/g);
        chunks = formatType === "words" ? text.split(/[ !,.:;?()]/g) : text.split(/[!.?]/g);
        if (!symbols) break;
        symbols = [];
        for (var _i = 0; _i < chunks.length - 1; _i++) {
          symbols.push(text.split(new RegExp(chunks[_i] + "|" + chunks[_i + 1]))[1]);
          if (_i === chunks.length - 2) {
            symbols.push(text.split(new RegExp(chunks[_i] + "|" + chunks[_i + 1]))[2]);
          }
        }
        chunks = chunks.map(function (el, i) {
          return "" + el + symbols[i];
        });
        break;
    }
    var textFormArray = [];
    var noContinue = false;
    for (var _i2 = 0; _i2 < chunks.length && textFormArray.length < maxNumberOfStrings; _i2++) {
      var remainingCharacters = 0;
      if (chunks[_i2].length <= maxSizeOfString) {
        if (noContinue) break;
        textFormArray[textFormArray.length] = chunks[_i2];
        remainingCharacters = maxSizeOfString - chunks[_i2].length;
        for (var j = _i2 + 1; j < chunks.length && remainingCharacters >= chunks[j].length; j++) {
          remainingCharacters -= chunks[j].length;
          textFormArray[textFormArray.length - 1] += chunks[j];
        }
        if (formatType === "overflow") noContinue = true;
        _i2 = j - 1;
      } else {
        throw new Error("Not enough size to wrap a word");
      }
    }
    return textFormArray.join("\n");
  }
};