function isWeekend(date) {
  // Write your code here
  
  if (!(date instanceof Date)) {
    throw new Error("Input is not a Date object");
  }

  const dayOfWeek = date.getDay();

}

module.exports = isWeekend;