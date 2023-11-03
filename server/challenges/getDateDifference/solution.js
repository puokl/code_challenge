function getDateDifference(date1, date2) {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const differenceMs = Math.abs(new Date(date2) - new Date(date1));
  return Math.round(differenceMs / ONE_DAY);
}
module.exports = getDateDifference;