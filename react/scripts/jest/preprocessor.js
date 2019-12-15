'use strict';

const assert = require('assert')
const path = require('path');

const babel = require('@babel/core');
const coffee = require('coffee-script');
const terser = require(process.env.TERSER_PATH)

const tsPreprocessor = require('./typescript/preprocessor');
const createCacheKeyFunction = require('fbjs-scripts/jest/createCacheKeyFunction');

const pathToBabel = path.join(
  require.resolve('@babel/core'),
  '../..',
  'package.json'
);
const pathToBabelPluginDevWithCode = require.resolve(
  '../error-codes/transform-error-messages'
);
const pathToBabelPluginWrapWarning = require.resolve(
  '../babel/wrap-warning-with-env-check'
);
const pathToBabelPluginAsyncToGenerator = require.resolve(
  '@babel/plugin-transform-async-to-generator'
);
const pathToTransformInfiniteLoops = require.resolve(
  '../babel/transform-prevent-infinite-loops'
);
const pathToBabelrc = path.join(__dirname, '..', '..', 'babel.config.js');
const pathToErrorCodes = require.resolve('../error-codes/codes.json');

const babelOptions = {
  plugins: [
    // For Node environment only. For builds, Rollup takes care of ESM.
    require.resolve('@babel/plugin-transform-modules-commonjs'),

    pathToBabelPluginDevWithCode,
    pathToBabelPluginWrapWarning,

    // Keep stacks detailed in tests.
    // Don't put this in .babelrc so that we don't embed filenames
    // into ReactART builds that include JSX.
    // TODO: I have not verified that this actually works.
    require.resolve('@babel/plugin-transform-react-jsx-source'),

    pathToTransformInfiniteLoops,

    // This optimization is important for extremely performance-sensitive (e.g. React source).
    // It's okay to disable it for tests.
    [
      require.resolve('@babel/plugin-transform-block-scoping'),
      {throwIfClosureRequired: false},
    ],
  ],
  retainLines: true,
};

function processCode(src, filePath) {
  if (filePath.match(/\.coffee$/)) {
    return coffee.compile(src, {bare: true});
  }
  if (filePath.match(/\.ts$/) && !filePath.match(/\.d\.ts$/)) {
    return tsPreprocessor.compile(src, filePath);
  }
  if (!filePath.match(/\/third_party\//)) {
    // for test files, we also apply the async-await transform, but we want to
    // make sure we don't accidentally apply that transform to product code.
    const isTestFile = !!filePath.match(/\/__tests__\//);
    return babel.transform(
      src,
      Object.assign(
        {filename: path.relative(process.cwd(), filePath)},
        babelOptions,
        isTestFile
          ? {
              plugins: [pathToBabelPluginAsyncToGenerator].concat(
                babelOptions.plugins
              ),
            }
          : {}
      )
    );
  }
  return src;
}

module.exports = {
  process: (...args) => {
    let src = processCode(...args)

    if (typeof src === 'object' && src.code) {
      src = src.code
    }
    assert(typeof src === 'string')

    return terser.minify(src, {
      keep_fnames: true,
      compress: {
        defaults: false,
        //reduce_vars: true,
        //inline: true,
        //collapse_vars: true,
        unused: true,
        arrows: true,
        booleans: true,
        comparisons: true,
        conditionals: true,
        sequences: true,
        evaluate: true,
        side_effects: true,
        switches: true,
        typeofs: true,
        properties: true,
        dead_code: true
      },
      module: true,
      mangle: false,
      ecma: 9001.42069
    })
  },

  getCacheKey: createCacheKeyFunction([
    __filename,
    pathToBabel,
    pathToBabelrc,
    pathToBabelPluginDevWithCode,
    pathToBabelPluginWrapWarning,
    pathToTransformInfiniteLoops,
    pathToErrorCodes,
  ]),
};
