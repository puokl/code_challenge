const firstNonRepeatedCharacter = require("./solution");

describe("First Non-Repeated Character Finder", () => {
  test("finds the first non-repeated character in 'abac'", () => {
    expect(firstNonRepeatedCharacter("abac")).toBe("b");
  });

  test("finds the first non-repeated character in 'apple'", () => {
    expect(firstNonRepeatedCharacter("apple")).toBe("a");
  });

  test("finds the first non-repeated character in 'abc'", () => {
    expect(firstNonRepeatedCharacter("abc")).toBe("a");
  });

  test("returns null if there is no non-repeated character in 'aabb'", () => {
    expect(firstNonRepeatedCharacter("aabb")).toBeNull();
  });
});
