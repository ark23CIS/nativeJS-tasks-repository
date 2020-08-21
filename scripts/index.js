// ArraySortTask HTML elements
var arraySortOutput = document.querySelector(".array-sort__output-area");

// BinaryConverterTask HTML elements
var notationInput = document.querySelector(
  ".binary-converter__notation-input-area"
);
var radixInput = document.querySelector(".binary-converter__radix-input-area");
var radixOutput = document.querySelector(
  ".binary-converter__radix-output-area"
);
var notationOutput = document.querySelector(".binary-converter__output-area");

// ArrayProcessingToolTask HTML elements
var arrayProcessingToolInput = document.querySelector(
  ".array-processing-tool__input-area"
);

// STRING CALCULATOR HTML ELEMENTS
var stringCalculatorInput = document.querySelector(
  ".string-calculator__input-area"
);

// Caching CALCULATOR
var cachingCalculatorInput = document.querySelector(
  ".caching-calculator__input-area"
);
// DOM
const addIncorrect = (el) => el.classList.add("incorrect");
const removeIncorrect = (el) => el.classList.remove("incorrect");

document
  .querySelector(".array-sort__approve-btn")
  .addEventListener("click", () => {
    let inputValue = document.querySelector(".array-sort__input-area").value;
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
    let sortType = document.querySelector("#select-sort").value;
    arraySortOutput.value = ArraySorter[sortType](arr).join(" ");
  });

document
  .querySelector(".binary-converter__approve-btn")
  .addEventListener("click", () => {
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
      radixInput.value = radixOutput.value =
        "The radix doesnt has a realization";
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

document
  .querySelector(".array-processing-tool__approve")
  .addEventListener("click", () => {
    let inputValue = arrayProcessingToolInput.value;
    if (
      (inputValue == "" && inputValue) ||
      inputValue.split(" ").filter((el) => /^[0-9]+$/.test(el)).length !==
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
    document.querySelector(".array-processing-tool__output-max").value = max;
    document.querySelector(".array-processing-tool__output-min").value = min;
    document.querySelector(
      ".array-processing-tool__output-median"
    ).value = median;
    document.querySelector(
      ".array-processing-tool__subsum-input"
    ).value = ArrayProcessingTool.getMaxSubSum(arr);
    document.querySelector(
      ".array-processing-tool__selection-input"
    ).value = ArrayProcessingTool.selection(arr).join(" ");
  });

document
  .querySelector(".string-calculator__approve")
  .addEventListener("click", () => {
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
    document.querySelector(
      ".string-calculator__output-area"
    ).value = inputValue;
  });

document
  .querySelector(".caching-calculator__approve-input")
  .addEventListener("click", () => {
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
    document.querySelector(
      ".caching-calculator__output-area"
    ).value = CachingCalculator.calculate({
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
    document.querySelector(
      ".text-formatter__output-area"
    ).value = TextFormatter.format({
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
