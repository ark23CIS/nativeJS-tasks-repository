"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// ArraySortTask HTML elements
var arraySortInput = document.querySelector(".array-sort__input-area");
var arraySortOutput = document.querySelector(".array-sort__output-area");
var arraySortApproveBtn = document.querySelector(".array-sort__approve-btn");

// BinaryConverterTask HTML elements
var notationInput = document.querySelector(".binary-converter__notation-input-area");
var radixInput = document.querySelector(".binary-converter__radix-input-area");
var radixOutput = document.querySelector(".binary-converter__radix-output-area");
var notationOutput = document.querySelector(".binary-converter__output-area");
var binaryConverterApproveBtn = document.querySelector(".binary-converter__approve-btn");

// ArrayProcessingToolTask HTML elements
var arrayProcessingToolApprove = document.querySelector(".array-processing-tool__approve");
var arrayProcessingToolInput = document.querySelector(".array-processing-tool__input-area");
var maxElementOutput = document.querySelector(".array-processing-tool__output-max");
var minElementOutput = document.querySelector(".array-processing-tool__output-min");
var medianElementOutput = document.querySelector(".array-processing-tool__output-median");
var subsumOutput = document.querySelector(".array-processing-tool__subsum-input");
var selectionOutput = document.querySelector(".array-processing-tool__selection-input");

// STRING CALCULATOR HTML ELEMENTS
var stringCalculatorInput = document.querySelector(".string-calculator__input-area");
var stringCalculatorApprove = document.querySelector(".string-calculator__approve");
var stringCalculatorOutput = document.querySelector(".string-calculator__output-area");

// ARRAY SORTER TASK
var ArraySorter = {
  bubbleSort: function bubbleSort(arr) {
    if (!arr.length) return [];
    var n = arr.length;
    for (var i = 0; i < n; i++) {
      for (var j = n - 1; j >= i + 1; j--) {
        if (arr[j] < arr[j - 1]) {
          ;
          var _ref = [arr[j - 1], arr[j]];
          arr[j] = _ref[0];
          arr[j - 1] = _ref[1];
        }
      }
    }
    return arr;
  },
  // selection - lower element goes to the start of the output array
  selectionSort: function selectionSort(arr) {
    if (!arr.length) return [];
    var n = arr.length;
    for (var i = 0; i < n; i++) {
      var minIndex = i;
      for (var j = i + 1; j < n; j++) {
        if (arr[minIndex] > arr[j]) minIndex = j;
      }
      if (minIndex !== i) {
        ;
        var _ref2 = [arr[i], arr[minIndex]];
        arr[minIndex] = _ref2[0];
        arr[i] = _ref2[1];
      }
    }
    return arr;
  },
  // insertion - current element inserts to sorted array
  insertionSort: function insertionSort(arr) {
    if (!arr.length) return [];
    for (var i = 1; i < arr.length; i++) {
      var key = arr[i];
      for (var j = i; j > 0 && arr[j - 1] > key; j--) {
        arr[j] = arr[j - 1];
      }
      arr[j] = key;
    }
    return arr;
  },
  // merge - merges sorted arrays into one array
  // mergeSort - split the array into two halves
  mergeSort: function mergeSort(arr) {
    if (arr.length < 2) return arr;
    var l = Math.floor(arr.length / 2);
    var firstArr = arr.slice(0, l);
    var secondArr = arr.slice(l);
    return this.merge(this.mergeSort(firstArr), this.mergeSort(secondArr));
  },
  merge: function merge(arr1, arr2) {
    var finalArr = [];
    while (arr1.length && arr2.length) {
      var element = arr1[0] > arr2[0] ? arr2.shift() : arr1.shift();
      finalArr.push(element);
    }
    return arr1.length ? [].concat(finalArr, _toConsumableArray(arr1)) : [].concat(finalArr, _toConsumableArray(arr2));
  },
  pivot: function pivot(arr) {},
  quickSort: function quickSort(arr) {},
  shellSort: function shellSort(arr) {}
};

// ARRAYPROCESSINGTOOL TASK

var ArrayProcessingTool = {
  // Kadanes Algorithm O(n)
  getMaxSubSum: function getMaxSubSum(arr) {
    var currentMax = arr[0],
        globalMax = currentMax;
    for (var i = 1; i < arr.length; i++) {
      currentMax = arr[i] > currentMax + arr[i] ? arr[i] : currentMax + arr[i];
      if (currentMax > globalMax) globalMax = currentMax;
    }
    return globalMax;
  },
  // getMaxSubSum O(n^2)
  getMaxSubSumNSquaredComplexity: function getMaxSubSumNSquaredComplexity(arr) {
    var sum = 0;
    var max = sum;
    for (var i = 0; i < arr.length; i++) {
      sum = 0;
      for (var j = i; j < arr.length; j++) {
        sum += arr[j];
        if (sum >= max) max = sum;
      }
    }
    return max;
  },
  // Search
  search: function search(arr) {
    var min = arr[0];
    var max = min;
    var copy = [].concat(_toConsumableArray(arr)).sort();
    var median = copy.length % 2 ? copy[(arr.length - 1) / 2] : (copy[arr.length / 2] + copy[arr.length / 2 - 1]) / 2;
    return arr.reduce(function (_, c) {
      if (c > max) max = c;
      if (c < min) min = c;
      return [min, median, max];
    }, []);
  },

  //selection
  selection: function selection(arr) {
    var seqCur = [];
    var seqMem = seqCur;
    return arr.reduce(function (_, c, i) {
      if (!seqCur.length) seqCur.push(c);else {
        if (seqCur[seqCur.length - 1] < c) {
          seqCur.push(c);
          if (i === arr.length - 1 && seqMem.length <= seqCur.length) seqMem = seqCur;
        } else {
          if (seqMem.length <= seqCur.length) seqMem = seqCur;
          seqCur = [c];
        }
      }
      return seqMem;
    }, []);
  }
};

