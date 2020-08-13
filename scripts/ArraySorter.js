class ArraySorter {
  constructor() {}
  // BubbleSort - lower element goes to the left / higher element goes to the right
  bubbleSort(arr) {
    if (!arr.length) return [];
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      for (let j = n - 1; j >= i + 1; j--) {
        if (arr[j] < arr[j - 1]) [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
    return arr;
  }
  // selection - lower element goes to the start of the output array
  selectionSort(arr) {
    if (!arr.length) return [];
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[minIndex] > arr[j]) minIndex = j;
      }
      if (minIndex !== i) [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
    }
    return arr;
  }
  // insertion - current element inserts to sorted array
  insertionSort(arr) {
    if (!arr.length) return [];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      for (var j = i; j > 0 && arr[j - 1] > key; j--) {
        arr[j] = arr[j - 1];
      }
      arr[j] = key;
    }
    return arr;
  }
  // merge - merges sorted arrays into one array
  // mergeSort - split the array into two halves
  mergeSort(arr) {
    if (arr.length < 2) return arr;
    let l = Math.floor(arr.length / 2);
    let firstArr = arr.slice(0, l);
    let secondArr = arr.slice(l);
    return this.merge(this.mergeSort(firstArr), this.mergeSort(secondArr));
  }
  merge(arr1, arr2) {
    let finalArr = [];
    while (arr1.length && arr2.length) {
      let element = arr1[0] > arr2[0] ? arr2.shift() : arr1.shift();
      finalArr.push(element);
    }
    return arr1.length ? [...finalArr, ...arr1] : [...finalArr, ...arr2];
  }
  pivot(arr) {}
  quickSort(arr) {}
  shellSort(arr) {}
}

module.exports = ArraySorter;