;(function () {
  'use strict'

  /* imports */
  var funTest = require('fun-test')
  var funAssert = require('fun-assert')

  /* exports */
  module.exports = [
    {
      error: funAssert.truthy,
      sync: true
    },
    {
      input: {
        compare: beTruthy
      },
      result: funAssert.type('Function'),
      sync: true
    },
    {
      input: {
        reference: 9,
        compare: beGreaterThan
      },
      result: funAssert.type('Function'),
      sync: true
    },
    {
      input: 9,
      result: funAssert.equal(false),
      transformer: testPredicate({
        reference: 9,
        compare: beGreaterThan
      }),
      sync: true
    },
    {
      input: 10,
      result: funAssert.equal(true),
      transformer: testPredicate({
        reference: 9,
        compare: beGreaterThan
      }),
      sync: true
    },
    {
      input: 6,
      result: funAssert.equal(true),
      transformer: testMethod({
        method: 'and',
        r1: 5,
        r2: 7,
        c1: beGreaterThan,
        c2: beLessThan
      }),
      sync: true
    },
    {
      input: 5,
      result: funAssert.equal(false),
      transformer: testMethod({
        method: 'and',
        r1: 5,
        r2: 7,
        c1: beGreaterThan,
        c2: beLessThan
      }),
      sync: true
    },
    {
      input: 7,
      result: funAssert.equal(false),
      transformer: testMethod({
        method: 'and',
        r1: 5,
        r2: 7,
        c1: beGreaterThan,
        c2: beLessThan
      }),
      sync: true
    },
    {
      input: 6,
      result: funAssert.equal(false),
      transformer: testMethod({
        method: 'or',
        r1: 5,
        r2: 7,
        c1: beLessThan,
        c2: beGreaterThan
      }),
      sync: true
    },
    {
      input: 4,
      result: funAssert.equal(true),
      transformer: testMethod({
        method: 'or',
        r1: 5,
        r2: 7,
        c1: beLessThan,
        c2: beGreaterThan
      }),
      sync: true
    },
    {
      input: 8,
      result: funAssert.equal(true),
      transformer: testMethod({
        method: 'or',
        r1: 5,
        r2: 7,
        c1: beLessThan,
        c2: beGreaterThan
      }),
      sync: true
    },
    {
      input: 5,
      result: funAssert.equal(true),
      transformer: testMethod({
        method: 'not',
        r1: 5,
        c1: beLessThan
      }),
      sync: true
    },
    {
      input: 4,
      result: funAssert.equal(false),
      transformer: testMethod({
        method: 'not',
        r1: 5,
        c1: beLessThan
      }),
      sync: true
    }
  ].map(test)

  function beTruthy (subject) {
    return !!subject
  }

  function beLessThan (subject, reference) {
    return subject < reference
  }

  function beGreaterThan (subject, reference) {
    return subject > reference
  }

  function test (options) {
    var description = descriptionString(options)
    var test = funTest(options)

    test.description = description

    return test
  }

  function testPredicate (options) {
    return function predicateFunction (predicate) {
      return predicate(options)
    }
  }

  function testMethod (options) {
    return function method (predicate) {
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

      console.log('# ' + result.toString('subject'))
      return result
    }
  }

  function descriptionString (options) {
    if (options.input === undefined) {
      options.input = {}
    }

    var assertee = options.result ? 'result' : 'error'

    var assertion = options.error || options.result || funAssert.falsey

    var description = assertee + ': ' + assertion.toString(options.input)
    var subject = options.transformer ? options.transformer.name : 'predicate'
    var inputString = JSON.stringify(options.input)

    description = subject + '(' + inputString + ')' + ' - ' + description

    return description
  }
})()