var BinaryConverter = {
  BinaryToDecimal: function BinaryToDecimal(binaryArray) {
    return binaryArray.reduce(function (p, c, i) {
      return p + c * Math.pow(2, i);
    }, 0);
  },
  BinaryToHex: function BinaryToHex(binaryArray) {
    return this.DecimalToHex(this.BinaryToDecimal(binaryArray));
  },

  DecimalToBinary: function DecimalToBinary(number) {
    var binary = [];
    while (number >= 1) {
      binary.push(number & 1);
      number = number >> 1;
    }
    return binary;
  },
  DecimalToHex: function DecimalToHex(number) {
    var quadrants = [];
    var binaryLength = Math.ceil(this.DecimalToBinary(number).length / 4);
    while (binaryLength > 0) {
      quadrants.push(number & 15);
      number = number >> 4;
      binaryLength--;
    }
    return quadrants.map(function (num) {
      return num >= 10 ? String.fromCharCode("a".charCodeAt(0) + num - 10) : num;
    });
  },
  HexToBinary: function HexToBinary(hexArray) {
    return this.DecimalToBinary(this.HexToDecimal(hexArray));
  },
  HexToDecimal: function HexToDecimal(hexArray) {
    console.log(hexArray);
    return hexArray.map(function (num) {
      return (/^[a-f]/.test(num.toString().toLowerCase()) ? 10 + num.toString().toLowerCase().charCodeAt(0) - "a".charCodeAt(0) : num
      );
    }).reduce(function (p, c, i) {
      return p + c * Math.pow(16, i);
    }, 0);
  }
};

var StringCalculator = {
  calculator: function calculator(str) {
    if (str[0] === "+") str = str.slice(1);
    var numbers = str.split(/[-+*%/]/g).map(function (el) {
      return parseFloat(el);
    });
    var operators = str.match(/[-+*%/]/g);
    if (str[0] === "-") {
      numbers.shift();
      operators.shift();
      numbers[0] = -numbers[0];
    }
    console.log(operators);
    console.log(numbers);
    for (var i = 0; i < operators.length; i++) {
      var finalValue = void 0;
      if (operators[i] === "*") {
        finalValue = StringCalculator.multiply(numbers[i], numbers[i + 1]);
      } else if (operators[i] === "/") {
        finalValue = StringCalculator.divide(numbers[i], numbers[i + 1]);
      } else if (operators[i] === "%") {
        finalValue = StringCalculator.mod(numbers[i], numbers[i + 1]);
      } else {}
      if (!!finalValue || finalValue === 0) {
        numbers.splice(i, 2, finalValue);
        operators.splice(i, 1);
        i--;
      }
    }
    for (var _i = 0; _i < operators.length; _i++) {
      var _finalValue = void 0;
      if (operators[_i] === "+") {
        _finalValue = StringCalculator.sum(numbers[_i], numbers[_i + 1]);
      } else if (operators[_i] === "-") {
        _finalValue = StringCalculator.subtract(numbers[_i], numbers[_i + 1]);
      } else {}
      if (!!_finalValue || _finalValue === 0) {
        numbers.splice(_i, 2, _finalValue);
        operators.splice(_i, 1);
        _i--;
      }
    }
    return numbers[0];
  },
  reduceTwoNeighborsOperatorsInOne: function reduceTwoNeighborsOperatorsInOne(s) {
    for (var i = 1; i < s.length; i++) {
      if ((s[i] + s[i - 1]).match(/[+-]/g) && (s[i] + s[i - 1]).match(/[+-]/g).length === 2) {
        var resultOperator = s[i] === s[i - 1] ? "+" : "-";
        s = s.slice(0, i - 1) + resultOperator + s.slice(i + 1);
        i--;
      }
    }
    return s;
  },
  replacePrioritiesWithValues: function replacePrioritiesWithValues(str, priorities) {
    var _this = this;

    var prioritiesWithBrackets = priorities.map(function (el) {
      return "(" + el + ")";
    });
    prioritiesWithBrackets.forEach(function (el, i) {
      return str = str.replace(el, _this.calculator(priorities[i]));
    });
    return str;
  },
  getPriorities: function getPriorities(str) {
    var copy = str;
    var priorities = [];
    var i = 0;
    while (str.includes("(") || str.includes(")")) {
      if (str[i] === "(") {
        str = str.slice(i + 1);
        i = 0;
      } else if (str[i] === ")") {
        priorities.push(str.slice(0, i));
        str = str.slice(i + 1);
        i = 0;
      } else {
        i++;
      }
    }
    return [copy, priorities];
  },
  sum: function sum(a, b) {
    return a + b;
  },
  subtract: function subtract(a, b) {
    return a - b;
  },
  divide: function divide(a, b) {
    return a / b;
  },
  multiply: function multiply(a, b) {
    return a * b;
  },
  mod: function mod(a, b) {
    return a % b;
  }
};

