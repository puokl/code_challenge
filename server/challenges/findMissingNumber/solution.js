function findMissingNumber(arr) {
  arr.sort((a, b) => a - b);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] > 1) {
      return arr[i - 1] + 1;
    }
  }
  // If no missing number is found, return a message or a specific value
}
module.exports = findMissingNumber;