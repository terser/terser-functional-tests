import test from 'ava';

const i18n = require('../lib/i18n.json');

test('all translations exists in every language', t => {
  const languages = Object.keys(i18n);
  const keycounts = languages.reduce((counts, language) => {
    for (const key of Object.keys(i18n[language]))
      counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});

  const maxUses = Object.values(keycounts).reduce((max, count) => Math.max(max, count), 0);

  for (const key of Object.keys(keycounts))
    t.is(maxUses, keycounts[key], `key "${key}" is translated in all languages`);
});
