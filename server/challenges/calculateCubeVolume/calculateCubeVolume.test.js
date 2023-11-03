const calculateCubeVolume = require("./solution");

describe("Cube Volume Calculator", () => {
  test("calculates the volume of a cube with side length 3", () => {
    expect(calculateCubeVolume(3)).toBe(27);
  });

  test("calculates the volume of a cube with side length 5", () => {
    expect(calculateCubeVolume(5)).toBe(125);
  });

  test("calculates the volume of a cube with a non-integer side length (2.5)", () => {
    expect(calculateCubeVolume(2.5)).toBeCloseTo(15.625);
  });

  test("calculates the volume of a cube with a non-integer side length (4.1)", () => {
    expect(calculateCubeVolume(4.1)).toBeCloseTo(68.921);
  });
});
