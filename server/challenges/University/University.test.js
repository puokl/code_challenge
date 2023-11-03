const University = require("./solution");
// const { expect } = require("@jest/globals");

describe("University Class Tests", () => {
  const university = new University("My University");

  test("Should add a department", () => {
    university.addDepartment("Computer Science");
    expect(university.getDepartments()).toContain("Computer Science");
  });

  test("Should remove a department", () => {
    university.addDepartment("Mathematics");
    university.removeDepartment("Computer Science");
    expect(university.getDepartments()).not.toContain("Computer Science");
    expect(university.getDepartments()).toContain("Mathematics");
  });

  test("Should display all departments", () => {
    const departments = university.getDepartments();
    expect(departments).toEqual(["Mathematics"]);
  });

  test("Should not add duplicate departments", () => {
    university.addDepartment("Mathematics");
    const departments = university.getDepartments();
    expect(departments).toEqual(["Mathematics"]);
  });

  test("Should handle removing non-existing departments", () => {
    university.removeDepartment("Physics");
    const departments = university.getDepartments();
    expect(departments).toEqual(["Mathematics"]);
  });

  test("Should handle empty university correctly", () => {
    const emptyUniversity = new University("Empty University");
    expect(emptyUniversity.getDepartments()).toEqual([]);
  });
});
