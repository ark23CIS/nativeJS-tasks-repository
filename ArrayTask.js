// getMaxSubSum O(n^2)
const getMaxSubSum = (arr) => {
  let max = (sum = 0);
  for (let i = 0; i < arr.length; i++) {
    sum = 0;
    for (let j = i; j < arr.length; j++) {
      sum += arr[j];
      if (sum >= max) max = sum;
    }
  }
  return max;
};

// getMaxSubSum O(n)

// Search
const search = (arr) => {
  let min = (max = arr[0]);
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
};

//selection
const selection = (arr) => {
  let seqMem = (seqCur = []);
  return arr.reduce((p, c, i) => {
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
};

let Array = {
  getMaxSubSum,
  search,
  selection,
};

module.exports = Array;
