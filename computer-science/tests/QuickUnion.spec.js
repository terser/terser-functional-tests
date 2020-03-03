"use strict";

var _tape = _interopRequireDefault(require("tape"));

var _indexMin = require("../index.min.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(0, _tape["default"])('new QuickUnion() - should create an empty set', function (t) {
  var qu = new _indexMin.QuickUnion();
  var expected = new Map();
  t.notEqual(qu, null, 'QuickUnion should exist');
  t.deepEqual(qu.verticies, expected, 'QuickUnion.verticies should initialize to an empty array');
  t.equal(qu.count, 0, 'QuickUnion.count should be 0');
  t.end();
});
(0, _tape["default"])('new QuickUnion() - should create a set with verticies', function (t) {
  var qu = new _indexMin.QuickUnion(['a', 'b', 'c', 'd']);
  var expected = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4]]);
  t.notEqual(qu, null, 'QuickUnion should exist');
  t.deepEqual(qu.verticies, expected, 'QuickUnion.verticies should initialize w/ 4 verticies');
  t.equal(qu.count, 4, 'QuickUnion.count should be 4');
  t.end();
});
(0, _tape["default"])('new QuickUnion(items) - should create a set populated with items', function (t) {
  var qu = new _indexMin.QuickUnion(['a', 'b', 'c', 'd']);
  var expected = new Map([['a', 0], ['b', 1], ['c', 2], ['d', 3]]);
  t.notEqual(qu, null, 'QuickUnion should exist');
  t.deepEqual(qu.verticies, expected, 'QuickUnion.verticies should initialize w/ 4 verticies');
  t.equal(qu.count, 4, 'QuickUnion.count should be 4');
  t.end();
});
(0, _tape["default"])('QuickUnion.find(item) - should return the id of the item', function (t) {
  var qu = new _indexMin.QuickUnion(['a', 'b', 'c', 'd']);
  var expected = 'b';
  var result = qu.find('b');
  t.deepEqual(result, expected, 'QuickUnion.find should return the correct id');
  t.end();
});
(0, _tape["default"])('QuickUnion.find(item) - should throw if the item is not in the set', function (t) {
  t.plan(1);
  var qu = new _indexMin.QuickUnion(['a', 'b', 'c', 'd']);

  try {
    qu.find('x');
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('QuickUnion.connected(itemA, itemB) - should return false if the verticies are not connected', function (t) {
  var qu = new _indexMin.QuickUnion(['a', 'b', 'c', 'd']);
  var result = qu.connected('a', 'b');
  t.deepEqual(result, false, 'QuickFind.connected should return false');
  t.end();
});
(0, _tape["default"])('QuickUnion.connected(itemA, itemB) - should return true if the verticies are connected', function (t) {
  var qu = new _indexMin.QuickUnion(['a', 'b', 'c', 'd']);
  qu.verticies.set('c', 'b');
  var result = qu.connected('b', 'c');
  t.deepEqual(result, true, 'QuickUnion.connected should return true');
  t.end();
});
(0, _tape["default"])('QuickUnion.connected(itemA, itemB) - should return true if the verticies are connected', function (t) {
  var qu = new _indexMin.QuickUnion([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  qu.union(4, 3);
  qu.union(3, 8);
  qu.union(6, 5);
  qu.union(9, 4);
  qu.union(2, 1);
  qu.union(5, 0);
  qu.union(7, 2);
  qu.union(6, 1);
  var expected = [1, 1, 1, 8, 3, 0, 5, 1, 8, 8];

  var result = _toConsumableArray(qu.verticies.values());

  t.deepEqual(result, expected, 'QuickUnion.verticies should have the correct data');
  t.equal(qu.count, 2, 'QuickUnion.count should be 2');
  t.end();
});
(0, _tape["default"])('QuickUnion.sets() - Returns a 2D array containing the sets of joined verticies', function (t) {
  var qu = new _indexMin.QuickUnion([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  qu.union(4, 3);
  qu.union(3, 8);
  qu.union(6, 5);
  qu.union(9, 4);
  qu.union(2, 1);
  var expected = [[0], [1, 2], [5, 6], [7], [3, 4, 8, 9]];
  var result = qu.sets();
  t.deepEqual(result, expected, 'Outputs the correct sets');
  t.end();
});