var ArraySorter = {
  bubbleSort: function (arr) {
    if (!arr.length) return [];
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      for (let j = n - 1; j >= i + 1; j--) {
        if (arr[j] < arr[j - 1]) [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
    return arr;
  },
  // selection - lower element goes to the start of the output array
  selectionSort: function (arr) {
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
  },
  // insertion - current element inserts to sorted array
  insertionSort: function (arr) {
    if (!arr.length) return [];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      for (var j = i; j > 0 && arr[j - 1] > key; j--) {
        arr[j] = arr[j - 1];
      }
      arr[j] = key;
    }
    return arr;
  },
  // merge - merges sorted arrays into one array
  // mergeSort - split the array into two halves
  mergeSort: function (arr) {
    if (arr.length < 2) return arr;
    let l = Math.floor(arr.length / 2);
    let firstArr = arr.slice(0, l);
    let secondArr = arr.slice(l);
    return this.merge(this.mergeSort(firstArr), this.mergeSort(secondArr));
  },
  merge: function (arr1, arr2) {
    let finalArr = [];
    while (arr1.length && arr2.length) {
      let element = arr1[0] > arr2[0] ? arr2.shift() : arr1.shift();
      finalArr.push(element);
    }
    return arr1.length ? [...finalArr, ...arr1] : [...finalArr, ...arr2];
  },
  heapSort: function (arr) {
    this.formHeap(arr);
    for (let end = arr.length - 1; end >= 1; end--) {
      [arr[0], arr[end]] = [arr[end], arr[0]];
      this.heapFilter(arr, 0, end - 1);
    }
    return arr;
  },
  heapFilter: function (arr, current, end) {
    let firstIndex = current * 2 + 1;
    while (firstIndex <= end) {
      let swappingIndex;
      let secondIndex = current * 2 + 2 <= end ? current * 2 + 2 : -1;
      swappingIndex =
        secondIndex > -1 && arr[secondIndex] > arr[firstIndex]
          ? secondIndex
          : firstIndex;
      if (arr[swappingIndex] > arr[current])
        [arr[swappingIndex], arr[current]] = [arr[current], arr[swappingIndex]];
      else return;
    }
  },
  formHeap: function (arr) {
    let firstIndex = Math.floor((arr.length - 1) / 2);
    for (let current = firstIndex; current >= 0; current--) {
      this.heapFilter(arr, current, arr.length - 1);
    }
  },
  quickSort: function (arr) {
    this.quickSortHelper(arr, 0, arr.length - 1);
    return arr;
  },
  quickSortHelper: function (arr, start, end) {
    if (start > end) return;
    let pivot = start;
    let left = start + 1;
    let right = end;
    while (right >= left) {
      if (arr[left] > arr[pivot] && arr[right] < arr[pivot])
        [arr[left], arr[right]] = [arr[right], arr[left]];
      if (arr[left] <= arr[pivot]) left++;
      if (arr[right] >= arr[pivot]) right--;
    }
    [arr[pivot], arr[right]] = [arr[right], arr[pivot]];
    if (right - 1 - start < end - right - 1) {
      this.quickSortHelper(arr, start, right - 1);
      this.quickSortHelper(arr, right + 1, end);
    } else {
      this.quickSortHelper(arr, right + 1, end);
      this.quickSortHelper(arr, start, right - 1);
    }
  },
};
