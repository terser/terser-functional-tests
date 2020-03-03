"use strict";

var _tape = _interopRequireDefault(require("tape"));

var _indexMin = require("../index.min.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(0, _tape["default"])('new Stack() - should create a new empty stack', function (t) {
  var s = new _indexMin.Stack();
  t.notEqual(s, null, 'Stack should exist');
  t.equal(s.top, null, 'Stack.top should initialize to null');
  t.equal(s.size, 0, 'Stack.size should be 0');
  t.end();
});
(0, _tape["default"])('Stack.push(item) - should add one item to the stack', function (t) {
  var s = new _indexMin.Stack();
  var item = 'test1';
  s.push(item);
  t.equal(s.top.data, item, 'Stack.top should be the item');
  t.equal(s.size, 1, 'Stack.size should be 1');
  t.end();
});
(0, _tape["default"])('Stack.push() - should throw when no item is specified', function (t) {
  t.plan(1);
  var s = new _indexMin.Stack();

  try {
    s.push();
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('Stack.push(item)* - called multiple times should add multiple items to the stack', function (t) {
  var s = new _indexMin.Stack();
  var items = ['test1', 'test2', 'test3'];
  items.forEach(function (item) {
    return s.push(item);
  });
  t.equal(s.top.data, items[2], 'Stack.top should be the last item');
  t.equal(s.size, 3, 'Stack.size should be 3');
  t.end();
});
(0, _tape["default"])('Stack.pushAll(items) - should add multiple items to the stack', function (t) {
  var s = new _indexMin.Stack();
  var items = ['test1', 'test2', 'test3'];
  s.pushAll(items);
  t.equal(s.top.data, items[2], 'Stack.top should be the last item');
  t.equal(s.size, 3, 'Stack.size should be 3');
  t.end();
});
(0, _tape["default"])('Stack.pushAll() - should throw when no items are specified', function (t) {
  t.plan(1);
  var s = new _indexMin.Stack();

  try {
    s.pushAll();
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('new Stack(items) - should push items during construction', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var s = new _indexMin.Stack(items);
  t.equal(s.top.data, items[2], 'Stack.top should be the last item');
  t.equal(s.size, 3, 'Stack.size should be 3');
  t.end();
});
(0, _tape["default"])('Stack.pop() - should remove and return the top item', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var s = new _indexMin.Stack(items);
  var result = s.pop();
  t.equal(s.top.data, items[1], 'Stack.top should be the second item');
  t.equal(s.size, 2, 'Stack.size should be 2');
  t.equal(result, items[2], 'result should return the popped item');
  t.end();
});
(0, _tape["default"])('Stack.pop()* - called multiple times should remove all items from the stack', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var s = new _indexMin.Stack(items);

  for (var i = 0; i < items.length; i++) {
    s.pop();
  }

  t.equal(s.top, null, 'Stack.top should reset to null');
  t.equal(s.size, 0, 'Stack.size should be 0');
  t.end();
});
(0, _tape["default"])('Stack.pop() - should throw when called on an empty stack', function (t) {
  t.plan(1);
  var s = new _indexMin.Stack();

  try {
    s.pop();
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('Stack.peek() - should return the top item of the stack', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var s = new _indexMin.Stack(items);
  var result = s.peek();
  t.equal(result, items[2], 'Should return the top item of the stack');
  t.end();
});
(0, _tape["default"])('Stack.clear() - should remove all items from the stack', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var s = new _indexMin.Stack(items);
  s.clear();
  t.equal(s.top, null, 'Stack.top should reset to null');
  t.equal(s.size, 0, 'Stack.size should be 0');
  t.end();
});
(0, _tape["default"])('Stack[Symbol.iterator] - should be iterable', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var s = new _indexMin.Stack(items);

  var result = _toConsumableArray(s);

  t.deepEqual(result, items.reverse(), 'iteration works');
  t.end();
});