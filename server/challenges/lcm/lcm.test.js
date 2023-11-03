const lcm = require("./solution");

describe("Least Common Multiple", () => {
  test("finds the LCM of 12 and 15", () => {
    expect(lcm(12, 15)).toBe(60);
  });

  test("finds the LCM of 5 and 10", () => {
    expect(lcm(5, 10)).toBe(10);
  });

  test("finds the LCM of 7 and 3", () => {
    expect(lcm(7, 3)).toBe(21);
  });

  test("finds the LCM when one number is 0", () => {
    expect(lcm(0, 5)).toBe(0);
  });
});
