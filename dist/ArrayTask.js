"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// getMaxSubSum O(n^2)
var getMaxSubSum = function getMaxSubSum(arr) {
  var max = sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum = 0;
    for (var j = i; j < arr.length; j++) {
      sum += arr[j];
      if (sum >= max) max = sum;
    }
  }
  return max;
};

// getMaxSubSum O(n)

// Search
var search = function search(arr) {
  var min = max = arr[0];
  var copy = [].concat(_toConsumableArray(arr)).sort();
  var median = copy.length % 2 ? copy[(arr.length - 1) / 2] : (copy[arr.length / 2] + copy[arr.length / 2 - 1]) / 2;
  return arr.reduce(function (_, c) {
    if (c > max) max = c;
    if (c < min) min = c;
    return [min, median, max];
  }, []);
};

//selection
var selection = function selection(arr) {
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
};

var Array = {
  getMaxSubSum: getMaxSubSum,
  search: search,
  selection: selection
};

module.exports = Array;