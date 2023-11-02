const alphabeticalOrder = require("./solution");

describe("Alphabetical Order Challenge", () => {
  test("sorts a simple word", () => {
    expect(alphabeticalOrder("webmaster")).toBe("abeemrstw");
  });

  test("sorts letters of a word with mixed case", () => {
    expect(alphabeticalOrder("JavaScript")).toBe("JSaaciprtv");
  });

  test("sorts letters and ignores spaces", () => {
    expect(alphabeticalOrder("hello world")).toBe(" dehllloorw");
  });

  test("sorts letters and special characters", () => {
    expect(alphabeticalOrder("hello! world?")).toBe(" !?dehllloorw");
  });

  test("returns an empty string for an empty input", () => {
    expect(alphabeticalOrder("")).toBe("");
  });
});
