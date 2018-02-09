;(() => {
  'use strict'

  /* imports */
  const { ap, get } = require('fun-object')
  const { sync } = require('fun-test')
  const arrange = require('fun-arrange')
  const { lt, gt, add, sub, equal } = require('fun-scalar')
  const { compose, composeAll } = require('fun-function')
  const apply = require('fun-apply')
  const { map } = require('fun-array')

  /* exports */
  module.exports = map(
    composeAll([
      sync,
      ap({ contra: get }),
      arrange({ inputs: 0, predicate: 1, contra: 2 })
    ]), [
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
      [[lt(1), lt(3)], compose(equal(true), apply([0])), 'implies'],
      [[lt(1), lt(3)], compose(equal(true), apply([2])), 'implies'],
      [[lt(1), lt(3)], compose(equal(true), apply([4])), 'implies'],
      [[gt(1), lt(3)], compose(equal(true), apply([0])), 'implies'],
      [[gt(1), lt(3)], compose(equal(true), apply([2])), 'implies'],
      [[gt(1), lt(3)], compose(equal(false), apply([4])), 'implies'],
      [[gt(0), lt(2)], compose(equal(false), apply([0])), 'and'],
      [[gt(0), lt(2)], compose(equal(true), apply([1])), 'and'],
      [[gt(0), lt(2)], compose(equal(false), apply([2])), 'and'],
      [[lt(0), gt(2)], compose(equal(true), apply([-1])), 'or'],
      [[lt(0), gt(2)], compose(equal(false), apply([1])), 'or'],
      [[lt(0), gt(2)], compose(equal(true), apply([3])), 'or'],
      [[lt(2), gt(0)], compose(equal(true), apply([-1])), 'xor'],
      [[lt(2), gt(0)], compose(equal(false), apply([1])), 'xor'],
      [[lt(2), gt(0)], compose(equal(true), apply([3])), 'xor'],
      [[lt(2), lt(0)], compose(equal(true), apply([-1])), 'xnor'],
      [[lt(2), lt(0)], compose(equal(false), apply([1])), 'xnor'],
      [[lt(2), lt(0)], compose(equal(true), apply([3])), 'xnor'],
      [[[gt(0), lt(9)]], compose(equal(false), apply([0])), 'all'],
      [[[gt(0), lt(9)]], compose(equal(true), apply([1])), 'all'],
      [[[gt(0), lt(9)]], compose(equal(true), apply([8])), 'all'],
      [[[gt(0), lt(9)]], compose(equal(false), apply([9])), 'all'],
      [[[gt(0), gt(5)]], compose(equal(false), apply([0])), 'some'],
      [[[gt(0), gt(5)]], compose(equal(true), apply([1])), 'some'],
      [[[gt(0), gt(5)]], compose(equal(true), apply([6])), 'some'],
      [[[gt(6), lt(4)]], compose(equal(true), apply([5])), 'none'],
      [[[gt(6), lt(4)]], compose(equal(false), apply([7])), 'none'],
      [[[gt(6), lt(4)]], compose(equal(false), apply([3])), 'none'],
      [[[lt(6), lt(4)]], compose(equal(false), apply([3])), 'none'],
      [[lt(0)], compose(equal(true), apply([1])), 'not'],
      [[lt(0)], compose(equal(false), apply([-1])), 'not'],
      [[['not JSON'], JSON.parse], equal(true), 'throwsWith'],
      [[['{}'], JSON.parse], equal(false), 'throwsWith'],
      [[gt(0), add(1), sub(1), 2], equal(3), 'ifThenElse'],
      [[gt(0), add(1), sub(1), -2], equal(-3), 'ifThenElse']
    ])
})()

