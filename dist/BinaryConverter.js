"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinaryConverter = function () {
  function BinaryConverter() {
    _classCallCheck(this, BinaryConverter);
  }

  _createClass(BinaryConverter, [{
    key: "binaryToDecimal",
    value: function binaryToDecimal(binaryArray) {
      return binaryArray.reduce(function (p, c, i) {
        return p + c * Math.pow(2, i);
      }, 0);
    }
  }, {
    key: "binaryToHex",
    value: function binaryToHex(binaryArray) {
      return this.decimalToHex(this.binaryToDecimal(binaryArray));
    }
  }, {
    key: "decimalToBinary",
    value: function decimalToBinary(number) {
      var binary = [];
      while (number >= 1) {
        binary.push(number & 1);
        number = number >> 1;
      }
      return binary;
    }
  }, {
    key: "decimalToHex",
    value: function decimalToHex(number) {
      var quadrants = [];
      var binaryLength = Math.ceil(this.decimalToBinary(number).length / 4);
      while (binaryLength > 0) {
        quadrants.push(number & 15);
        number = number >> 4;
        binaryLength--;
      }
      return quadrants.map(function (num) {
        return num >= 10 ? String.fromCharCode("a".charCodeAt(0) + num - 10) : num;
      });
    }
  }, {
    key: "hexToBinary",
    value: function hexToBinary(hexArray) {
      return this.decimalToBinary(this.hexToDecimal(hexArray));
    }
  }, {
    key: "hexToDecimal",
    value: function hexToDecimal(hexArray) {
      return hexArray.map(function (num) {
        return (/^[a-f]/.test(num.toString().toLowerCase()) ? 10 + num.toString().toLowerCase().charCodeAt(0) - "a".charCodeAt(0) : num
        );
      }).reduce(function (p, c, i) {
        return p + c * Math.pow(16, i);
      }, 0);
    }
  }]);

  return BinaryConverter;
}();

module.exports = BinaryConverter;