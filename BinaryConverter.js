class BinaryConverter {
  constructor() {}
  binaryToDecimal(binaryArray) {
    return binaryArray.reduce((p, c, i) => p + c * Math.pow(2, i), 0);
  }
  binaryToHex(binaryArray) {
    return this.decimalToHex(this.binaryToDecimal(binaryArray));
  }
  decimalToBinary(number) {
    let binary = [];
    while (number >= 1) {
      binary.push(number & 1);
      number = number >> 1;
    }
    return binary;
  }
  decimalToHex(number) {
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
  }
  hexToBinary(hexArray) {
    return this.decimalToBinary(this.hexToDecimal(hexArray));
  }
  hexToDecimal(hexArray) {
    return hexArray
      .map((num) =>
        /^[a-f]/.test(num.toString().toLowerCase())
          ? 10 + num.toString().toLowerCase().charCodeAt(0) - "a".charCodeAt(0)
          : num
      )
      .reduce((p, c, i) => p + c * Math.pow(16, i), 0);
  }
}

module.exports = BinaryConverter;
