function isPalindrome(str) {
  // Write your code here
  return str === str.split("").reverse().join("");
}
module.exports = isPalindrome;