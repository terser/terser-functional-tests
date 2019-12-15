#!/usr/bin/env node

if (!process.env.GENERATE_SNAPSHOTS) {
  require('@terser/require-terser')({ toplevel: true })
}
const assert = require('assert')
const fs = require('fs')
const glob = require('glob').sync
const hash = require('murmurhash').v3
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

const lintOutput = cli.executeOnFiles(['eslint/code-body'])

const cwd = process.cwd()
for (const result of lintOutput.results) {
  result.filePath = result.filePath.replace(cwd, '')
}

if (process.env.GENERATE_SNAPSHOTS) {
  fs.writeFileSync('eslint/snapshot.json', JSON.stringify(lintOutput, null, 2))
} else {
  const snapshot = JSON.parse(fs.readFileSync('eslint/snapshot.json', 'utf-8'))
  assert.deepEqual(snapshot, lintOutput)
}