var textFormatter = {
  deleteEmptyElementsAfterSplit: function deleteEmptyElementsAfterSplit(arr) {
    return arr.reduce(function (p, c) {
      return c !== "" ? [].concat(_toConsumableArray(p), [c]) : p;
    }, []);
  },
  format: function format(_ref3) {
    var text = _ref3.text,
        _ref3$maxSizeOfString = _ref3.maxSizeOfString,
        maxSizeOfString = _ref3$maxSizeOfString === undefined ? Number.MAX_SAFE_INTEGER : _ref3$maxSizeOfString,
        _ref3$maxNumberOfStri = _ref3.maxNumberOfStrings,
        maxNumberOfStrings = _ref3$maxNumberOfStri === undefined ? Number.MAX_SAFE_INTEGER : _ref3$maxNumberOfStri,
        _ref3$formatType = _ref3.formatType,
        formatType = _ref3$formatType === undefined ? "" : _ref3$formatType;

    if (maxSizeOfString === 0 || maxNumberOfStrings === 0) return "";
    var delimiters = [" ./?,<>[]{}|\\-+()*&^:;%$#@!^_"];
    var chunks = void 0;
    for (var i = 1; i < text.length; i++) {
      if (text[i] === " " && delimiters[0].includes(text[i - 1])) {
        text = text.slice(0, i) + text.slice(i + 1);
        i--;
      }
    }
    formatTypesRegExp = {
      sentences: "[!?.]",
      words: '[ !?.-/():;"]',
      chars: '[ !?.-/();:"]'
    };
    chunks = this.deleteEmptyElementsAfterSplit(text.split(new RegExp(formatTypesRegExp[formatType])));
    var signs = [];
    for (var _i2 = 0; _i2 < chunks.length - 1; _i2++) {
      signs.push(text.split(new RegExp(chunks[_i2] + "|" + chunks[_i2 + 1]))[1]);
      if (_i2 === chunks.length - 2) {
        signs.push(text.split(new RegExp(chunks[_i2] + "|" + chunks[_i2 + 1]))[2]);
      }
    }
    chunks = chunks.map(function (el, i) {
      return "" + el + signs[i];
    });
    if (formatType === "chars") chunks = text.split("");
    var textFormArray = [];
    for (var _i3 = 0; _i3 < chunks.length && textFormArray.length < maxNumberOfStrings; _i3++) {
      var remainingCharacters = 0;
      if (chunks[_i3].length <= maxSizeOfString) {
        textFormArray[textFormArray.length] = chunks[_i3];
        remainingCharacters = maxSizeOfString - chunks[_i3].length;
        for (var j = _i3 + 1; j < chunks.length && remainingCharacters >= chunks[j].length; j++) {
          remainingCharacters -= chunks[j].length;
          textFormArray[textFormArray.length - 1] += chunks[j];
        }
        _i3 = j - 1;
      } else {
        throw new Error("Not enough size to wrap a word");
      }
    }
    return textFormArray.join("\n");
  }
};
// DOM
var addIncorrect = function addIncorrect(el) {
  return el.classList.add("incorrect");
};
var removeIncorrect = function removeIncorrect(el) {
  return el.classList.remove("incorrect");
};

arraySortApproveBtn.addEventListener("click", function () {
  var inputValue = arraySortInput.value;
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

binaryConverterApproveBtn.addEventListener("click", function () {
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

arrayProcessingToolApprove.addEventListener("click", function () {
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

  maxElementOutput.value = max;
  minElementOutput.value = min;
  medianElementOutput.value = median;
  subsumOutput.value = ArrayProcessingTool.getMaxSubSum(arr);
  selectionOutput.value = ArrayProcessingTool.selection(arr).join(" ");
});

stringCalculatorApprove.addEventListener("click", function () {
  var inputValue = stringCalculatorInput.value;
  inputValue = StringCalculator.reduceTwoNeighborsOperatorsInOne(inputValue.replace(/\s/g, ""));
  console.log(inputValue);
  if (inputValue.includes("(")) inputValue = StringCalculator.replacePrioritiesWithValues.apply(StringCalculator, _toConsumableArray(StringCalculator.getPriorities(inputValue)));
  inputValue = StringCalculator.calculator(inputValue);
  stringCalculatorOutput.value = inputValue;
});