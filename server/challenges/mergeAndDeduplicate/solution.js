function mergeAndDeduplicate(arr1, arr2) {
  const mergedArray = arr1.concat(arr2);
  return [...new Set(mergedArray)];
}
module.exports = mergeAndDeduplicate;