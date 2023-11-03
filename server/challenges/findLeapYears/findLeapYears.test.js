const findLeapYears = require("./solution");

describe("findLeapYears", () => {
  test("finds leap years between 2000 and 2020", () => {
    expect(findLeapYears(2000, 2020)).toEqual([
      2000, 2004, 2008, 2012, 2016, 2020,
    ]);
  });

  test("finds leap years between 1980 and 1990", () => {
    expect(findLeapYears(1980, 1990)).toEqual([1980, 1984, 1988]);
  });

  test("finds leap years between 1900 and 1920", () => {
    expect(findLeapYears(1900, 1920)).toEqual([1904, 1908, 1912, 1916, 1920]);
  });

  test("finds leap years between 1800 and 1830", () => {
    expect(findLeapYears(1800, 1830)).toEqual([
      1804, 1808, 1812, 1816, 1820, 1824, 1828,
    ]);
  });

  test("returns an empty array for a range without leap years", () => {
    expect(findLeapYears(1700, 1703)).toEqual([]);
  });
});
