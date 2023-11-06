function build(n) {
  if (n === null || typeof n !== 'number') throw new TypeError('Invalid input: Input must be a number');
  if (n <= 0) throw new RangeError('Invalid input: Number of floors must be positive');
  const pyramid = [];
  for (let i = 0; i < n; i++) {
    pyramid.push(' '.repeat(n - i - 1) + '*'.repeat(2 * i + 1) + ' '.repeat(n - i - 1));
  }
  return pyramid;
}
module.exports = build;