const calculateSphereVolume = require("./solution");

describe("calculateSphereVolume", () => {
  test("calculates the volume of a sphere with radius 3", () => {
    expect(calculateSphereVolume(3)).toBeCloseTo(113.1, 1);
  });

  test("calculates the volume of a sphere with radius 7", () => {
    expect(calculateSphereVolume(7)).toBeCloseTo(1436.76, 2);
  });

  test("calculates the volume of a sphere with radius 1", () => {
    expect(calculateSphereVolume(1)).toBeCloseTo(4.19, 2);
  });

  test("calculates the volume of a sphere with radius 100", () => {
    expect(calculateSphereVolume(100)).toBeCloseTo(4188790.204, 0);
  });
});
