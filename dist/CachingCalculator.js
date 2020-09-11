"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var CachingCalculator = {
  cachedOperations: new Map(),
  calculate: function calculate(_ref) {
    var inputToCalculate = _ref.inputToCalculate,
        _ref$requiredToBeCach = _ref.requiredToBeCachedOperations,
        requiredToBeCachedOperations = _ref$requiredToBeCach === undefined ? [] : _ref$requiredToBeCach,
        _ref$isFunctionNeedTo = _ref.isFunctionNeedToBeCached,
        isFunctionNeedToBeCached = _ref$isFunctionNeedTo === undefined ? false : _ref$isFunctionNeedTo;

    if (!!inputToCalculate.match(/[a-zA-Z]/)) throw new Error("input can not contain letters");
    inputToCalculate = inputToCalculate.replace(/\s/g, "");
    var copy = inputToCalculate;
    var proceed = true;
    var values = [];
    while (proceed) {
      if (copy.match(/[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?/)) {
        values.push(parseFloat(copy.match(/[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?/)[0]));
        copy = copy.replace(/[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?/, "");
      } else proceed = false;
    }
    var operators = copy.match(/[-+*%/]/g);

    var _operators = _slicedToArray(operators, 1),
        operator = _operators[0];

    var firstValue = values[0],
        secondValue = values[1];

    if (operators.length !== 1 || values.length !== 2) throw new Error("You need to pass 2 values and between them an operator");
    var result = 0;
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
    if (isFunctionNeedToBeCached || requiredToBeCachedOperations.includes(operator)) {
      this.cachedOperations.set(inputToCalculate, result);
    }
    return result;
  }
};