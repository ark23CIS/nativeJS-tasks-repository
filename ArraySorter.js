class ArraySorter {
  constructor() {}

  // BubbleSort - lower element goes to the left / higher element goes to the right
  bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      for (let j = n - 1; j >= i + 1; j--) {
        if (arr[j] < arr[j - 1]) [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
    return arr;
  }
  selectionSort(arr) {}
  insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      for (var j = i; j > 0 && arr[j - 1] > key; j--) {
        arr[j] = arr[j - 1];
      }
      arr[j] = key;
    }
    return arr;
  }
  mergeSort(arr) {}
  quickSort(arr) {}
  shellSort(arr) {}
}

module.exports = ArraySorter;
