var CachingCalculator = {
  cachedOperations: new Map(),
  calculate: function ({
    inputToCalculate,
    requiredToBeCachedOperations = [],
    isFunctionNeedToBeCached = false,
  }) {
    if (!!inputToCalculate.match(/[a-zA-Z]/))
      throw new Error("input can not contain letters");
    inputToCalculate = inputToCalculate.replace(/\s/g, "");
    let copy = inputToCalculate;
    let proceed = true;
    let values = [];
    while (proceed) {
      if (copy.match(/[-+]?\d*[.,]?\d+(?:[eE][-+]?\d+)?/)) {
        values.push(
          parseFloat(copy.match(/[-+]?\d*[.,]?\d+(?:[eE][-+]?\d+)?/)[0])
        );
        copy = copy.replace(/[-+]?\d*[.,]?\d+(?:[eE][-+]?\d+)?/, "");
      } else proceed = false;
    }
    let operators = copy.match(/[-+*%/]/g);
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
