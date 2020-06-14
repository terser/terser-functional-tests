#!/usr/bin/env node

'use strict'

const compileSync = require('@terser/require-terser/compile-sync')
const { addHook } = require('pirates')
const { execSync } = require('child_process')

process.chdir(process.cwd() + '/acorn')

execSync('npm i --ignore-scripts && npm run pretest')

addHook((code, filename) => {
  filename = filename.replace(process.cwd(), '')
  if (/test/.test(filename)) {
    // acorn probably tests with raw javascript functions that are supposed to reflect the output and are checked with .toString(), so no minifying here.
    return code
  }
  return compileSync(code, {
    toplevel: true,
    compress: {
      unsafe: true
    }
  })
  return outCode
}, {
  exts: ['.js'],
  ignoreNodeModules: false
})

require(process.cwd() + '/test/run.js')
