"use strict";

var _tape = _interopRequireDefault(require("tape"));

var _indexMin = require("../index.min.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(0, _tape["default"])('new QuickFind() - should create an empty set', function (t) {
  var qf = new _indexMin.QuickFind();
  var expected = new Map();
  t.notEqual(qf, null, 'QuickFind should exist');
  t.deepEqual(qf.verticies, expected, 'QuickFind.verticies should initialize to an empty array');
  t.equal(qf.count, 0, 'QuickFind.count should be 0');
  t.end();
});
(0, _tape["default"])('new QuickFind() - should create a set with verticies', function (t) {
  var qf = new _indexMin.QuickFind(['a', 'b', 'c', 'd']);
  var expected = new Map([['a', 0], ['b', 1], ['c', 2], ['d', 3]]);
  t.notEqual(qf, null, 'QuickFind should exist');
  t.deepEqual(qf.verticies, expected, 'QuickFind.verticies should initialize w/ 4 verticies');
  t.equal(qf.count, 4, 'QuickFind.count should be 4');
  t.end();
});
(0, _tape["default"])('new QuickFind(items) - should create a set populated with items', function (t) {
  var qf = new _indexMin.QuickFind(['a', 'b', 'c', 'd']);
  var expected = new Map([['a', 0], ['b', 1], ['c', 2], ['d', 3]]);
  t.notEqual(qf, null, 'QuickFind should exist');
  t.deepEqual(qf.verticies, expected, 'QuickFind.verticies should initialize w/ 4 verticies');
  t.equal(qf.count, 4, 'QuickFind.count should be 4');
  t.end();
});
(0, _tape["default"])('QuickFind.find(item) - should return the id of the item', function (t) {
  var qf = new _indexMin.QuickFind(['a', 'b', 'c', 'd']);
  var expected = 1;
  var result = qf.find('b');
  t.deepEqual(result, expected, 'QuickFind.find should return the correct id');
  t.end();
});
(0, _tape["default"])('QuickFind.find(item) - should throw if the item is not in the set', function (t) {
  t.plan(1);
  var qf = new _indexMin.QuickFind(['a', 'b', 'c', 'd']);

  try {
    qf.find('x');
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('QuickFind.connected(itemA, itemB) - should return false if the verticies are not connected', function (t) {
  var qf = new _indexMin.QuickFind(['a', 'b', 'c', 'd']);
  var result = qf.connected('a', 'b');
  t.deepEqual(result, false, 'QuickFind.connected should return false');
  t.end();
});
(0, _tape["default"])('QuickFind.connected(itemA, itemB) - should return true if the verticies are connected', function (t) {
  var qf = new _indexMin.QuickFind(['a', 'b', 'c', 'd']);
  qf.verticies.set('c', 1);
  var result = qf.connected('b', 'c');
  t.deepEqual(result, true, 'QuickFind.connected should return true');
  t.end();
});
(0, _tape["default"])('QuickFind.connected(itemA, itemB) - should return true if the verticies are connected', function (t) {
  var qf = new _indexMin.QuickFind([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  qf.union(4, 3);
  qf.union(3, 8);
  qf.union(6, 5);
  qf.union(9, 4);
  qf.union(2, 1);
  qf.union(5, 0);
  qf.union(7, 2);
  qf.union(6, 1);
  var expected = [1, 1, 1, 8, 8, 1, 1, 1, 8, 8];

  var result = _toConsumableArray(qf.verticies.values());

  t.deepEqual(result, expected, 'QuickFind.verticies should have the correct data');
  t.equal(qf.count, 2, 'QuickFind.count should be 2');
  t.end();
});
(0, _tape["default"])('QuickFind.sets() - Returns a 2D array containing the sets of joined verticies', function (t) {
  var qf = new _indexMin.QuickFind([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  qf.union(4, 3);
  qf.union(3, 8);
  qf.union(6, 5);
  qf.union(9, 4);
  qf.union(2, 1);
  var expected = [[0], [1, 2], [5, 6], [7], [3, 4, 8, 9]];
  var result = qf.sets();
  t.deepEqual(result, expected, 'Outputs the correct sets');
  t.end();
});
