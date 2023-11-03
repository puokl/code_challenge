const isPrime = require("./solution");

describe("isPrime", () => {
  test("checks if 2 is prime", () => {
    expect(isPrime(2)).toBe(true);
  });

  test("checks if 3 is prime", () => {
    expect(isPrime(3)).toBe(true);
  });

  test("checks if 4 is not prime", () => {
    expect(isPrime(4)).toBe(false);
  });

  test("checks if 29 is prime", () => {
    expect(isPrime(29)).toBe(true);
  });

  test("checks if 1 is not prime", () => {
    expect(isPrime(1)).toBe(false);
  });

  test("checks if 0 is not prime", () => {
    expect(isPrime(0)).toBe(false);
  });

  test("checks if -3 is not prime", () => {
    expect(isPrime(-3)).toBe(false);
  });
});
