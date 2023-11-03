function calculateSphereVolume(radius) {
  return +(Math.PI * (4/3) * Math.pow(radius, 3)).toFixed(2);
}
module.exports = calculateSphereVolume;