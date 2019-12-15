#!/usr/bin/env node

'use strict'

require('@terser/require-terser')({
  toplevel: true
})

const { execSync } = require('child_process')
const glob = require('glob').sync
const Mocha = require('mocha')

process.chdir(process.cwd() + '/eslint-unit')

execSync('npm i')

const mocha = new Mocha({
  timeout: 20000,
  reporter: 'min'
})

glob('tests/{bin,lib,tools}/**/*.js').forEach(file => {
  mocha.addFile(file)
})

mocha.run((failures) => {
  if (failures) process.exit(failures)
})
