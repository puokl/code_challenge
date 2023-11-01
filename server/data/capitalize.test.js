const capitalize = require("../submission");

test("capitalizes a simple word", () => {
  expect(capitalize("javascript")).toBe("Javascript");
});

test("capitalizes the first letter of each word", () => {
  expect(capitalize("hello world")).toBe("Hello World");
});

test("works with multiple words", () => {
  expect(capitalize("coding challenge")).toBe("Coding Challenge");
});

test("handles empty strings", () => {
  expect(capitalize("")).toBe("");
});
