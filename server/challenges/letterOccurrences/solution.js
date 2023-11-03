function letterOccurrences(str) {
  const occurrences = {};
  for (const char of str.replace(/[^a-zA-Z]/g, '')) {
    const lowerChar = char.toLowerCase();
    occurrences[lowerChar] = (occurrences[lowerChar] || 0) + 1;
  }
  return occurrences;
}
module.exports = letterOccurrences;