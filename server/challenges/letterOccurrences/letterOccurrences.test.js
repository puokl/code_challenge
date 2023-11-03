const letterOccurrences = require("./solution");

describe("Letter Occurrences Counter", () => {
  test("counts occurrences in 'Hello World'", () => {
    expect(letterOccurrences("Hello World")).toEqual({
      h: 1,
      e: 1,
      l: 3,
      o: 2,
      w: 1,
      r: 1,
      d: 1,
    });
  });

  test("counts occurrences in 'Programming is fun!'", () => {
    expect(letterOccurrences("Programming is fun!")).toEqual({
      p: 1,
      r: 2,
      o: 1,
      g: 2,
      a: 1,
      m: 2,
      i: 2,
      n: 2,
      s: 1,
      f: 1,
      u: 1,
    });
  });

  test("returns an empty object for an empty string", () => {
    expect(letterOccurrences("")).toEqual({});
  });

  test("ignores numbers and special characters in 'H3ll0 W0rld!@#'", () => {
    expect(letterOccurrences("H3ll0 W0rld!@#")).toEqual({
      h: 1,
      l: 3,
      w: 1,
      r: 1,
      d: 1,
    });
  });
});
