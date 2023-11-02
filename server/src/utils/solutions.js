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

// Challenge 3: Factorial
// Description: Calculates the factorial of a given non-negative integer
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// Challenge 4: isPalindrome
// Description: Checks whether a given string is a palindrome.
function isPalindrome(str) {
  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return cleanedStr === cleanedStr.split("").reverse().join("");
}
// Challenge 5: isPalindrome
function isDateObject(input) {
  return input instanceof Date;
}

// Challenge 6: isWeekend
function isWeekend(date) {
  if (!(date instanceof Date)) {
    throw new Error("Input is not a Date object");
  }

  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

// Challenge : University OOP
class University {
  constructor(name) {
    this.name = name;
    this.departments = new Set();
  }

  addDepartment(departmentName) {
    this.departments.add(departmentName);
  }

  removeDepartment(departmentName) {
    this.departments.delete(departmentName);
  }

  getDepartments() {
    return Array.from(this.departments);
  }
}
