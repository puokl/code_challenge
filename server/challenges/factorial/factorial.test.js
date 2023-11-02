const factorial = require("./solution");

describe("Factorial Challenge", () => {
  test("calculates factorial of 0", () => {
    expect(factorial(0)).toBe(1);
  });

  test("calculates factorial of 1", () => {
    expect(factorial(1)).toBe(1);
  });

  test("calculates factorial of 5", () => {
    expect(factorial(5)).toBe(120);
  });

  test("calculates factorial of 10", () => {
    expect(factorial(10)).toBe(3628800);
  });
});
