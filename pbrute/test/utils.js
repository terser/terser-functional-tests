import test from 'ava';

const {
  integerDivision
} = require('../lib/utils');

test('can divide BigInts', t => {
  const a = 12n;
  const b = 7n;

  const result = integerDivision(a, b);

  t.is(1n, result);
});
