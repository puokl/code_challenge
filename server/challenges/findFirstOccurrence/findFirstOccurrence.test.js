const findFirstOccurrence = require("./solution");

describe("findFirstOccurrence", () => {
  test("finds the first occurrence of a target element", () => {
    expect(findFirstOccurrence([1, 2, 4, 4, 4, 5, 6], 4)).toBe(2);
  });

  test("returns -1 when target is not present", () => {
    expect(findFirstOccurrence([1, 2, 3, 5, 6], 4)).toBe(-1);
  });

  test("finds first occurrence at the beginning", () => {
    expect(findFirstOccurrence([2, 2, 3, 4, 5], 2)).toBe(0);
  });

  test("finds first occurrence at the end", () => {
    expect(findFirstOccurrence([1, 2, 3, 3], 3)).toBe(2);
  });
});
