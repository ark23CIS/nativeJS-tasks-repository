var ArrayProcessingTool = {
  // Kadanes Algorithm O(n)
  getMaxSubSum: function (arr) {
    let currentMax = arr[0],
      globalMax = currentMax;
    for (let i = 1; i < arr.length; i++) {
      currentMax = arr[i] > currentMax + arr[i] ? arr[i] : currentMax + arr[i];
      if (currentMax > globalMax) globalMax = currentMax;
    }
    return globalMax;
  },
  // getMaxSubSum O(n^2)
  getMaxSubSumNSquaredComplexity: function (arr) {
    let sum = 0;
    let max = sum;
    for (let i = 0; i < arr.length; i++) {
      sum = 0;
      for (let j = i; j < arr.length; j++) {
        sum += arr[j];
        if (sum >= max) max = sum;
      }
    }
    return max;
  },
  // Search
  search: function (arr) {
    let min = arr[0];
    let max = min;
    let copy = [...arr].sort();
    let median =
      copy.length % 2
        ? copy[(arr.length - 1) / 2]
        : (copy[arr.length / 2] + copy[arr.length / 2 - 1]) / 2;
    return arr.reduce((_, c) => {
      if (c > max) max = c;
      if (c < min) min = c;
      return [min, median, max];
    }, []);
  },

  //selection
  selection: function (arr) {
    let seqCur = [];
    let seqMem = seqCur;
    return arr.reduce((_, c, i) => {
      if (!seqCur.length) seqCur.push(c);
      else {
        if (seqCur[seqCur.length - 1] < c) {
          seqCur.push(c);
          if (i === arr.length - 1 && seqMem.length <= seqCur.length)
            seqMem = seqCur;
        } else {
          if (seqMem.length <= seqCur.length) seqMem = seqCur;
          seqCur = [c];
        }
      }
      return seqMem;
    }, []);
  },
};
