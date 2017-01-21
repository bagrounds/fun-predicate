;(function () {
  'use strict'

  /* imports */
  var funTest = require('fun-test')
  var funAssert = require('fun-assert')
  var funTransform = require('fun-transform')

  /* exports */
  module.exports = [
    {
      error: funAssert.truthy
    },
    {
      input: [{
        compare: beTruthy
      }],
      result: funAssert.type('Function')
    },
    {
      input: [{
        reference: 9,
        compare: beGreaterThan
      }],
      result: funAssert.type('Function')
    },
    {
      input: [9],
      result: funAssert.equal(false),
      transformer: testPredicate({
        reference: 9,
        compare: beGreaterThan
      })
    },
    {
      input: [10],
      result: funAssert.equal(true),
      transformer: testPredicate({
        reference: 9,
        compare: beGreaterThan
      })
    },
    {
      input: [6],
      result: funAssert.equal(true),
      transformer: testMethod({
        method: 'and',
        r1: 5,
        r2: 7,
        c1: beGreaterThan,
        c2: beLessThan
      })
    },
    {
      input: [5],
      result: funAssert.equal(false),
      transformer: testMethod({
        method: 'and',
        r1: 5,
        r2: 7,
        c1: beGreaterThan,
        c2: beLessThan
      })
    },
    {
      input: [7],
      result: funAssert.equal(false),
      transformer: testMethod({
        method: 'and',
        r1: 5,
        r2: 7,
        c1: beGreaterThan,
        c2: beLessThan
      })
    },
    {
      input: [6],
      result: funAssert.equal(false),
      transformer: testMethod({
        method: 'or',
        r1: 5,
        r2: 7,
        c1: beLessThan,
        c2: beGreaterThan
      })
    },
    {
      input: [4],
      result: funAssert.equal(true),
      transformer: testMethod({
        method: 'or',
        r1: 5,
        r2: 7,
        c1: beLessThan,
        c2: beGreaterThan
      })
    },
    {
      input: [8],
      result: funAssert.equal(true),
      transformer: testMethod({
        method: 'or',
        r1: 5,
        r2: 7,
        c1: beLessThan,
        c2: beGreaterThan
      })
    },
    {
      input: [5],
      result: funAssert.equal(true),
      transformer: testMethod({
        method: 'not',
        r1: 5,
        c1: beLessThan
      })
    },
    {
      input: [4],
      result: funAssert.equal(false),
      transformer: testMethod({
        method: 'not',
        r1: 5,
        c1: beLessThan
      })
    },
    {
      input: [' '],
      result: funAssert.equal(true),
      transformer: funTransform.toMethod('truthy')
    },
    {
      input: [''],
      result: funAssert.equal(false),
      transformer: funTransform.toMethod('truthy')
    },
    {
      input: [''],
      result: funAssert.equal(true),
      transformer: funTransform.toMethod('falsey')
    },
    {
      input: [' '],
      result: funAssert.equal(false),
      transformer: funTransform.toMethod('falsey')
    },
    {
      input: ['a string'],
      result: funAssert.type('Function'),
      transformer: funTransform.toMethod('equal')
    },
    {
      input: ['a string'],
      result: funAssert.equal(true),
      transformer: function equalAString (funPredicate) {
        return funPredicate.equal('a string')
      }
    },
    {
      input: ['b string'],
      result: funAssert.equal(false),
      transformer: function equalAString (funPredicate) {
        return funPredicate.equal('a string')
      }
    },
    {
      input: ['String'],
      result: funAssert.type('Function'),
      transformer: funTransform.toMethod('type')
    },
    {
      input: ['a string'],
      result: funAssert.equal(true),
      transformer: function typeString (funPredicate) {
        return funPredicate.type('String')
      }
    },
    {
      input: [7],
      result: funAssert.equal(false),
      transformer: function typeString (funPredicate) {
        return funPredicate.type('String')
      }
    },
    {
      input: [/\d/],
      result: funAssert.type('Function'),
      transformer: funTransform.toMethod('match')
    },
    {
      input: ['a digit: 8!'],
      result: funAssert.equal(true),
      transformer: matchDigit()
    },
    {
      input: ['no digit!'],
      result: funAssert.equal(false),
      transformer: matchDigit()
    }
  ].map(funTest)

  function matchDigit () {
    function result (funPredicate) {
      return funPredicate.match(/\d/)
    }

    result.toString = function () {
      return 'match(/\\d/)'
    }

    return result
  }

  function beTruthy (subject) {
    return !!subject
  }

  function beLessThan (subject, reference) {
    return subject < reference
  }

  function beGreaterThan (subject, reference) {
    return subject > reference
  }

  function testPredicate (options) {
    return function predicateFunction (predicate) {
      return predicate(options)
    }
  }

  function testMethod (options) {
    function method (predicate) {
      var p1 = predicate({
        reference: options.r1,
        compare: options.c1
      })

      var p2

      if (options.r2 && options.c2) {
        p2 = predicate({
          reference: options.r2,
          compare: options.c2
        })
      }

      var result = predicate[options.method](p1, p2)

      return result
    }

    method.toString = function toString () {
      return options.method
    }

    return method
  }
})()

