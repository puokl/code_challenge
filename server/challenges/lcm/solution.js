function gcd(a, b) {
  if (!b) return a;
  return gcd(b, a % b);
}

function lcm(a, b) {
  return (a === 0 || b === 0) ? 0 : Math.abs(a * b) / gcd(a, b);
}
module.exports = lcm;