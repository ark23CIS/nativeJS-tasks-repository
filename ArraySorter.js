class ArraySorter {
  constructor() {}

  // BubbleSort - lower element goes to the left / higher element goes to the right
  bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      for (let j = n - 1; j >= i + 1; j--) {
        if (arr[j] < arr[j - 1]) {
          let a = arr[j],
            b = arr[j - 1];
          arr[j] = b;
          arr[j - 1] = a;
        }
      }
    }
    return arr;
  }
  selectionSort(arr) {}
  insertionSort(arr) {}
  mergeSort(arr) {}
  quickSort(arr) {}
  shellSort(arr) {}
}

module.exports = ArraySorter;
