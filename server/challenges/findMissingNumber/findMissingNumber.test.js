const findMissingNumber = require("./solution");

describe("Find Missing Number", () => {
  test("find the missing number [1, 2, 3, 4, 6]", () => {
    expect(findMissingNumber([1, 2, 3, 4, 6])).toBe(5);
  });

  test("find the missing number [13, 14, 16, 17, 18]", () => {
    expect(findMissingNumber([13, 14, 16, 17, 18])).toBe(15);
  });

  test("find the missing number [101, 103]", () => {
    expect(findMissingNumber([101, 103])).toBe(102);
  });
  test("find the missing number in unsorted array [5, 4, 6, 1, 3]", () => {
    expect(findMissingNumber([5, 4, 6, 1, 3])).toBe(2);
  });
});
