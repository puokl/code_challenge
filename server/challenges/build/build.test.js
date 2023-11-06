const build = require("./solution");

describe("build", () => {
  test("builds a pyramid with 1 floor", () => {
    expect(build(1)).toEqual(["*"]);
  });

  test("builds a pyramid with 3 floors", () => {
    expect(build(3)).toEqual(["  *  ", " *** ", "*****"]);
  });

  test("builds a pyramid with 5 floors", () => {
    expect(build(5)).toEqual([
      "    *    ",
      "   ***   ",
      "  *****  ",
      " ******* ",
      "*********",
    ]);
  });

  test("throws RangeError for zero or negative floors", () => {
    expect(() => build(0)).toThrow(RangeError);
    expect(() => build(-5)).toThrow(RangeError);
  });

  test("throws TypeError for null or non-number input", () => {
    expect(() => build(null)).toThrow(TypeError);
    expect(() => build("5")).toThrow(TypeError);
  });
});
