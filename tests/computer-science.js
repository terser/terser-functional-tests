#!/usr/bin/env node

const assert = require('assert');
const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');
const { minify } = require('terser');

process.chdir(process.cwd() + '/computer-science');
execSync('npm i');

const code = readFileSync('../computer-science/index.js').toString();
const minified = minify(code);
assert(!minified.error)
writeFileSync('../computer-science/index.min.js', minified.code)

execSync('npm t', { stdio: ['pipe', process.stdout, process.stderr] });
