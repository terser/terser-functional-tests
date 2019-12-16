#!/usr/bin/env node

if (!process.env.GENERATE_SNAPSHOTS) {
  require('@terser/require-terser')({ toplevel: true })
}
const assert = require('assert')
const fs = require('fs')
const glob = require('glob').sync
const hash = require('murmurhash').v3
const diff = require('variable-diff')
const { CLIEngine } = require('eslint')

const cli = new CLIEngine({
  fix: true,
  fixTypes: ["problem", "suggestion", "layout"],
  useEslintrc: false,
  baseConfig: {
    extends: [
      "eslint-config-standard",
      "eslint-config-strict",
    ]
  }
})

console.log('executing eslint...')
let lintOutput = cli.executeOnFiles(['eslint/code-body'])

console.log('cleaning results...')
console.time('clean')
const prefix = process.cwd() + '/eslint/code-body'
;(function clean(obj) {
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(prefix, '')
    } else if (typeof obj[key] === 'object' && obj[key]) {
      clean(obj[key])
    }
  }
})(lintOutput)
console.timeEnd('clean')

if (process.env.GENERATE_SNAPSHOTS) {
  fs.writeFileSync('eslint/snapshot.json', JSON.stringify(lintOutput, null, 2))
} else {
  const snapshot = JSON.parse(fs.readFileSync('eslint/snapshot.json', 'utf-8'))
  const difference = diff(snapshot, lintOutput)
  if (difference.changed) {
    console.log(difference.text)
    process.exit(1)
  }
}
