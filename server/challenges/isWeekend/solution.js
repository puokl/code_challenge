function isWeekend(date) {
  if (!(date instanceof Date)) {
    throw new Error("Input is not a Date object");
  }

  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}
module.exports = isWeekend;