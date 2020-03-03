"use strict";

var _tape = _interopRequireDefault(require("tape"));

var _indexMin = require("../index.min.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _tape["default"])('QuickSort(array) - should sort the array', function (t) {
  var data = ['CC', 'BB', 'BB', 'BB', 'BB', 'CC', 'AA', 'BB'];
  var expected = ['AA', 'BB', 'BB', 'BB', 'BB', 'BB', 'CC', 'CC'];
  var result = (0, _indexMin.QuickSort)(data);
  t.deepEqual(expected, result, 'Output should be sorted');
  t.end();
});
(0, _tape["default"])('QuickSort(array) - should sort the array', function (t) {
  var data = [5, 3, 88, 1, 23, 5, 0, -4];
  var expected = [-4, 0, 1, 3, 5, 5, 23, 88];
  var result = (0, _indexMin.QuickSort)(data);
  t.deepEqual(expected, result, 'Output should be sorted');
  t.end();
});
(0, _tape["default"])('QuickSort(array, comparator) - should sort the array using a custom comparator', function (t) {
  var data = ['CC', 'BB', 'BB', 'BB', 'CC', 'AA', 'BB'];
  var expected = ['CC', 'CC', 'BB', 'BB', 'BB', 'BB', 'AA'];

  var descending = function descending(a, b) {
    return a > b;
  };

  var result = (0, _indexMin.QuickSort)(data, descending);
  t.deepEqual(expected, result, 'Output should be sorted');
  t.end();
});