const isPalindrome = require("./solution");

describe("Palindrome Checker", () => {
  test("A simple palindrome word", () => {
    expect(isPalindrome("racecar")).toBe(true);
  });

  test("A non-palindrome word", () => {
    expect(isPalindrome("hello")).toBe(false);
  });

  test("A palindrome sentence with spaces and punctuation", () => {
    expect(isPalindrome("A man, a plan, a canal, Panama")).toBe(true);
  });

  test("Another palindrome sentence with spaces and punctuation", () => {
    expect(isPalindrome("Was it a car or a cat I saw?")).toBe(true);
  });

  test("A palindrome phrase with spaces and punctuation", () => {
    expect(isPalindrome("No lemon, no melon")).toBe(true);
  });

  test("A palindrome phrase with spaces", () => {
    expect(isPalindrome("Step on no pets")).toBe(true);
  });
});
