// Challenge 1: Uppercase First Letter
// Description: Converts the first letter of each word of a string to uppercase.
function capitalize(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Challenge 2: Alphabetical Order
// Description: Returns a passed string with letters in alphabetical order.
function alphabeticalOrder(str) {
  return str.split("").sort().join("");
}
