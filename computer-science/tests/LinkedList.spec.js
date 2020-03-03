"use strict";

var _tape = _interopRequireDefault(require("tape"));

var _indexMin = require("../index.min.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(0, _tape["default"])('new LinkedList() - should create a new empty list', function (t) {
  var ll = new _indexMin.LinkedList();
  t.notEqual(ll, null, 'LinkedList should exist');
  t.equal(ll.head, null, 'LinkedList.head should initialize to null');
  t.equal(ll.tail, null, 'LinkedList.tail should initialize to null');
  t.equal(ll.size, 0, 'LinkedList.size should be 0');
  t.end();
});
(0, _tape["default"])('LinkedList.add(item) - should add one item to the list', function (t) {
  var ll = new _indexMin.LinkedList();
  var item = 'test1';
  ll.add(item);
  t.equal(ll.head.data, item, 'LinkedList.head should be the item');
  t.equal(ll.tail.data, item, 'LinkedList.tail should be the item');
  t.equal(ll.size, 1, 'LinkedList.size should be 1');
  t.end();
});
(0, _tape["default"])('LinkedList.add() - should throw when no item is specified', function (t) {
  t.plan(1);
  var ll = new _indexMin.LinkedList();

  try {
    ll.add();
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('LinkedList.add(item)* - called multiple times should add multiple items to the list', function (t) {
  var ll = new _indexMin.LinkedList();
  var items = ['test1', 'test2', 'test3'];
  items.forEach(function (item) {
    return ll.add(item);
  });
  t.equal(ll.head.data, items[0], 'LinkedList.head should be the first item');
  t.equal(ll.tail.data, items[2], 'LinkedList.tail should be the last item');
  t.equal(ll.size, 3, 'LinkedList.size should be 3');
  t.end();
});
(0, _tape["default"])('LinkedList.addAll(items) - should add multiple items to the list', function (t) {
  var ll = new _indexMin.LinkedList();
  var items = ['test1', 'test2', 'test3'];
  ll.addAll(items);
  t.equal(ll.head.data, items[0], 'LinkedList.head should be the first item');
  t.equal(ll.tail.data, items[2], 'LinkedList.tail should be the last item');
  t.equal(ll.size, 3, 'LinkedList.size should be 3');
  t.end();
});
(0, _tape["default"])('LinkedList.addAll() - should throw when no items are specified', function (t) {
  t.plan(1);
  var ll = new _indexMin.LinkedList();

  try {
    ll.addAll();
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('new LinkedList(items) - should add items during construction', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var ll = new _indexMin.LinkedList(items);
  t.equal(ll.head.data, items[0], 'LinkedList.head should be the first item');
  t.equal(ll.tail.data, items[2], 'LinkedList.tail should be the last item');
  t.equal(ll.size, 3, 'LinkedList.size should be 3');
  t.end();
});
(0, _tape["default"])('LinkedList.remove(item) - should remove the first item from the list', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var ll = new _indexMin.LinkedList(items);
  var result = ll.remove('test1');
  t.equal(ll.head.data, items[1], 'LinkedList.head should be the second item');
  t.equal(ll.tail.data, items[2], 'LinkedList.tail should be the last item');
  t.equal(ll.size, 2, 'LinkedList.size should be 2');
  t["true"](result, 'result should return true when an item is removed');
  t.end();
});
(0, _tape["default"])('LinkedList.remove(item) - should remove a middle item from the list', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var ll = new _indexMin.LinkedList(items);
  var result = ll.remove('test2');
  t.equal(ll.head.data, items[0], 'LinkedList.head should be the first item');
  t.equal(ll.tail.data, items[2], 'LinkedList.tail should be the last item');
  t.equal(ll.size, 2, 'LinkedList.size should be 2');
  t["true"](result, 'result should return true when an item is removed');
  t.end();
});
(0, _tape["default"])('LinkedList.remove(item) - should remove the last item from the list', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var ll = new _indexMin.LinkedList(items);
  var result = ll.remove('test3');
  t.equal(ll.head.data, items[0], 'LinkedList.head should be the first item');
  t.equal(ll.tail.data, items[1], 'LinkedList.tail should be the second item');
  t.equal(ll.size, 2, 'LinkedList.size should be 2');
  t["true"](result, 'result should return true when an item is removed');
  t.end();
});
(0, _tape["default"])('LinkedList.remove(item)* - called multiple times should remove all items from the list', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var ll = new _indexMin.LinkedList(items);
  items.forEach(function (item) {
    return ll.remove(item);
  });
  t.equal(ll.head, null, 'LinkedList.head should reset to null');
  t.equal(ll.tail, null, 'LinkedList.tail should reset to null');
  t.equal(ll.size, 0, 'LinkedList.size should be 0');
  t.end();
});
(0, _tape["default"])('LinkedList.remove(not-item) - should remove nothing from the list', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var ll = new _indexMin.LinkedList(items);
  var result = ll.remove('not-item');
  t.equal(ll.head.data, items[0], 'LinkedList.head should be the first item');
  t.equal(ll.tail.data, items[2], 'LinkedList.tail should be the last item');
  t.equal(ll.size, 3, 'LinkedList.size should be 3');
  t["false"](result, 'result should return true when an item is removed');
  t.end();
});
(0, _tape["default"])('LinkedList.remove() - should throw  when no item is specified', function (t) {
  t.plan(1);
  var items = ['test1', 'test2', 'test3'];
  var ll = new _indexMin.LinkedList(items);

  try {
    ll.remove();
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('LinkedList.remove(item) - should throw when called on an empty list', function (t) {
  t.plan(1);
  var ll = new _indexMin.LinkedList();

  try {
    ll.remove('test1');
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('LinkedList.clear() - should remove all items from the list', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var ll = new _indexMin.LinkedList(items);
  ll.clear();
  t.equal(ll.head, null, 'LinkedList.head should reset to null');
  t.equal(ll.tail, null, 'LinkedList.tail should reset to null');
  t.equal(ll.size, 0, 'LinkedList.size should be 0');
  t.end();
});
(0, _tape["default"])('LinkedList[Symbol.iterator] - should be iterable', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var ll = new _indexMin.LinkedList(items);

  var result = _toConsumableArray(ll);

  t.deepEqual(result, items, 'iteration works');
  t.end();
});