"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// ArraySortTask HTML elements
var arraySortOutput = document.querySelector(".array-sort__output-area");

// BinaryConverterTask HTML elements
var notationInput = document.querySelector(".binary-converter__notation-input-area");
var radixInput = document.querySelector(".binary-converter__radix-input-area");
var radixOutput = document.querySelector(".binary-converter__radix-output-area");
var notationOutput = document.querySelector(".binary-converter__output-area");

// ArrayProcessingToolTask HTML elements
var arrayProcessingToolInput = document.querySelector(".array-processing-tool__input-area");

// STRING CALCULATOR HTML ELEMENTS
var stringCalculatorInput = document.querySelector(".string-calculator__input-area");

// Caching CALCULATOR
var cachingCalculatorInput = document.querySelector(".caching-calculator__input-area");
// DOM
var addIncorrect = function addIncorrect(el) {
  return el.classList.add("incorrect");
};
var removeIncorrect = function removeIncorrect(el) {
  return el.classList.remove("incorrect");
};

document.querySelector(".array-sort__approve-btn").addEventListener("click", function () {
  var inputValue = document.querySelector(".array-sort__input-area").value;
  if (inputValue == "" && inputValue || inputValue.split(" ").filter(function (el) {
    return (/^-?[0-9]+$/.test(el)
    );
  }).length !== inputValue.split(" ").length) {
    arraySortOutput.value = "incorrect input should be written with spaces without using commas (4 1 2)";
    addIncorrect(arraySortOutput);
    return;
  }
  removeIncorrect(arraySortOutput);
  var arr = inputValue.split(" ").map(function (el) {
    return parseInt(el);
  });
  var sortType = document.querySelector("#select-sort").value;
  arraySortOutput.value = ArraySorter[sortType](arr).join(" ");
});

document.querySelector(".binary-converter__approve-btn").addEventListener("click", function () {
  var notations = ["2", "10", "16"];
  var radixMap = new Map([["2", "Binary"], ["10", "Decimal"], ["16", "Hex"]]);
  if (!notations.includes(radixInput.value) || !notations.includes(radixOutput.value)) {
    radixInput.value = radixOutput.value = "The radix doesnt has a realization";
    addIncorrect(radixInput);
    addIncorrect(radixOutput);
    return;
  }
  if (radixInput.value === radixOutput.value) {
    radixInput.value = radixOutput.value = "No need to convert radix to the same radix";
    addIncorrect(radixInput);
    addIncorrect(radixOutput);
    return;
  }
  if (notationInput == "") {
    notationInput.value = "Need to input number in its radix before pressing button";
    addIncorrect(notationInput);
    return;
  }
  removeIncorrect(radixOutput);
  removeIncorrect(radixInput);
  removeIncorrect(notationInput);
  var dataInput = void 0;
  switch (radixInput.value) {
    case "2":
      if (notationInput.value.split("").filter(function (el) {
        return (/^[0-1]$/.test(el)
        );
      }).length !== n) {
        notationOutput.value = "Invalid binary input";
        addIncorrect(notationOutput);
        return;
      }
      dataInput = notationInput.value.split("").reverse().map(function (el) {
        return parseFloat(el);
      });
      break;
    case "10":
      dataInput = notationInput.value;
      break;
    case "16":
      var n = notationInput.value.length;
      if (notationInput.value.split("").filter(function (el) {
        return (/^[0-9a-fA-F]$/.test(el)
        );
      }).length !== n) {
        notationOutput.value = "Invalid hex input";
        addIncorrect(notationOutput);
        return;
      }
      dataInput = notationInput.value.split("").reverse().map(function (el) {
        return (/^[0-9]$/.test(el) ? parseFloat(el) : el
        );
      });
    default:
      break;
  }
  var method = "";
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = radixMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var radix = _step.value;

      if (radixInput.value === radix[0]) method += radix[1] + "To";
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = radixMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _radix = _step2.value;

      if (radixOutput.value === _radix[0]) method += _radix[1];
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var dataOutput = BinaryConverter[method](dataInput);
  switch (radixOutput.value) {
    case "2":
    case "16":
      dataOutput = dataOutput.reverse().join("");
      break;
    default:
      break;
  }
  notationOutput.value = dataOutput;
});

