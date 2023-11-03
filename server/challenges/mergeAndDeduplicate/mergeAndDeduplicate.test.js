const mergeAndDeduplicate = require("./solution");

describe("mergeAndDeduplicate", () => {
  test("merges [1, 2, 3] and [3, 4, 5] with no duplicates", () => {
    expect(mergeAndDeduplicate([1, 2, 3], [3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test("merges [1, 2] and [2, 3, 4] with no duplicates", () => {
    expect(mergeAndDeduplicate([1, 2], [2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  test("merges [] and [1, 1, 1] to give [1]", () => {
    expect(mergeAndDeduplicate([], [1, 1, 1])).toEqual([1]);
  });

  test("merges two empty arrays to give an empty array", () => {
    expect(mergeAndDeduplicate([], [])).toEqual([]);
  });

  test("merges two identical arrays with no duplicates", () => {
    expect(mergeAndDeduplicate([1, 2], [1, 2])).toEqual([1, 2]);
  });
});
