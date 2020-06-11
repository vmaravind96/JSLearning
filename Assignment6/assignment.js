const numArray = [2, 6, 8, 3, 4, 2, 1.5, 5, 5, 6.79];

const findMaxMin = (inputArray) => {
  const maxEl = Math.max(...inputArray);
  const minEl = Math.min(...inputArray);
  return [maxEl, minEl];
};

const filteredArray = numArray.filter((num) => num > 5);
console.log(filteredArray);

const mapArray = numArray.map((num, idx) => ({ id: idx, value: num }));
console.log(mapArray);

const sum = numArray.reduce((pVal, cVal) => pVal + cVal, 0);
console.log(sum);

const maxEl = Math.max(...numArray);
console.log(maxEl);

const [maxVal, minVal] = findMaxMin(numArray);
console.log("Max Val:" + maxVal + " Min Val: " + minVal);

let mySet = new Set();
mySet.add(2);
mySet.add(5);
mySet.add(2);
mySet.add(6);
console.log(mySet);
