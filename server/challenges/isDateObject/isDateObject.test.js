const isDateObject = require("./solution");

describe("isDateObject", () => {
  test("should return false for a string", () => {
    expect(isDateObject("October 13, 2014 11:13:00")).toBe(false);
  });

  test("should return true for a new Date object", () => {
    expect(isDateObject(new Date())).toBe(true);
  });

  test("should return true for a specific Date object", () => {
    expect(isDateObject(new Date(1999, 4, 24, 11, 33, 30, 0))).toBe(true);
  });

  test("should return false for an array", () => {
    expect(isDateObject([1, 2, 3, 4])).toBe(false);
  });

  test("should return false for a number", () => {
    expect(isDateObject(86400000)).toBe(false);
  });

  test("should return false for an object", () => {
    expect(isDateObject({ year: 2021, month: "January", day: 1 })).toBe(false);
  });
});
