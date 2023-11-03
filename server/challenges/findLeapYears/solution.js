function findLeapYears(startYear, endYear) {
  const leapYears = [];
  for (let year = startYear; year <= endYear; year++) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      leapYears.push(year);
    }
  }
  return leapYears;
}
module.exports = findLeapYears;