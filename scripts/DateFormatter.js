var DateFormatter = {
  monthsMap: new Map([
    ["01", "January"],
    ["02", "February"],
    ["03", "March"],
    ["04", "April"],
    ["05", "May"],
    ["06", "June"],
    ["07", "July"],
    ["08", "August"],
    ["09", "September"],
    ["10", "October"],
    ["11", "November"],
    ["12", "December"],
  ]),
  daysInMonthMap: new Array(12).fill(0).reduce((p, _, i) => {
    let monthIndex = i + 1;
    return p.set(
      monthIndex < 10 ? `0${monthIndex}` : monthIndex.toString(),
      28 +
        ((monthIndex + Math.trunc(monthIndex / 8)) % 2) +
        (2 % monthIndex) +
        2 * Math.trunc(1 / monthIndex)
    );
  }, new Map()),
  millisecondsFromNinteenSeventy: 0,
  formatDate: function ({
    dateString,
    inputFormat = "DDMMYYYY",
    outputFormat = "DD-MM-YYYY",
    isMonthNeedToBeWrittenAsWord = false,
  }) {
    inputFormat = inputFormat.toUpperCase() || "DDMMYYYY";
    outputFormat = outputFormat.toUpperCase() || "DD-MM-YYYY";
    let day = dateString.slice(
      inputFormat.indexOf("DD"),
      inputFormat.indexOf("DD") + 2
    );
    let month = dateString.slice(
      inputFormat.indexOf("MM"),
      inputFormat.indexOf("MM") + 2
    );
    let yearLength = inputFormat.length - day.length - month.length;
    let yearFormat = "Y".repeat(yearLength);
    let yearFormatIndex = inputFormat.indexOf(yearFormat);
    let year = dateString.slice(yearFormatIndex, yearFormatIndex + yearLength);
    year = parseInt(year);
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      this.daysInMonthMap.set("02", 29);
    }
    if (
      parseInt(month) > 12 ||
      parseInt(month) < 0 ||
      parseInt(day) < 0 ||
      parseInt(day) > this.daysInMonthMap.get(month)
    ) {
      throw new Error("The day doesnt exist");
    }
    year = year.toString();
    this.daysInMonthMap.set("02", 28);
    return this.changeDateAccordingToOuputFormat({
      outputFormat,
      year,
      yearFormat,
      month,
      day,
      isMonthNeedToBeWrittenAsWord,
    });
  },
  fromNow: function () {
    let date = new Date(Date.now() - this.millisecondsFromNinteenSeventy);
    let years = date.getFullYear() - 1970;
    let months = date.getMonth();
    let days = date.getDate() - 1;
    return years + " years " + months + " months " + days + " days";
  },

  changeDateAccordingToOuputFormat: function ({
    outputFormat,
    year,
    yearFormat,
    month,
    day,
    isMonthNeedToBeWrittenAsWord,
  }) {
    this.millisecondsFromNinteenSeventy = Date.parse(
      new Date(year + "-" + month + "-" + day)
    );
    return outputFormat
      .replace(yearFormat, year)
      .replace(
        "MM",
        isMonthNeedToBeWrittenAsWord ? this.monthsMap.get(month) : month
      )
      .replace("DD", day);
  },

  formatMS: function ({
    ms,
    outputFormat,
    isMonthNeedToBeWrittenAsWord = false,
  }) {
    outputFormat = outputFormat.toUpperCase() || "DD-MM-YYYY";
    let date = new Date(ms);
    let year = date.getFullYear().toString();
    let yearFormat = "Y".repeat(year.length);
    let month =
      date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate();
    return this.changeDateAccordingToOuputFormat({
      outputFormat,
      year,
      yearFormat,
      month,
      day,
      isMonthNeedToBeWrittenAsWord,
    });
  },
};
