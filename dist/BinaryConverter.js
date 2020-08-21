"use strict";

var BinaryConverter = {
  BinaryToDecimal: function BinaryToDecimal(binaryArray) {
    return binaryArray.reduce(function (p, c, i) {
      return p + c * Math.pow(2, i);
    }, 0);
  },
  BinaryToHex: function BinaryToHex(binaryArray) {
    return this.DecimalToHex(this.BinaryToDecimal(binaryArray));
  },

  DecimalToBinary: function DecimalToBinary(number) {
    var binary = [];
    while (number >= 1) {
      binary.push(number & 1);
      number = number >> 1;
    }
    return binary;
  },
  DecimalToHex: function DecimalToHex(number) {
    var quadrants = [];
    var binaryLength = Math.ceil(this.DecimalToBinary(number).length / 4);
    while (binaryLength > 0) {
      quadrants.push(number & 15);
      number = number >> 4;
      binaryLength--;
    }
    return quadrants.map(function (num) {
      return num >= 10 ? String.fromCharCode("a".charCodeAt(0) + num - 10) : num;
    });
  },
  HexToBinary: function HexToBinary(hexArray) {
    return this.DecimalToBinary(this.HexToDecimal(hexArray));
  },
  HexToDecimal: function HexToDecimal(hexArray) {
    return hexArray.map(function (num) {
      return (/^[a-f]/.test(num.toString().toLowerCase()) ? 10 + num.toString().toLowerCase().charCodeAt(0) - "a".charCodeAt(0) : num
      );
    }).reduce(function (p, c, i) {
      return p + c * Math.pow(16, i);
    }, 0);
  }
};