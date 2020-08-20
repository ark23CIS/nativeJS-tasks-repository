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
      TextFormatter.deleteEmptyElementsAfterSplit(
        inputToCalculate.split(/[-+*%/]/g)
      ).map((el) => parseFloat(el)) || [];
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
