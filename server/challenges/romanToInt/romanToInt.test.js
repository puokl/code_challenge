const romanToInt = require("./solution");

describe("Roman Numeral to Integer Converter", () => {
  test("converts 'III' to 3", () => {
    expect(romanToInt("III")).toBe(3);
  });

  test("converts 'IV' to 4", () => {
    expect(romanToInt("IV")).toBe(4);
  });

  test("converts 'IX' to 9", () => {
    expect(romanToInt("IX")).toBe(9);
  });

  test("converts 'LVIII' to 58", () => {
    expect(romanToInt("LVIII")).toBe(58);
  });

  test("converts 'MCMXCIV' to 1994", () => {
    expect(romanToInt("MCMXCIV")).toBe(1994);
  });
});
