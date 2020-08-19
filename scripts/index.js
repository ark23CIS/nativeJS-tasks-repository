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
var stringCalculatorInput = document.querySelector(
  ".string-calculator__input-area"
);
var stringCalculatorApprove = document.querySelector(
  ".string-calculator__approve"
);
var stringCalculatorOutput = document.querySelector(
  ".string-calculator__output-area"
);

// Caching CALCULATOR
var cachingCalculatorApproveBTN = document.querySelector(
  ".caching-calculator__approve-input"
);

var cachingCalculatorInput = document.querySelector(
  ".caching-calculator__input-area"
);

var cachingCalculatorOutput = document.querySelector(
  ".caching-calculator__output-area"
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
  // Kadanes Algorithm O(n)
  getMaxSubSum: function (arr) {
    let currentMax = arr[0],
      globalMax = currentMax;
    for (let i = 1; i < arr.length; i++) {
      currentMax = arr[i] > currentMax + arr[i] ? arr[i] : currentMax + arr[i];
      if (currentMax > globalMax) globalMax = currentMax;
    }
    return globalMax;
  },
  // getMaxSubSum O(n^2)
  getMaxSubSumNSquaredComplexity: function (arr) {
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
    if (str[0] === "+") str = str.slice(1);
    let numbers = str.split(/[-+*%/]/g).map((el) => parseFloat(el));
    let operators = str.match(/[-+*%/]/g) || [];
    if (!operators.length) return "";
    if (str[0] === "-") {
      numbers.shift();
      operators.shift();
      numbers[0] = -numbers[0];
    }
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
      if (!!finalValue || finalValue === 0) {
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
  reduceTwoNeighborsOperatorsInOne: function (s) {
    for (let i = 1; i < s.length; i++) {
      if (
        (s[i] + s[i - 1]).match(/[+-]/g) &&
        (s[i] + s[i - 1]).match(/[+-]/g).length === 2
      ) {
        let resultOperator = s[i] === s[i - 1] ? "+" : "-";
        s = s.slice(0, i - 1) + resultOperator + s.slice(i + 1);
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

var CachingCalculator = {
  cachedOperations: new Map(),
  calculate: function ({
    inputToCalculate,
    requiredToBeCachedOperations = [],
    isFunctionNeedToBeCached = false,
  }) {
    inputToCalculate = inputToCalculate.replace(/\s/g, "");
    let operators = inputToCalculate.match(/[-+*%/]/g);
    let values =
      textFormatter
        .deleteEmptyElementsAfterSplit(inputToCalculate.split(/[-+*%/]/g))
        .map((el) => parseFloat(el)) || [];
    let [operator] = operators;
    let [firstValue, secondValue] = values;
    if (operators.length !== 1 || values.length !== 2)
      throw new Error("You need to pass 2 values and between them an operator");
    let result = 0;
    if (this.cachedOperations.has(inputToCalculate)) {
      return this.cachedOperations.get(inputToCalculate);
    }
    switch (operator) {
      case "+":
        result = firstValue + secondValue;
        break;
      case "-":
        result = firstValue - secondValue;
        break;
      case "*":
        result = firstValue * secondValue;
        break;
      case "/":
        result = firstValue / secondValue;
        break;
      case "%":
        result = firstValue % secondValue;
        break;
      default:
        break;
    }
    if (
      isFunctionNeedToBeCached ||
      requiredToBeCachedOperations.includes(operator)
    ) {
      this.cachedOperations.set(inputToCalculate, result);
    }
    return result;
  },
};

var textFormatter = {
  deleteEmptyElementsAfterSplit: function (arr) {
    return arr.reduce((p, c) => (c !== "" ? [...p, c] : p), []);
  },
  format: function ({
    text,
    maxSizeOfString = Number.MAX_SAFE_INTEGER,
    maxNumberOfStrings = Number.MAX_SAFE_INTEGER,
    formatType = "overflow",
  }) {
    maxSizeOfString = maxSizeOfString || Number.MAX_SAFE_INTEGER;
    maxNumberOfStrings = maxNumberOfStrings || Number.MAX_SAFE_INTEGER;
    if (maxSizeOfString === 0 || maxNumberOfStrings === 0) return "";
    const delimiters = [" ./?,<>[]{}|\\-+()*&^:;%$#@!^_"];
    let chunks;
    for (let i = 1; i < text.length; i++) {
      if (text[i] === " " && delimiters[0].includes(text[i - 1])) {
        text = text.slice(0, i) + text.slice(i + 1);
        i--;
      }
    }
    let symbols;
    switch (formatType) {
      case "overflow":
      case "chars":
        chunks = text.split("");
        break;
      case "words":
      case "sentences":
        symbols =
          formatType === "words"
            ? text.match(/[ !,.:;?()]/g)
            : text.match(/[!.?]/g);
        chunks =
          formatType === "words"
            ? text.split(/[ !,.:;?()]/g)
            : text.split(/[!.?]/g);
        if (!symbols) break;
        symbols = [];
        for (let i = 0; i < chunks.length - 1; i++) {
          symbols.push(
            text.split(new RegExp(`${chunks[i]}|${chunks[i + 1]}`))[1]
          );
          if (i === chunks.length - 2) {
            symbols.push(
              text.split(new RegExp(`${chunks[i]}|${chunks[i + 1]}`))[2]
            );
          }
        }
        chunks = chunks.map((el, i) => `${el}${symbols[i]}`);
        break;
    }
    var textFormArray = [];
    let noContinue = false;
    for (
      let i = 0;
      i < chunks.length && textFormArray.length < maxNumberOfStrings;
      i++
    ) {
      let remainingCharacters = 0;
      if (chunks[i].length <= maxSizeOfString) {
        if (noContinue) break;
        textFormArray[textFormArray.length] = chunks[i];
        remainingCharacters = maxSizeOfString - chunks[i].length;
        for (
          var j = i + 1;
          j < chunks.length && remainingCharacters >= chunks[j].length;
          j++
        ) {
          remainingCharacters -= chunks[j].length;
          textFormArray[textFormArray.length - 1] += chunks[j];
        }
        if (formatType === "overflow") noContinue = true;
        i = j - 1;
      } else {
        throw new Error("Not enough size to wrap a word");
      }
    }
    return textFormArray.join("\n");
  },
};

var DateFormatter = {
  monthsMap: new Map([
    ["01", "January"],
    ["02", "February"],
    ["03", "March"],
    ["04", "April"],
    ["05", "May"],
    ["06", "June"],
    ["07", "July"],
    ["08", "August"],
    ["09", "September"],
    ["10", "October"],
    ["11", "November"],
    ["12", "December"],
  ]),
  daysInMonthMap: new Array(12).fill(0).reduce((p, _, i) => {
    let monthIndex = i + 1;
    return p.set(
      monthIndex < 10 ? `0${monthIndex}` : monthIndex.toString(),
      28 +
        ((monthIndex + Math.trunc(monthIndex / 8)) % 2) +
        (2 % monthIndex) +
        2 * Math.trunc(1 / monthIndex)
    );
  }, new Map()),
  millisecondsFromNinteenSeventy: 0,
  formatDate: function ({
    dateString,
    inputFormat = "DDMMYYYY",
    outputFormat = "DD-MM-YYYY",
    isMonthNeedToBeWrittenAsWord = false,
  }) {
    inputFormat = inputFormat.toUpperCase() || "DDMMYYYY";
    outputFormat = outputFormat.toUpperCase() || "DD-MM-YYYY";
    let day = dateString.slice(
      inputFormat.indexOf("DD"),
      inputFormat.indexOf("DD") + 2
    );
    let month = dateString.slice(
      inputFormat.indexOf("MM"),
      inputFormat.indexOf("MM") + 2
    );
    let yearLength = inputFormat.length - day.length - month.length;
    let yearFormat = "Y".repeat(yearLength);
    let yearFormatIndex = inputFormat.indexOf(yearFormat);
    let year = dateString.slice(yearFormatIndex, yearFormatIndex + yearLength);
    year = parseInt(year);
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      this.daysInMonthMap.set("02", 29);
    }
    if (
      parseInt(month) > 12 ||
      parseInt(month) < 0 ||
      parseInt(day) < 0 ||
      parseInt(day) > this.daysInMonthMap.get(month)
    ) {
      throw new Error("The day doesnt exist");
    }
    year = year.toString();
    this.daysInMonthMap.set("02", 28);
    return this.changeDateAccordingToOuputFormat({
      outputFormat,
      year,
      yearFormat,
      month,
      day,
      isMonthNeedToBeWrittenAsWord,
    });
  },
  fromNow: function () {
    let date = new Date(Date.now() - this.millisecondsFromNinteenSeventy);
    let years = date.getFullYear() - 1970;
    let months = date.getMonth();
    let days = date.getDate() - 1;
    return years + " years " + months + " months " + days + " days";
  },

  changeDateAccordingToOuputFormat: function ({
    outputFormat,
    year,
    yearFormat,
    month,
    day,
    isMonthNeedToBeWrittenAsWord,
  }) {
    this.millisecondsFromNinteenSeventy = Date.parse(
      new Date(year + "-" + month + "-" + day)
    );
    return outputFormat
      .replace(yearFormat, year)
      .replace(
        "MM",
        isMonthNeedToBeWrittenAsWord ? this.monthsMap.get(month) : month
      )
      .replace("DD", day);
  },

  formatMS: function ({
    ms,
    outputFormat,
    isMonthNeedToBeWrittenAsWord = false,
  }) {
    outputFormat = outputFormat.toUpperCase() || "DD-MM-YYYY";
    let date = new Date(ms);
    let year = date.getFullYear().toString();
    let yearFormat = "Y".repeat(year.length);
    let month =
      date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate();
    return this.changeDateAccordingToOuputFormat({
      outputFormat,
      year,
      yearFormat,
      month,
      day,
      isMonthNeedToBeWrittenAsWord,
    });
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

stringCalculatorApprove.addEventListener("click", () => {
  let inputValue = stringCalculatorInput.value;
  if (inputValue === "") {
    stringCalculatorInput.value = "Input smth to calculate";
    return;
  }
  inputValue = StringCalculator.reduceTwoNeighborsOperatorsInOne(
    inputValue.replace(/\s/g, "")
  );
  if (inputValue.includes("("))
    inputValue = StringCalculator.replacePrioritiesWithValues(
      ...StringCalculator.getPriorities(inputValue)
    );
  inputValue = StringCalculator.calculator(inputValue);
  stringCalculatorOutput.value = inputValue;
});

cachingCalculatorApproveBTN.addEventListener("click", () => {
  let inputToCalculate = cachingCalculatorInput.value;
  let checkboxCheckedValues = Array.from(
    document.querySelectorAll(".operation-checkbox")
  ).map((cbx) => cbx.checked);
  let requiredToBeCachedOperations = Array.from(
    document.querySelectorAll(".caching-calculator__operator-text")
  )
    .map((div) => div.innerText)
    .filter((_, i) => checkboxCheckedValues[i]);
  let isFunctionNeedToBeCached = document.querySelector(
    ".caching-calculator__caching-function-checkbox"
  ).checked;
  cachingCalculatorOutput.value = CachingCalculator.calculate({
    inputToCalculate,
    requiredToBeCachedOperations,
    isFunctionNeedToBeCached,
  });
});

document
  .querySelector(".date-formatter__approve-btn")
  .addEventListener("click", () => {
    let inputValue = document.querySelector(".date-formatter__input-area")
      .value;
    let inputFormat = document.querySelector(
      ".date-formatter__input-format-area"
    ).value;
    let outputFormat = document.querySelector(
      ".date-formatter__output-format-area"
    ).value;
    let isMonthNeedToBeWrittenAsWord = document.querySelector(
      ".date-formatter-checkbox"
    ).checked;
    let dateInputFormat = document.querySelector("#select-input-type").value;
    let output;
    switch (dateInputFormat) {
      case "date":
        output = DateFormatter.formatDate({
          dateString: inputValue,
          isMonthNeedToBeWrittenAsWord,
          inputFormat,
          outputFormat,
        });
        break;
      case "ms":
        output = DateFormatter.formatMS({
          ms: parseFloat(inputValue),
          isMonthNeedToBeWrittenAsWord,
          outputFormat,
        });
        break;
      case "seconds":
        output = DateFormatter.formatMS({
          ms: parseFloat(inputValue) * 1000,
          isMonthNeedToBeWrittenAsWord,
          outputFormat,
        });
        break;
      case "minutes":
        output = DateFormatter.formatMS({
          ms: parseFloat(inputValue) * 1000 * 60,
          isMonthNeedToBeWrittenAsWord,
          outputFormat,
        });
        break;
      case "hours":
        output = DateFormatter.formatMS({
          ms: parseFloat(inputValue) * 1000 * 360,
          isMonthNeedToBeWrittenAsWord,
          outputFormat,
        });
        break;
    }
    document.querySelector(".date-formatter__output-area").value = output;
    document.querySelector(
      ".date-formatter__from-now-output-area"
    ).value = DateFormatter.fromNow();
  });

document
  .querySelector(".text-formatter__approve-input")
  .addEventListener("click", () => {
    let maxSizeOfString = document.querySelector(
      ".text-formatter__max-length-size"
    ).value;
    let maxNumberOfStrings = document.querySelector(
      ".text-formatter__max-number-of-strings"
    ).value;
    document.querySelector(
      ".text-formatter__output-area"
    ).value = textFormatter.format({
      text: document.querySelector(".text-formatter__input-area").value,
      maxNumberOfStrings: parseFloat(
        document.querySelector(".text-formatter__max-number-of-strings-input")
          .value
      ),
      maxSizeOfString: parseFloat(
        document.querySelector(".text-formatter__max-length-size-input").value
      ),
      formatType: document.querySelector("#break-select").value,
    });
  });
