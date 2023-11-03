const binarySearch = require("./solution");

describe("Binary Search", () => {
  test("finds the index of number in sorted array", () => {
    expect(binarySearch([1, 3, 5, 7, 9, 11], 7)).toBe(3);
  });

  test("returns -1 if number is not in array", () => {
    expect(binarySearch([2, 4, 6, 8, 10, 12], 7)).toBe(-1);
  });

  test("works with array of length 1", () => {
    expect(binarySearch([5], 5)).toBe(0);
    expect(binarySearch([3], 5)).toBe(-1);
  });

  test("works with negative numbers", () => {
    expect(binarySearch([-5, -3, -1, 0, 2, 4], 0)).toBe(3);
  });
});
