"use strict";

var _tape = _interopRequireDefault(require("tape"));

var _indexMin = require("../index.min.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(0, _tape["default"])('new Queue() - should create a new empty queue', function (t) {
  var q = new _indexMin.Queue();
  t.notEqual(q, null, 'Queue should exist');
  t.equal(q.first, null, 'Queue.first should initialize to null');
  t.equal(q.last, null, 'Queue.last should initialize to null');
  t.equal(q.size, 0, 'Queue.size should be 0');
  t.end();
});
(0, _tape["default"])('Queue.enqueue(item) - should add one item to the queue', function (t) {
  var q = new _indexMin.Queue();
  var item = 'test1';
  q.enqueue(item);
  t.equal(q.first.data, item, 'Queue.first should be the item');
  t.equal(q.last.data, item, 'Queue.last should be the item');
  t.equal(q.size, 1, 'Queue.size should be 1');
  t.end();
});
(0, _tape["default"])('Queue.enqueue() - should throw when no item is specified', function (t) {
  t.plan(1);
  var q = new _indexMin.Queue();

  try {
    q.enqueue();
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('Queue.enqueue(item)* - called multiple times should add multiple items to the queue', function (t) {
  var q = new _indexMin.Queue();
  var items = ['test1', 'test2'];
  items.forEach(function (item) {
    return q.enqueue(item);
  });
  t.equal(q.first.data, items[0], 'Queue.first should be the first item');
  t.equal(q.last.data, items[1], 'Queue.last should be the second item');
  t.equal(q.size, 2, 'Queue.size should be 2');
  t.end();
});
(0, _tape["default"])('Queue.enqueueAll(items) - should add multiple items to the queue', function (t) {
  var q = new _indexMin.Queue();
  var items = ['test1', 'test2'];
  q.enqueueAll(items);
  t.equal(q.first.data, items[0], 'Queue.first should be the first item');
  t.equal(q.last.data, items[1], 'Queue.last should be the second item');
  t.equal(q.size, 2, 'Queue.size should be 2');
  t.end();
});
(0, _tape["default"])('Queue.enqueueAll() - should throw when no items are specified', function (t) {
  t.plan(1);
  var q = new _indexMin.Queue();

  try {
    q.enqueueAll();
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('new Queue(items) - should enqueue items during construction', function (t) {
  var items = ['test1', 'test2'];
  var q = new _indexMin.Queue(items);
  t.equal(q.first.data, items[0], 'Queue.first should be the first item');
  t.equal(q.last.data, items[1], 'Queue.last should be the second item');
  t.equal(q.size, 2, 'Queue.size should be 2');
  t.end();
});
(0, _tape["default"])('Queue.dequeue(item) - should dequeue an item from the queue', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var q = new _indexMin.Queue(items);
  var result = q.dequeue();
  t.equal(q.first.data, items[1], 'Queue.first should be the second item');
  t.equal(q.last.data, items[2], 'Queue.last should be the last item');
  t.equal(q.size, 2, 'Queue.size should be 2');
  t.equal(result, items[0], 'result should return the first item');
  t.end();
});
(0, _tape["default"])('Queue.dequeue(item)* - called multiple times should dequeue all items from the queue', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var q = new _indexMin.Queue(items);

  for (var i = 0; i < items.length; i++) {
    q.dequeue();
  }

  t.equal(q.first, null, 'Queue.first should reset to null');
  t.equal(q.last, null, 'Queue.last should reset to null');
  t.equal(q.size, 0, 'Queue.size should be 0');
  t.end();
});
(0, _tape["default"])('Stack.dequeue() - should throw when called on an empty queue', function (t) {
  t.plan(1);
  var q = new _indexMin.Queue();

  try {
    q.dequeue();
  } catch (e) {
    t.pass('Expected exception thrown');
  }

  t.end();
});
(0, _tape["default"])('Queue.peek() - should return the first item of the queue', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var q = new _indexMin.Queue(items);
  var result = q.peek();
  t.equal(result, items[0], 'Should return the first item in the queue');
  t.end();
});
(0, _tape["default"])('Queue.clear() - should remove all items from the queue', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var q = new _indexMin.Queue(items);
  q.clear();
  t.equal(q.first, null, 'Queue.first should reset to null');
  t.equal(q.last, null, 'Queue.first should reset to null');
  t.equal(q.size, 0, 'queue.size should be 0');
  t.end();
});
(0, _tape["default"])('Queue[Symbol.iterator] - should be iterable', function (t) {
  var items = ['test1', 'test2', 'test3'];
  var q = new _indexMin.Queue(items);

  var result = _toConsumableArray(q);

  t.deepEqual(result, items, 'iteration works');
  t.end();
});