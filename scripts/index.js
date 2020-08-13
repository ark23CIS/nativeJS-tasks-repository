// ArraySortTask HTML elements
var arraySortInput = document.querySelector(".array-sort__input-area");
var arraySortOutput = document.querySelector(".array-sort__output-area");
var arraySortApproveBtn = document.querySelector(".array-sort__approve-btn");

// BinaryConverterTask HTML elements
var notationInput = document.querySelector(
  ".binary-converter__notation-input-area"
);
var radixInput = document.querySelector(".binary-converter__radix-input-area");
var radixOutput = document.querySelector(
  ".binary-converter__radix-output-area"
);
var notationOutput = document.querySelector(".binary-converter__output-area");
var binaryConverterApproveBtn = document.querySelector(
  ".binary-converter__approve-btn"
);

// ARRAY SORTER TASK
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
  pivot: function (arr) {},
  quickSort: function (arr) {},
  shellSort: function (arr) {},
};

// ARRAYPROCESSINGTOOL TASK

var ArrayProcessingTool = {
  // getMaxSubSum O(n^2)
  getMaxSubSum: function (arr) {
    let max = (sum = 0);
    for (let i = 0; i < arr.length; i++) {
      sum = 0;
      for (let j = i; j < arr.length; j++) {
        sum += arr[j];
        if (sum >= max) max = sum;
      }
    }
    return max;
  },

  // getMaxSubSum O(n)

  // Search
  search: function (arr) {
    let min = (max = arr[0]);
    let copy = [...arr].sort();
    let median =
      copy.length % 2
        ? copy[(arr.length - 1) / 2]
        : (copy[arr.length / 2] + copy[arr.length / 2 - 1]) / 2;
    return arr.reduce((_, c) => {
      if (c > max) max = c;
      if (c < min) min = c;
      return [min, median, max];
    }, []);
  },

  //selection
  selection: function (arr) {
    let seqMem = (seqCur = []);
    return arr.reduce((p, c, i) => {
      if (!seqCur.length) seqCur.push(c);
      else {
        if (seqCur[seqCur.length - 1] < c) {
          seqCur.push(c);
          if (i === arr.length - 1 && seqMem.length <= seqCur.length)
            seqMem = seqCur;
        } else {
          if (seqMem.length <= seqCur.length) seqMem = seqCur;
          seqCur = [c];
        }
      }
      return seqMem;
    }, []);
  },
};

var BinaryConverter = {
  binaryToDecimal: function (binaryArray) {
    return binaryArray.reduce((p, c, i) => p + c * Math.pow(2, i), 0);
  },
  binaryToHex(binaryArray) {
    return this.decimalToHex(this.binaryToDecimal(binaryArray));
  },
  decimalToBinary: function (number) {
    let binary = [];
    while (number >= 1) {
      binary.push(number & 1);
      number = number >> 1;
    }
    return binary;
  },
  decimalToHex: function (number) {
    let quadrants = [];
    let binaryLength = Math.ceil(this.decimalToBinary(number).length / 4);
    while (binaryLength > 0) {
      quadrants.push(number & 15);
      number = number >> 4;
      binaryLength--;
    }
    return quadrants.map((num) =>
      num >= 10 ? String.fromCharCode("a".charCodeAt(0) + num - 10) : num
    );
  },
  hexToBinary: function (hexArray) {
    return this.decimalToBinary(this.hexToDecimal(hexArray));
  },
  hexToDecimal: function (hexArray) {
    return hexArray
      .map((num) =>
        /^[a-f]/.test(num.toString().toLowerCase())
          ? 10 + num.toString().toLowerCase().charCodeAt(0) - "a".charCodeAt(0)
          : num
      )
      .reduce((p, c, i) => p + c * Math.pow(16, i), 0);
  },
};

// DOM
const addIncorrect = (el) => el.classList.add("incorrect");
const removeIncorrect = (el) => el.classList.remove("incorrect");

arraySortApproveBtn.addEventListener("click", () => {
  let inputValue = arraySortInput.value;
  if (
    (inputValue == "" && inputValue) ||
    inputValue.split(" ").filter((el) => /^[0-9]+$/.test(el)).length !==
      inputValue.split(" ").length
  ) {
    arraySortOutput.value =
      "incorrect input should be written with spaces without using commas (4 1 2)";
    addIncorrect(arraySortOutput);
    return;
  }
  removeIncorrect(arraySortOutput);
  let arr = inputValue.split(" ").map((el) => parseInt(el));
  arraySortOutput.value = ArraySorter.bubbleSort(arr).join(" ");
});

binaryConverterApproveBtn.addEventListener("click", () => {
  const notations = ["2", "10", "16"];
  if (
    !notations.includes(radixInput.value) ||
    !notations.includes(radixOutput.value)
  ) {
    radixInput.value = radixOutput.value = "The radix doesnt has a realization";
    addIncorrect(radixInput);
    addIncorrect(radixOutput);
    return;
  }
  if (radixInput.value === radixOutput.value) {
    radixInput.value = radixOutput.value =
      "No need to convert radix to the same radix";
    addIncorrect(radixInput);
    addIncorrect(radixOutput);
    return;
  }
  if (notationInput == "") {
    notationInput.value =
      "Need to input number in its radix before pressing button";
    addIncorrect(notationInput);
    return;
  }
  removeIncorrect(radixOutput);
  removeIncorrect(radixInput);
  removeIncorrect(notationInput);
});
