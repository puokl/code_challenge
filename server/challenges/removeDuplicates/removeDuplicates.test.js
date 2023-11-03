const removeDuplicates = require("./solution");

describe("removeDuplicates", () => {
  test("removes duplicates from [1, 2, 3, 2, 4]", () => {
    expect(removeDuplicates([1, 2, 3, 2, 4])).toEqual([1, 2, 3, 4]);
  });

  test("removes duplicates from ['a', 'b', 'a', 'c', 'b']", () => {
    expect(removeDuplicates(["a", "b", "a", "c", "b"])).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  test("returns the same array when no duplicates [1, 2, 3]", () => {
    expect(removeDuplicates([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test("returns an empty array when given an empty array", () => {
    expect(removeDuplicates([])).toEqual([]);
  });

  test("removes duplicates from [2, 2, 2, 2, 2]", () => {
    expect(removeDuplicates([2, 2, 2, 2, 2])).toEqual([2]);
  });
});
