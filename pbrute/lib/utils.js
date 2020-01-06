// Divide two BigInts without rounding
function integerDivision(a, b) {
  return (((a * 10n) / b) - 5n) / 10n;
}

module.exports = {
  integerDivision
};
