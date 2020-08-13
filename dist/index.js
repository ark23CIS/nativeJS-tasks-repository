"use strict";

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
  // getMaxSubSum O(n^2)
  getMaxSubSum: function getMaxSubSum(arr) {
    var max = sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum = 0;
      for (var j = i; j < arr.length; j++) {
        sum += arr[j];
        if (sum >= max) max = sum;
      }
    }
    return max;
  },

  // getMaxSubSum O(n)

  // Search
  search: function search(arr) {
    var min = max = arr[0];
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
    var seqMem = seqCur = [];
    return arr.reduce(function (p, c, i) {
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
  binaryToDecimal: function binaryToDecimal(binaryArray) {
    return binaryArray.reduce(function (p, c, i) {
      return p + c * Math.pow(2, i);
    }, 0);
  },
  binaryToHex: function binaryToHex(binaryArray) {
    return this.decimalToHex(this.binaryToDecimal(binaryArray));
  },

  decimalToBinary: function decimalToBinary(number) {
    var binary = [];
    while (number >= 1) {
      binary.push(number & 1);
      number = number >> 1;
    }
    return binary;
  },
  decimalToHex: function decimalToHex(number) {
    var quadrants = [];
    var binaryLength = Math.ceil(this.decimalToBinary(number).length / 4);
    while (binaryLength > 0) {
      quadrants.push(number & 15);
      number = number >> 4;
      binaryLength--;
    }
    return quadrants.map(function (num) {
      return num >= 10 ? String.fromCharCode("a".charCodeAt(0) + num - 10) : num;
    });
  },
  hexToBinary: function hexToBinary(hexArray) {
    return this.decimalToBinary(this.hexToDecimal(hexArray));
  },
  hexToDecimal: function hexToDecimal(hexArray) {
    return hexArray.map(function (num) {
      return (/^[a-f]/.test(num.toString().toLowerCase()) ? 10 + num.toString().toLowerCase().charCodeAt(0) - "a".charCodeAt(0) : num
      );
    }).reduce(function (p, c, i) {
      return p + c * Math.pow(16, i);
    }, 0);
  }
};

// DOM
var addIncorrect = function addIncorrect(el) {
  return el.classList.add("incorrect");
};

arraySortApproveBtn.addEventListener("click", function () {
  var inputValue = arraySortInput.value;
  if (inputValue == "" && inputValue || inputValue.split(" ").filter(function (el) {
    return (/^[0-9]+$/.test(el)
    );
  }).length !== inputValue.split(" ").length) {
    arraySortOutput.value = "incorrect input should be written with spaces without using commas (4 1 2)";
    addIncorrect(arraySortOutput);
    return;
  }
  document.querySelector(".array-sort__output-area").classList.remove("incorrect");
  var arr = inputValue.split(" ").map(function (el) {
    return parseInt(el);
  });
  // console.log("clicked");
  // console.log(ArraySorter.bubbleSort(arr).join(" "));
  arraySortOutput.value = ArraySorter.bubbleSort(arr).join(" ");
});

binaryConverterApproveBtn.addEventListener("click", function () {
  var notations = ["2", "10", "16"];
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
});