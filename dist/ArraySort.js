"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
  heapSort: function heapSort(arr) {
    this.formHeap(arr);
    for (var end = arr.length - 1; end >= 1; end--) {
      var _ref3 = [arr[end], arr[0]];
      arr[0] = _ref3[0];
      arr[end] = _ref3[1];

      this.heapFilter(arr, 0, end - 1);
    }
    return arr;
  },
  heapFilter: function heapFilter(arr, current, end) {
    var firstIndex = current * 2 + 1;
    while (firstIndex <= end) {
      var swappingIndex = void 0;
      var secondIndex = current * 2 + 2 <= end ? current * 2 + 2 : -1;
      swappingIndex = secondIndex > -1 && arr[secondIndex] > arr[firstIndex] ? secondIndex : firstIndex;
      if (arr[swappingIndex] > arr[current]) {
        ;
        var _ref4 = [arr[current], arr[swappingIndex]];
        arr[swappingIndex] = _ref4[0];
        arr[current] = _ref4[1];
      } else return;
    }
  },
  formHeap: function formHeap(arr) {
    var firstIndex = Math.floor((arr.length - 1) / 2);
    for (var current = firstIndex; current >= 0; current--) {
      this.heapFilter(arr, current, arr.length - 1);
    }
  },
  quickSort: function quickSort(arr) {
    this.quickSortHelper(arr, 0, arr.length - 1);
    return arr;
  },
  quickSortHelper: function quickSortHelper(arr, start, end) {
    if (start > end) return;
    var pivot = start;
    var left = start + 1;
    var right = end;
    while (right >= left) {
      if (arr[left] > arr[pivot] && arr[right] < arr[pivot]) {
        ;
        var _ref5 = [arr[right], arr[left]];
        arr[left] = _ref5[0];
        arr[right] = _ref5[1];
      }if (arr[left] <= arr[pivot]) left++;
      if (arr[right] >= arr[pivot]) right--;
    }
    var _ref6 = [arr[right], arr[pivot]];
    arr[pivot] = _ref6[0];
    arr[right] = _ref6[1];

    if (right - 1 - start < end - right - 1) {
      this.quickSortHelper(arr, start, right - 1);
      this.quickSortHelper(arr, right + 1, end);
    } else {
      this.quickSortHelper(arr, right + 1, end);
      this.quickSortHelper(arr, start, right - 1);
    }
  }
};