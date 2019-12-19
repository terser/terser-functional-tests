#!/usr/bin/env node

'use strict'

const { execSync } = require('child_process')
const glob = require('glob').sync
const Mocha = require('mocha')

process.chdir(process.cwd() + '/eslint-unit')

execSync('npm i')

require('@terser/require-terser')({
  //toplevel: true
})

const mocha = new Mocha({
  timeout: 20000,
  reporter: 'min'
})

glob('tests/lib/rules/*.js').forEach(file => {
  mocha.addFile(file)
})

mocha.run((failures) => {
  if (failures) process.exit(failures)
})
