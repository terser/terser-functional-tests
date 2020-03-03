"use strict";

var _tape = _interopRequireDefault(require("tape"));

var _indexMin = require("../index.min.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _tape["default"])('BubbleSort() - should sort the array', function (t) {
  var data = ['CC', 'BB', 'BB', 'BB', 'BB', 'CC', 'AA', 'BB'];
  var expected = ['AA', 'BB', 'BB', 'BB', 'BB', 'BB', 'CC', 'CC'];
  var result = (0, _indexMin.BubbleSort)(data);
  t.deepEqual(expected, result, 'Output should be sorted');
  t.end();
});
(0, _tape["default"])('BubbleSort(array) - should sort the array using a custom comparator', function (t) {
  var data = ['CC', 'BB', 'BB', 'BB', 'BB', 'CC', 'AA', 'BB'];
  var expected = ['CC', 'CC', 'BB', 'BB', 'BB', 'BB', 'BB', 'AA'];

  var descending = function descending(a, b) {
    return a > b;
  };

  var result = (0, _indexMin.BubbleSort)(data, descending);
  t.deepEqual(expected, result, 'Output should be sorted');
  t.end();
});