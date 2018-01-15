;(() => {
  'use strict'

  /* imports */
  const object = require('fun-object')
  const funTest = require('fun-test')
  const arrange = require('fun-arrange')
  const scalar = require('fun-scalar')
  const compose = require('fun-compose')
  const apply = require('fun-apply')
  const curry = require('fun-curry')

  const equal = curry((a, b) => a === b)

  /* exports */
  module.exports = [
    [[0], equal(true), 'falsey'],
    [[1], equal(true), 'truthy'],
    [[''], equal(true), 'falsey'],
    [[' '], equal(true), 'truthy'],
    [[], equal(false), 'f'],
    [[], equal(true), 't'],
    [['Number', '0'], equal(false), 'type'],
    [['Number', 0], equal(true), 'type'],
    [['String', 0], equal(false), 'type'],
    [['String', ''], equal(true), 'type'],
    [[/^s.*g$/, 'string'], equal(true), 'match'],
    [[/^s.*g$/, ' string'], equal(false), 'match'],
    [[7, 7], equal(true), 'equal'],
    [[6, 7], equal(false), 'equal'],
    [[[], []], equal(false), 'equal'],
    [[[], []], equal(true), 'equalDeep'],
    [[[1, [{a: 2}]], [1, [{a: 2}]]], equal(true), 'equalDeep'],
    [[[1, [{a: 3}]], [1, [{a: 2}]]], equal(false), 'equalDeep'],
    [[scalar.gt(0), scalar.lt(2)], compose(equal(false), apply([0])), 'and'],
    [[scalar.gt(0), scalar.lt(2)], compose(equal(true), apply([1])), 'and'],
    [[scalar.gt(0), scalar.lt(2)], compose(equal(false), apply([2])), 'and'],
    [[scalar.lt(0), scalar.gt(2)], compose(equal(true), apply([-1])), 'or'],
    [[scalar.lt(0), scalar.gt(2)], compose(equal(false), apply([1])), 'or'],
    [[scalar.lt(0), scalar.gt(2)], compose(equal(true), apply([3])), 'or'],
    [[scalar.lt(2), scalar.gt(0)], compose(equal(true), apply([-1])), 'xor'],
    [[scalar.lt(2), scalar.gt(0)], compose(equal(false), apply([1])), 'xor'],
    [[scalar.lt(2), scalar.gt(0)], compose(equal(true), apply([3])), 'xor'],
    [[scalar.lt(2), scalar.lt(0)], compose(equal(true), apply([-1])), 'xnor'],
    [[scalar.lt(2), scalar.lt(0)], compose(equal(false), apply([1])), 'xnor'],
    [[scalar.lt(2), scalar.lt(0)], compose(equal(true), apply([3])), 'xnor'],
    [[[scalar.gt(0), scalar.lt(9)]], compose(equal(false), apply([0])), 'all'],
    [[[scalar.gt(0), scalar.lt(9)]], compose(equal(true), apply([1])), 'all'],
    [[[scalar.gt(0), scalar.lt(9)]], compose(equal(true), apply([8])), 'all'],
    [[[scalar.gt(0), scalar.lt(9)]], compose(equal(false), apply([9])), 'all'],
    [[[scalar.gt(0), scalar.gt(5)]], compose(equal(false), apply([0])), 'some'],
    [[[scalar.gt(0), scalar.gt(5)]], compose(equal(true), apply([1])), 'some'],
    [[[scalar.gt(0), scalar.gt(5)]], compose(equal(true), apply([6])), 'some'],
    [[[scalar.gt(6), scalar.lt(4)]], compose(equal(true), apply([5])), 'none'],
    [[[scalar.gt(6), scalar.lt(4)]], compose(equal(false), apply([7])), 'none'],
    [[[scalar.gt(6), scalar.lt(4)]], compose(equal(false), apply([3])), 'none'],
    [[[scalar.lt(6), scalar.lt(4)]], compose(equal(false), apply([3])), 'none'],
    [[scalar.lt(0)], compose(equal(true), apply([1])), 'not'],
    [[scalar.lt(0)], compose(equal(false), apply([-1])), 'not'],
    [[['not JSON'], JSON.parse], equal(true), 'throwsWith'],
    [[['{}'], JSON.parse], equal(false), 'throwsWith'],
    [[scalar.gt(0), scalar.add(1), scalar.sub(1), 2], equal(3), 'ifThenElse'],
    [[scalar.gt(0), scalar.add(1), scalar.sub(1), -2], equal(-3), 'ifThenElse']
  ].map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({
      contra: object.get
    }))
    .map(funTest.sync)
})()

