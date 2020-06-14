#!/usr/bin/env node

const assert = require('assert');
const { readFileSync, writeFileSync, readdirSync } = require('fs');
const { execSync } = require('child_process');
const { minify } = require(process.env.TERSER_PATH || 'terser');

async function main() {
  process.chdir(process.cwd() + '/computer-science');
  execSync('npm i');

  const code = readFileSync('../computer-science/index.js').toString();
  const minified = await minify(code);
  if (minified.error) {
    throw minified.error
  }
  writeFileSync('../computer-science/index.min.js', minified.code)

  const run = command => execSync(command, { stdio: ['pipe', process.stdout, process.stderr] });

  for (const file of readdirSync('tests')) {
    run('node tests/' + file)
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
