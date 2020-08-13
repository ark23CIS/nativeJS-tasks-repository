"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArraySorter = function () {
  function ArraySorter() {
    _classCallCheck(this, ArraySorter);
  }
  // BubbleSort - lower element goes to the left / higher element goes to the right


  _createClass(ArraySorter, [{
    key: "bubbleSort",
    value: function bubbleSort(arr) {
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
    }
    // selection - lower element goes to the start of the output array

  }, {
    key: "selectionSort",
    value: function selectionSort(arr) {
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
    }
    // insertion - current element inserts to sorted array

  }, {
    key: "insertionSort",
    value: function insertionSort(arr) {
      if (!arr.length) return [];
      for (var i = 1; i < arr.length; i++) {
        var key = arr[i];
        for (var j = i; j > 0 && arr[j - 1] > key; j--) {
          arr[j] = arr[j - 1];
        }
        arr[j] = key;
      }
      return arr;
    }
    // merge - merges sorted arrays into one array
    // mergeSort - split the array into two halves

  }, {
    key: "mergeSort",
    value: function mergeSort(arr) {
      if (arr.length < 2) return arr;
      var l = Math.floor(arr.length / 2);
      var firstArr = arr.slice(0, l);
      var secondArr = arr.slice(l);
      return this.merge(this.mergeSort(firstArr), this.mergeSort(secondArr));
    }
  }, {
    key: "merge",
    value: function merge(arr1, arr2) {
      var finalArr = [];
      while (arr1.length && arr2.length) {
        var element = arr1[0] > arr2[0] ? arr2.shift() : arr1.shift();
        finalArr.push(element);
      }
      return arr1.length ? [].concat(finalArr, _toConsumableArray(arr1)) : [].concat(finalArr, _toConsumableArray(arr2));
    }
  }, {
    key: "pivot",
    value: function pivot(arr) {}
  }, {
    key: "quickSort",
    value: function quickSort(arr) {}
  }, {
    key: "shellSort",
    value: function shellSort(arr) {}
  }]);

  return ArraySorter;
}();

module.exports = ArraySorter;