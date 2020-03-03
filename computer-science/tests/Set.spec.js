"use strict";

var _tape = _interopRequireDefault(require("tape"));

var _indexMin = require("../index.min.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(0, _tape["default"])('new Set() - should create a new empty set', function (t) {
  var s = new _indexMin.Set();
  t.notEqual(s, null, 'Set should exist');
  t.equal(s.size, 0, 'Set.size should be 0');
  t.end();
});
(0, _tape["default"])('Set.add(item) - should add one item to the set', function (t) {
  var s = new _indexMin.Set();
  var item = 'test1';
  s.add(item);
  t.deepEqual(s.values, [item], 'Set.values should contain the item');
  t.equal(s.size, 1, 'Set.size should be 1');
  t.end();
});
(0, _tape["default"])('Set.add(item) - called multiple times with the same item should not contain duplicates', function (t) {
  var s = new _indexMin.Set();
  var item = 'test1';
  s.add(item);
  s.add(item);
  s.add(item);
  t.deepEqual(s.values, [item], 'Set.values should contain the item');
  t.equal(s.size, 1, 'Set.size should be 1');
  t.end();
});
(0, _tape["default"])('Set.add() - should throw when no item is specified', function (t) {
  t.plan(1);
  var s = new _indexMin.Set();

  try {
    s.add();
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('Set.addAll(items) - should add multiple items to the Set', function (t) {
  var s = new _indexMin.Set();
  var items = ['test1', 'test2', 'test3'];
  s.addAll(items);
  t.deepEqual(s.values, items, 'Set.values should be contain all 3 items');
  t.equal(s.size, 3, 'Set.size should be 3');
  t.end();
});
(0, _tape["default"])('Set.addAll() - should throw when no items are specified', function (t) {
  t.plan(1);
  var s = new _indexMin.Set();

  try {
    s.addAll();
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('new Set(items) - should add items during construction', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var s = new _indexMin.Set(items);
  t.deepEqual(s.values, items, 'Set.values should contain the items');
  t.equal(s.size, 3, 'Set.size should be 3');
  t.end();
});
(0, _tape["default"])('Set.remove(item) - should remove the item from the set', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var s = new _indexMin.Set(items);
  var result = s.remove('test1');
  var expect = ['test2', 'test3'];
  t.deepEqual(s.values, expect, 'Set.values should not contain the removed item');
  t.equal(s.size, 2, 'Set.size should be 2');
  t["true"](result, 'result should return true when an item is removed');
  t.end();
});
(0, _tape["default"])('Set.remove(item) - should not remove an item not in the set', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var s = new _indexMin.Set(items);
  var result = s.remove('test4');
  var expect = ['test1', 'test2', 'test3'];
  t.deepEqual(s.values, expect, 'Set.values should not be modified');
  t.equal(s.size, 3, 'Set.size should be 3');
  t["false"](result, 'result should return false if the item is not in the set');
  t.end();
});
(0, _tape["default"])('Set.remove() - should throw when no item is specified', function (t) {
  t.plan(1);
  var items = ['test1', 'test2', 'test3'];
  var s = new _indexMin.Set(items);

  try {
    s.remove();
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('Set.clear() - should remove all items from the set', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var s = new _indexMin.Set(items);
  s.clear();
  t.deepEqual(s.values, [], 'Set.values should be empty');
  t.equal(s.size, 0, 'Set.size should be 0');
  t.end();
});
(0, _tape["default"])('Set[Symbol.iterator] - should be iterable', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var s = new _indexMin.Set(items);

  var result = _toConsumableArray(s);

  t.deepEqual(result, items, 'iteration works');
  t.end();
});