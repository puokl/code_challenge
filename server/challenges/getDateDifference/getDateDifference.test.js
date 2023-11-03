const getDateDifference = require("./solution");

describe("getDateDifference", () => {
  test("calculates the difference in days between 2023-04-01 and 2023-04-02", () => {
    expect(getDateDifference("2023-04-01", "2023-04-02")).toBe(1);
  });

  test("calculates the difference in days between 2023-01-01 and 2023-12-31", () => {
    expect(getDateDifference("2023-01-01", "2023-12-31")).toBe(364);
  });

  test("calculates the difference in days regardless of the order of dates", () => {
    expect(getDateDifference("2023-12-31", "2023-01-01")).toBe(364);
  });

  test("calculates the difference in days for dates in different years", () => {
    expect(getDateDifference("2022-12-31", "2023-12-31")).toBe(365);
  });

  test("calculates the difference in days over a leap year", () => {
    expect(getDateDifference("2023-12-31", "2024-12-31")).toBe(366);
  });
});
