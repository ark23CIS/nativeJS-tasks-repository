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
