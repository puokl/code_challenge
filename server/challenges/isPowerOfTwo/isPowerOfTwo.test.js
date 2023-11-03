const isPowerOfTwo = require("./solution");

describe("Power of Two Checker", () => {
  test("returns true for 1", () => {
    expect(isPowerOfTwo(1)).toBe(true);
  });

  test("returns true for 2", () => {
    expect(isPowerOfTwo(2)).toBe(true);
  });

  test("returns true for 16", () => {
    expect(isPowerOfTwo(16)).toBe(true);
  });

  test("returns false for 18", () => {
    expect(isPowerOfTwo(18)).toBe(false);
  });

  test("returns true for 64", () => {
    expect(isPowerOfTwo(64)).toBe(true);
  });

  test("returns false for 100", () => {
    expect(isPowerOfTwo(100)).toBe(false);
  });
});
