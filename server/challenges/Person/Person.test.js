const Person = require("./solution");

describe("Person Class", () => {
  test("should create a person with name and age", () => {
    const person = new Person("John Doe", 28);
    expect(person.name).toBe("John Doe");
    expect(person.age).toBe(28);
  });

  test("should display correct info", () => {
    console.log = jest.fn(); // Mock console.log
    const person = new Person("Jane Doe", 32);
    person.displayInfo();
    expect(console.log).toHaveBeenCalledWith("Name: Jane Doe, Age: 32");
  });
});
