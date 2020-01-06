import test from 'ava';

test('The bare build truly is bare', async t => {
  const PBrute = require('../dist/bare');
  const pbrute = new PBrute({
    i18n: {},
    dictionary: []
  });

  const result = pbrute.calculate('barepass');
  t.true(result.time.md5 > 0n);
  t.true(result.optimistic.length === 3);
});

test('The translated build has translations', async t => {
  const PBrute = require('../dist/translations-only');
  const pbrute = new PBrute({
    dictionary: []
  });

  const result = pbrute.calculate('translatedpass');
  t.true(result.time.md5 > 0n);
  t.true(result.optimistic.length > 3);
});

test('The full build has everything', async t => {
  const PBrute = require('../dist/translations-only');
  const pbrute = new PBrute();

  const result = pbrute.calculate('password');
  t.true(result.time.md5 > 0n);
  t.is('instant', result.likely);
});
