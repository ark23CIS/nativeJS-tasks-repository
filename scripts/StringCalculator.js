var StringCalculator = {
  calculator: function (str) {
    if (!!str.match(/[a-zA-Z]/)) throw new Error("input is not correct");
    if (str[0] === "+") str = str.slice(1);
    let numbers = str.split(/[-+*%/]/g).map((el) => parseFloat(el));
    let operators = str.match(/[-+*%/]/g) || [];
    if (!operators.length) throw new Error("There are no operators");
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
