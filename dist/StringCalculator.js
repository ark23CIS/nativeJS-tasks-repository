"use strict";

var StringCalculator = {
  calculator: function calculator(str) {
    if (!!str.match(/[a-zA-Z]/)) throw new Error("input is not correct");
    if (str[0] === "+") str = str.slice(1);
    var numbers = str.split(/[-+*%/]/g).map(function (el) {
      return parseFloat(el);
    });
    var operators = str.match(/[-+*%/]/g) || [];
    if (!operators.length) throw new Error("There are no operators");
    if (str[0] === "-") {
      numbers.shift();
      operators.shift();
      numbers[0] = -numbers[0];
    }
    for (var i = 0; i < operators.length; i++) {
      var finalValue = void 0;
      if (operators[i] === "*") {
        finalValue = StringCalculator.multiply(numbers[i], numbers[i + 1]);
      } else if (operators[i] === "/") {
        finalValue = StringCalculator.divide(numbers[i], numbers[i + 1]);
      } else if (operators[i] === "%") {
        finalValue = StringCalculator.mod(numbers[i], numbers[i + 1]);
      } else {}
      if (!!finalValue || finalValue === 0) {
        numbers.splice(i, 2, finalValue);
        operators.splice(i, 1);
        i--;
      }
    }
    for (var _i = 0; _i < operators.length; _i++) {
      var _finalValue = void 0;
      if (operators[_i] === "+") {
        _finalValue = StringCalculator.sum(numbers[_i], numbers[_i + 1]);
      } else if (operators[_i] === "-") {
        _finalValue = StringCalculator.subtract(numbers[_i], numbers[_i + 1]);
      } else {}
      if (!!_finalValue || _finalValue === 0) {
        numbers.splice(_i, 2, _finalValue);
        operators.splice(_i, 1);
        _i--;
      }
    }
    return numbers[0];
  },
  reduceTwoNeighborsOperatorsInOne: function reduceTwoNeighborsOperatorsInOne(s) {
    for (var i = 1; i < s.length; i++) {
      if ((s[i] + s[i - 1]).match(/[+-]/g) && (s[i] + s[i - 1]).match(/[+-]/g).length === 2) {
        var resultOperator = s[i] === s[i - 1] ? "+" : "-";
        s = s.slice(0, i - 1) + resultOperator + s.slice(i + 1);
        i--;
      }
    }
    return s;
  },
  replacePrioritiesWithValues: function replacePrioritiesWithValues(str, priorities) {
    var _this = this;

    var prioritiesWithBrackets = priorities.map(function (el) {
      return "(" + el + ")";
    });
    prioritiesWithBrackets.forEach(function (el, i) {
      return str = str.replace(el, _this.calculator(priorities[i]));
    });
    return str;
  },
  getPriorities: function getPriorities(str) {
    var copy = str;
    var priorities = [];
    var i = 0;
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
  sum: function sum(a, b) {
    return a + b;
  },
  subtract: function subtract(a, b) {
    return a - b;
  },
  divide: function divide(a, b) {
    return a / b;
  },
  multiply: function multiply(a, b) {
    return a * b;
  },
  mod: function mod(a, b) {
    return a % b;
  }
};