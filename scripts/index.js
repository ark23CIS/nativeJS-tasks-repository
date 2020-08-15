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

// ArrayProcessingToolTask HTML elements
var arrayProcessingToolApprove = document.querySelector(
  ".array-processing-tool__approve"
);
var arrayProcessingToolInput = document.querySelector(
  ".array-processing-tool__input-area"
);
var maxElementOutput = document.querySelector(
  ".array-processing-tool__output-max"
);
var minElementOutput = document.querySelector(
  ".array-processing-tool__output-min"
);
var medianElementOutput = document.querySelector(
  ".array-processing-tool__output-median"
);
var subsumOutput = document.querySelector(
  ".array-processing-tool__subsum-input"
);
var selectionOutput = document.querySelector(
  ".array-processing-tool__selection-input"
);

// STRING CALCULATOR HTML ELEMENTS
var stringCalculatorInput = document.querySelector('.string-calculator__input-area');
var stringCalculatorApprove = document.querySelector('.string-calculator__approve');
var stringCalculatorOutput = document.querySelector('.string-calculator__output-area');

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
    let sum = 0;
    let max = sum;
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
    let min = arr[0];
    let max = min;
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
    let seqCur = [];
    let seqMem = seqCur;
    return arr.reduce((_, c, i) => {
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
  BinaryToDecimal: function (binaryArray) {
    return binaryArray.reduce((p, c, i) => p + c * Math.pow(2, i), 0);
  },
  BinaryToHex(binaryArray) {
    return this.DecimalToHex(this.BinaryToDecimal(binaryArray));
  },
  DecimalToBinary: function (number) {
    let binary = [];
    while (number >= 1) {
      binary.push(number & 1);
      number = number >> 1;
    }
    return binary;
  },
  DecimalToHex: function (number) {
    let quadrants = [];
    let binaryLength = Math.ceil(this.DecimalToBinary(number).length / 4);
    while (binaryLength > 0) {
      quadrants.push(number & 15);
      number = number >> 4;
      binaryLength--;
    }
    return quadrants.map((num) =>
      num >= 10 ? String.fromCharCode("a".charCodeAt(0) + num - 10) : num
    );
  },
  HexToBinary: function (hexArray) {
    return this.DecimalToBinary(this.HexToDecimal(hexArray));
  },
  HexToDecimal: function (hexArray) {
    console.log(hexArray);
    return hexArray
      .map((num) =>
        /^[a-f]/.test(num.toString().toLowerCase())
          ? 10 + num.toString().toLowerCase().charCodeAt(0) - "a".charCodeAt(0)
          : num
      )
      .reduce((p, c, i) => p + c * Math.pow(16, i), 0);
  },
};

var StringCalculator = {
  calculator: function (str) {
    if (str[0] === '+') str = str.slice(1);
    let numbers = str.split(/[-+*%/]/g).map((el) => parseFloat(el));
    let operators = str.match(/[-+*%/]/g);
    if (str[0] === '-') {
      numbers.shift();
      operators.shift();
      numbers[0] = -numbers[0];
    }
    console.log(operators);
    console.log(numbers);
    for (let i = 0; i < operators.length; i++) {
      let finalValue;
      if (operators[i] === "*") {
        finalValue = StringCalculator.multiply(numbers[i], numbers[i + 1]);
      } else if (operators[i] === "/") {
        finalValue = StringCalculator.divide(numbers[i], numbers[i + 1]);
      } else if (operators[i] === "%") {
        finalValue = StringCalculator.mod(numbers[i], numbers[i + 1]);
      } else {
      }
      if (!!finalValue) {
        numbers.splice(i, 2, finalValue);
        operators.splice(i, 1);
        i--;
      }
    }
    for (let i = 0; i < operators.length; i++) {
      let finalValue;
      if (operators[i] === "+") {
        finalValue = StringCalculator.sum(numbers[i], numbers[i + 1]);
      } else if (operators[i] === "-") {
        finalValue = StringCalculator.subtract(numbers[i], numbers[i + 1]);
      } else {
      }
      if (!!finalValue || finalValue === 0) {
        numbers.splice(i, 2, finalValue);
        operators.splice(i, 1);
        i--;
      }
    }
    return numbers[0];
  },
  reduceTwoNeighborsOperatorsInOne: function(s)  {
    for (let i = 1; i < s.length; i++) {
      if ((s[i]+s[i-1]).match(/[+-]/g) && (s[i]+s[i-1]).match(/[+-]/g).length === 2 ) {
        let resultOperator = (s[i] === s[i-1]) ? '+': '-';
        s = s.slice(0,i - 1) + resultOperator + s.slice(i + 1);
        i--;
      }
    }
    return s;
  },
  replacePrioritiesWithValues: function (str, priorities) {
    let prioritiesWithBrackets = priorities.map((el) => `(${el})`);
    prioritiesWithBrackets.forEach(
      (el, i) => (str = str.replace(el, this.calculator(priorities[i])))
    );
    return str;
  },
  getPriorities: function (str) {
    let copy = str;
    let priorities = [];
    let i = 0;
    while (str.includes("(") || str.includes(")")) {
      if (str[i] === "(") {
        str = str.slice(i + 1);
        i = 0;
      } else if (str[i] === ")") {
        priorities.push(str.slice(0, i));
        str = str.slice(i + 1);
        i = 0;
      } else {
        i++;
      }
    }
    return [copy, priorities];
  },
  sum: function (a, b) {
    return a + b;
  },
  subtract: function (a, b) {
    return a - b;
  },
  divide: function (a, b) {
    return a / b;
  },
  multiply: function (a, b) {
    return a * b;
  },
  mod: function (a, b) {
    return a % b;
  },
};

// DOM
const addIncorrect = (el) => el.classList.add("incorrect");
const removeIncorrect = (el) => el.classList.remove("incorrect");

arraySortApproveBtn.addEventListener("click", () => {
  let inputValue = arraySortInput.value;
  if (
    (inputValue == "" && inputValue) ||
    inputValue.split(" ").filter((el) => /^-?[0-9]+$/.test(el)).length !==
      inputValue.split(" ").length
  ) {
    arraySortOutput.value =
      "incorrect input should be written with spaces without using commas (4 1 2)";
    addIncorrect(arraySortOutput);
    return;
  }
  removeIncorrect(arraySortOutput);
  let arr = inputValue.split(" ").map((el) => parseInt(el));
  let sortType = document.querySelector("#select-sort").value;
  arraySortOutput.value = ArraySorter[sortType](arr).join(" ");
});

binaryConverterApproveBtn.addEventListener("click", () => {
  const notations = ["2", "10", "16"];
  const radixMap = new Map([
    ["2", "Binary"],
    ["10", "Decimal"],
    ["16", "Hex"],
  ]);
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
  let dataInput;
  switch (radixInput.value) {
    case "2":
      if (
        notationInput.value.split("").filter((el) => /^[0-1]$/.test(el))
          .length !== n
      ) {
        notationOutput.value = "Invalid binary input";
        addIncorrect(notationOutput);
        return;
      }
      dataInput = notationInput.value
        .split("")
        .reverse()
        .map((el) => parseFloat(el));
      break;
    case "10":
      dataInput = notationInput.value;
      break;
    case "16":
      const n = notationInput.value.length;
      if (
        notationInput.value.split("").filter((el) => /^[0-9a-fA-F]$/.test(el))
          .length !== n
      ) {
        notationOutput.value = "Invalid hex input";
        addIncorrect(notationOutput);
        return;
      }
      dataInput = notationInput.value
        .split("")
        .reverse()
        .map((el) => (/^[0-9]$/.test(el) ? parseFloat(el) : el));
    default:
      break;
  }
  let method = "";
  for (let radix of radixMap)
    if (radixInput.value === radix[0]) method += radix[1] + "To";
  for (let radix of radixMap)
    if (radixOutput.value === radix[0]) method += radix[1];
  let dataOutput = BinaryConverter[method](dataInput);
  switch (radixOutput.value) {
    case "2":
    case "16":
      dataOutput = dataOutput.reverse().join("");
      break;
    default:
      break;
  }
  notationOutput.value = dataOutput;
});

arrayProcessingToolApprove.addEventListener("click", () => {
  let inputValue = arrayProcessingToolInput.value;
  if (
    (inputValue == "" && inputValue) ||
    inputValue.split(" ").filter((el) => /^-?[0-9]+$/.test(el)).length !==
      inputValue.split(" ").length
  ) {
    arrayProcessingToolInput.value =
      "incorrect input should be written with spaces without using commas (4 1 2)";
    addIncorrect(arrayProcessingToolInput);
    return;
  }
  removeIncorrect(arrayProcessingToolInput);
  let arr = inputValue.split(" ").map((el) => parseInt(el));
  let [min, median, max] = ArrayProcessingTool.search(arr);
  maxElementOutput.value = max;
  minElementOutput.value = min;
  medianElementOutput.value = median;
  subsumOutput.value = ArrayProcessingTool.getMaxSubSum(arr);
  selectionOutput.value = ArrayProcessingTool.selection(arr).join(" ");
});

stringCalculatorApprove.addEventListener('click', () => {
  let inputValue = stringCalculatorInput.value;
  inputValue = StringCalculator.reduceTwoNeighborsOperatorsInOne(inputValue.replace(/\s/g, ''));
  console.log(inputValue);
  if (inputValue.includes('(')) inputValue = StringCalculator.replacePrioritiesWithValues(...StringCalculator.getPriorities(inputValue));
  inputValue = StringCalculator.calculator(inputValue);
  stringCalculatorOutput.value = inputValue;
});
