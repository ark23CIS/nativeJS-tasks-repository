"use strict";

var DateFormatter = {
  monthsMap: new Map([["01", "January"], ["02", "February"], ["03", "March"], ["04", "April"], ["05", "May"], ["06", "June"], ["07", "July"], ["08", "August"], ["09", "September"], ["10", "October"], ["11", "November"], ["12", "December"]]),
  daysInMonthMap: new Array(12).fill(0).reduce(function (p, _, i) {
    var monthIndex = i + 1;
    return p.set(monthIndex < 10 ? "0" + monthIndex : monthIndex.toString(), 28 + (monthIndex + Math.trunc(monthIndex / 8)) % 2 + 2 % monthIndex + 2 * Math.trunc(1 / monthIndex));
  }, new Map()),
  millisecondsFromNinteenSeventy: 0,
  formatDate: function formatDate(_ref) {
    var dateString = _ref.dateString,
        _ref$inputFormat = _ref.inputFormat,
        inputFormat = _ref$inputFormat === undefined ? "DDMMYYYY" : _ref$inputFormat,
        _ref$outputFormat = _ref.outputFormat,
        outputFormat = _ref$outputFormat === undefined ? "DD-MM-YYYY" : _ref$outputFormat,
        _ref$isMonthNeedToBeW = _ref.isMonthNeedToBeWrittenAsWord,
        isMonthNeedToBeWrittenAsWord = _ref$isMonthNeedToBeW === undefined ? false : _ref$isMonthNeedToBeW;

    inputFormat = inputFormat.toUpperCase() || "DDMMYYYY";
    outputFormat = outputFormat.toUpperCase() || "DD-MM-YYYY";
    var day = dateString.slice(inputFormat.indexOf("DD"), inputFormat.indexOf("DD") + 2);
    var month = dateString.slice(inputFormat.indexOf("MM"), inputFormat.indexOf("MM") + 2);
    var yearLength = inputFormat.length - day.length - month.length;
    var yearFormat = "Y".repeat(yearLength);
    var yearFormatIndex = inputFormat.indexOf(yearFormat);
    var year = dateString.slice(yearFormatIndex, yearFormatIndex + yearLength);
    year = parseInt(year);
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
      this.daysInMonthMap.set("02", 29);
    }
    if (parseInt(month) > 12 || parseInt(month) < 0 || parseInt(day) < 0 || parseInt(day) > this.daysInMonthMap.get(month)) {
      throw new Error("The day doesnt exist");
    }
    year = year.toString();
    this.daysInMonthMap.set("02", 28);
    return this.changeDateAccordingToOuputFormat({
      outputFormat: outputFormat,
      year: year,
      yearFormat: yearFormat,
      month: month,
      day: day,
      isMonthNeedToBeWrittenAsWord: isMonthNeedToBeWrittenAsWord
    });
  },
  fromNow: function fromNow() {
    var date = new Date(Date.now() - this.millisecondsFromNinteenSeventy);
    var years = date.getFullYear() - 1970;
    var months = date.getMonth();
    var days = date.getDate() - 1;
    return years + " years " + months + " months " + days + " days";
  },

  changeDateAccordingToOuputFormat: function changeDateAccordingToOuputFormat(_ref2) {
    var outputFormat = _ref2.outputFormat,
        year = _ref2.year,
        yearFormat = _ref2.yearFormat,
        month = _ref2.month,
        day = _ref2.day,
        isMonthNeedToBeWrittenAsWord = _ref2.isMonthNeedToBeWrittenAsWord;

    this.millisecondsFromNinteenSeventy = Date.parse(new Date(year + "-" + month + "-" + day));
    return outputFormat.replace(yearFormat, year).replace("MM", isMonthNeedToBeWrittenAsWord ? this.monthsMap.get(month) : month).replace("DD", day);
  },

  formatMS: function formatMS(_ref3) {
    var ms = _ref3.ms,
        outputFormat = _ref3.outputFormat,
        _ref3$isMonthNeedToBe = _ref3.isMonthNeedToBeWrittenAsWord,
        isMonthNeedToBeWrittenAsWord = _ref3$isMonthNeedToBe === undefined ? false : _ref3$isMonthNeedToBe;

    outputFormat = outputFormat.toUpperCase() || "DD-MM-YYYY";
    var date = new Date(ms);
    var year = date.getFullYear().toString();
    var yearFormat = "Y".repeat(year.length);
    var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate();
    return this.changeDateAccordingToOuputFormat({
      outputFormat: outputFormat,
      year: year,
      yearFormat: yearFormat,
      month: month,
      day: day,
      isMonthNeedToBeWrittenAsWord: isMonthNeedToBeWrittenAsWord
    });
  }
};