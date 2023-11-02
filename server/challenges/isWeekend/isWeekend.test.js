const isWeekend = require("./solution");

describe("Is Weekend Challenge", () => {
  test("July 4, 2020 is a Saturday, true", () => {
    expect(isWeekend(new Date("2020-07-04"))).toBe(true);
  });

  test("March 15, 2017 is a Wednesday, false", () => {
    expect(isWeekend(new Date("2017-03-15"))).toBe(false);
  });

  test("September 25, 2016 is a Sunday, true", () => {
    expect(isWeekend(new Date("2016-09-25"))).toBe(true);
  });

  test("December 1, 2021 is a Wednesday, false", () => {
    expect(isWeekend(new Date("2021-12-01"))).toBe(false);
  });

  test("February 14, 2015 is a Saturday, true", () => {
    expect(isWeekend(new Date("2015-02-14"))).toBe(true);
  });

  test("June 21, 2022 is a Tuesday, false", () => {
    expect(isWeekend(new Date("2022-06-21"))).toBe(false);
  });
});
