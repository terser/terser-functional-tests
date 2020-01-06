import test from 'ava';

const PBrute = require('../lib');

test('can calculate character set for lowercase password', t => {
  const pbrute = new PBrute();

  const password = 'password';
  const result = pbrute.calculateCharacterSet(password);

  t.is(26, result[0].count);
});

test('can calculate character set for uppercase password', t => {
  const pbrute = new PBrute();

  const password = 'PASSWORD';
  const result = pbrute.calculateCharacterSet(password);

  t.is(26, result[0].count);
});

test('can calculate character set for lower and uppercase password', t => {
  const pbrute = new PBrute();

  const password = 'passWORD';
  const result = pbrute.calculateCharacterSet(password);

  t.is(52, result[0].count + result[1].count);
});

test('can calculate character set for common special characters', t => {
  const pbrute = new PBrute();

  const password = '!?';
  const result = pbrute.calculateCharacterSet(password);

  t.is(33, result[0].count);
});

test('can calculate character set for common accented characters', t => {
  const pbrute = new PBrute();

  const password = 'åäö';
  const result = pbrute.calculateCharacterSet(password);

  t.is(57, result[0].count);
});

test('can calculate combined character set', t => {
  const pbrute = new PBrute();

  const password = 'p4$$WÖRD!';
  const result = pbrute.calculateCharacterSet(password);

  t.is(152, result.reduce((sum, x) => sum + x.count, 0));
});

test('can calculate character set combinations', t => {
  const pbrute = new PBrute();

  const password = 'password';
  const result = pbrute.calculateCombinations(password);

  t.is(BigInt(26) ** BigInt(8), result);
});

test('can reduce time', t => {
  const pbrute = new PBrute();

  const years = 987656776618n;
  const months = 11n;
  const weeks = 3n;
  const days = 6n;
  const hours = 23n;
  const minutes = 59n;
  const seconds = 59n;
  const milliseconds = 999n;

  const result = pbrute.reduceTime(
    years * BigInt(1000 * 60 * 60 * 24 * 365) +
    months * BigInt(1000 * 60 * 60 * 24 * 31) +
    weeks * BigInt(1000 * 60 * 60 * 24 * 7) +
    days * BigInt(1000 * 60 * 60 * 24) +
    hours * BigInt(1000 * 60 * 60) +
    minutes * BigInt(1000 * 60) +
    seconds * BigInt(1000) +
    milliseconds
  );

  t.is('object', typeof(result));
  t.is(years, result.years);
  t.is(months, result.months);
  t.is(weeks, result.weeks);
  t.is(days, result.days);
  t.is(hours, result.hours);
  t.is(minutes, result.minutes);
  t.is(seconds, result.seconds);
  t.is(milliseconds, result.milliseconds);
});

test('can compute hash time', t => {
  const pbrute = new PBrute();

  const result = pbrute.calculateTimeToHash(BigInt('45678909875435678765434123'));

  t.is('object', typeof(result));
  for (let key of Object.keys(result))
    t.is('bigint', typeof(result[key]));
});

test('can round time', t => {
  const pbrute = new PBrute();

  const time = {
    years: 0n,
    months: 11n,
    weeks: 3n,
    days: 4n,
    hours: 12n,
    minutes: 30n,
    seconds: 30n,
    milliseconds: 500n
  };

  const result = pbrute.roundTime(time);

  t.is(1n, result.years);
  t.is(0n, result.months);
  t.is(0n, result.weeks);
  t.is(0n, result.days);
  t.is(0n, result.hours);
  t.is(0n, result.minutes);
  t.is(0n, result.seconds);
  t.is(0n, result.milliseconds);
});

test('can simplify time', t => {
  const pbrute = new PBrute();

  const result = pbrute.simplifyTime({
    years: 987654567898765456n
  });

  t.is('987 quadrillion years', result);
});

test('can calculate weak password strength', t => {
  const pbrute = new PBrute();

  const password = 'password'
  const result = pbrute.calculate(password);

  t.is('3 seconds', result.optimistic);
  t.is('instant', result.likely);
  t.is('instant', result.pessimistic);
});
