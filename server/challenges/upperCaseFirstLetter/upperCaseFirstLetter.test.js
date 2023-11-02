const upperCaseFirstLetter = require("./solution");

test("capitalizes a simple word", () => {
  expect(upperCaseFirstLetter("javascript")).toBe("Javascript");
});

test("capitalizes the first letter of each word", () => {
  expect(upperCaseFirstLetter("hello world")).toBe("Hello World");
});

test("works with multiple words", () => {
  expect(upperCaseFirstLetter("coding challenge")).toBe("Coding Challenge");
});

test("handles empty strings", () => {
  expect(upperCaseFirstLetter("")).toBe("");
});
