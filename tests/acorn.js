#!/usr/bin/env node

'use strict'

const terser = require('terser')
const { addHook } = require('pirates')
const { execSync } = require('child_process')

process.chdir(process.cwd() + '/acorn')

execSync('npm i --ignore-scripts && npm run pretest')

addHook((code, filename) => {
  filename = filename.replace(process.cwd(), '')
  if (/test/.test(filename)) return code
  const { error, code: outCode } = terser.minify(code, {
    toplevel: true,
    compress: {
      unsafe: true
    }
  })
  if (error) throw error
  return outCode
}, {
  exts: ['.js'],
  ignoreNodeModules: false
})

require(process.cwd() + '/test/run.js')