document.querySelector(".array-processing-tool__approve").addEventListener("click", function () {
  var inputValue = arrayProcessingToolInput.value;
  if (inputValue == "" && inputValue || inputValue.split(" ").filter(function (el) {
    return (/^-?[0-9]+$/.test(el)
    );
  }).length !== inputValue.split(" ").length) {
    arrayProcessingToolInput.value = "incorrect input should be written with spaces without using commas (4 1 2)";
    addIncorrect(arrayProcessingToolInput);
    return;
  }
  removeIncorrect(arrayProcessingToolInput);
  var arr = inputValue.split(" ").map(function (el) {
    return parseInt(el);
  });

  var _ArrayProcessingTool$ = ArrayProcessingTool.search(arr),
      _ArrayProcessingTool$2 = _slicedToArray(_ArrayProcessingTool$, 3),
      min = _ArrayProcessingTool$2[0],
      median = _ArrayProcessingTool$2[1],
      max = _ArrayProcessingTool$2[2];

  document.querySelector(".array-processing-tool__output-max").value = max;
  document.querySelector(".array-processing-tool__output-min").value = min;
  document.querySelector(".array-processing-tool__output-median").value = median;
  document.querySelector(".array-processing-tool__subsum-input").value = ArrayProcessingTool.getMaxSubSum(arr);
  document.querySelector(".array-processing-tool__selection-input").value = ArrayProcessingTool.selection(arr).join(" ");
});

document.querySelector(".string-calculator__approve").addEventListener("click", function () {
  var _StringCalculator;

  var inputValue = stringCalculatorInput.value;
  if (inputValue === "") {
    stringCalculatorInput.value = "Input smth to calculate";
    return;
  }
  inputValue = StringCalculator.reduceTwoNeighborsOperatorsInOne(inputValue.replace(/\s/g, ""));
  if (inputValue.includes("(")) inputValue = (_StringCalculator = StringCalculator).replacePrioritiesWithValues.apply(_StringCalculator, _toConsumableArray(StringCalculator.getPriorities(inputValue)));
  inputValue = StringCalculator.calculator(inputValue);
  document.querySelector(".string-calculator__output-area").value = inputValue;
});

document.querySelector(".caching-calculator__approve-input").addEventListener("click", function () {
  var inputToCalculate = cachingCalculatorInput.value;
  var checkboxCheckedValues = Array.from(document.querySelectorAll(".operation-checkbox")).map(function (cbx) {
    return cbx.checked;
  });
  var requiredToBeCachedOperations = Array.from(document.querySelectorAll(".caching-calculator__operator-text")).map(function (div) {
    return div.innerText;
  }).filter(function (_, i) {
    return checkboxCheckedValues[i];
  });
  var isFunctionNeedToBeCached = document.querySelector(".caching-calculator__caching-function-checkbox").checked;
  document.querySelector(".caching-calculator__output-area").value = CachingCalculator.calculate({
    inputToCalculate: inputToCalculate,
    requiredToBeCachedOperations: requiredToBeCachedOperations,
    isFunctionNeedToBeCached: isFunctionNeedToBeCached
  });
});

document.querySelector(".date-formatter__approve-btn").addEventListener("click", function () {
  var inputValue = document.querySelector(".date-formatter__input-area").value;
  var inputFormat = document.querySelector(".date-formatter__input-format-area").value;
  var outputFormat = document.querySelector(".date-formatter__output-format-area").value;
  var isMonthNeedToBeWrittenAsWord = document.querySelector(".date-formatter-checkbox").checked;
  var dateInputFormat = document.querySelector("#select-input-type").value;
  var output = void 0;
  switch (dateInputFormat) {
    case "date":
      output = DateFormatter.formatDate({
        dateString: inputValue,
        isMonthNeedToBeWrittenAsWord: isMonthNeedToBeWrittenAsWord,
        inputFormat: inputFormat,
        outputFormat: outputFormat
      });
      break;
    case "ms":
      output = DateFormatter.formatMS({
        ms: parseFloat(inputValue),
        isMonthNeedToBeWrittenAsWord: isMonthNeedToBeWrittenAsWord,
        outputFormat: outputFormat
      });
      break;
    case "seconds":
      output = DateFormatter.formatMS({
        ms: parseFloat(inputValue) * 1000,
        isMonthNeedToBeWrittenAsWord: isMonthNeedToBeWrittenAsWord,
        outputFormat: outputFormat
      });
      break;
    case "minutes":
      output = DateFormatter.formatMS({
        ms: parseFloat(inputValue) * 1000 * 60,
        isMonthNeedToBeWrittenAsWord: isMonthNeedToBeWrittenAsWord,
        outputFormat: outputFormat
      });
      break;
    case "hours":
      output = DateFormatter.formatMS({
        ms: parseFloat(inputValue) * 1000 * 360,
        isMonthNeedToBeWrittenAsWord: isMonthNeedToBeWrittenAsWord,
        outputFormat: outputFormat
      });
      break;
  }
  document.querySelector(".date-formatter__output-area").value = output;
  document.querySelector(".date-formatter__from-now-output-area").value = DateFormatter.fromNow();
});

document.querySelector(".text-formatter__approve-input").addEventListener("click", function () {
  document.querySelector(".text-formatter__output-area").value = TextFormatter.format({
    text: document.querySelector(".text-formatter__input-area").value,
    maxNumberOfStrings: parseFloat(document.querySelector(".text-formatter__max-number-of-strings-input").value),
    maxSizeOfString: parseFloat(document.querySelector(".text-formatter__max-length-size-input").value),
    formatType: document.querySelector("#break-select").value
  });
});