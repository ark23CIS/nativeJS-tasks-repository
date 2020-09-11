"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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