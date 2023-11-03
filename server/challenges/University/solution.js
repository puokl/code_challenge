class University {
  constructor(name) {
    this.name = name;
    this.departments = new Set();
  }

  addDepartment(departmentName) {
    this.departments.add(departmentName);
  }

  removeDepartment(departmentName) {
    this.departments.delete(departmentName);
  }

  getDepartments() {
    return Array.from(this.departments);
  }
}
module.exports = University;