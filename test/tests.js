;(function () {
  'use strict'

  /* imports */
  var funTest = require('fun-test')
  var funAssert = require('fun-assert')
  var specifier = require('specifier')

  var isFunction = funAssert.type('Function')

  var apiSpec = {
    evaluate: [
      isFunction
    ],
    and: [
      isFunction
    ],
    or: [
      isFunction
    ],
    not: [
      isFunction
    ],
    same: [
      isFunction
    ]
  }

  var apiSpecChecker = specifier(apiSpec)

  /* exports */
  module.exports = [
    testConstructor(),
    testClassMethods()
  ]

  function testConstructor () {
    function testInput () {
      return true
    }

    var test = funTest({
      input: testInput,
      verifier: function verifier (error, result) {
        funAssert.falsey(error)

        apiSpecChecker(result)
      },
      sync: true
    })

    test.description = 'Should construct object with full api'

    return test
  }

  function testClassMethods () {
    var test = funTest({
      verifier: function verifier (error, Predicate) {
        funAssert.falsey(error)

        funAssert.truthy(Predicate.yes())
        funAssert.falsey(Predicate.no())
      },
      transformer: transformer,
      sync: true
    })

    test.description = 'Class methods should work properly'

    return test

    function transformer (funPredicate) {
      return function () {
        return funPredicate
      }
    }
  }

  module.exports = module.exports.concat([
    {
      input: function equal5 (subject) {
        return subject === 5
      },
      willPass: 5,
      willFail: 4
    }
  ].map(tests))

  function tests (options) {
    var test = funTest({
      input: options.input,
      verifier: function (error, predicate) {
        funAssert.falsey(error)

        testPredicate(predicate, options.willPass, options.willFail)
        testSame(predicate, options.willPass, options.willFail)
        testNot(predicate, options.willPass, options.willFail)
        testOr(predicate, options.willPass, options.willFail)
        testAnd(predicate, options.willPass, options.willFail)
      },
      sync: true
    })

    test.descriptiPass = options.input.name + ' should pass for ' +
      options.willFail + ' and fail for ' + options.willFail

    return test
  }

  function testPredicate (predicate, willPass, willFail) {
    console.log()
    console.log('# test predicate')
    assertTrueAndComment(predicate, willPass)
    assertFalseAndComment(predicate, willFail)
  }

  function testSame (predicate, willPass, willFail) {
    console.log()
    console.log('# test predicate.same')
    assertTrueAndComment(predicate.same(), willPass)
    assertFalseAndComment(predicate.same(), willFail)
  }

  function testNot (predicate, willPass, willFail) {
    console.log()
    console.log('# test predicate.not')
    assertTrueAndComment(predicate.not(), willFail)
    assertFalseAndComment(predicate.not(), willPass)
  }

  function testOr (predicate, subject) {
    console.log()
    console.log('# test predicate.or')
    var p1 = predicate.not().or(predicate.not())
    var p2 = predicate.not().or(predicate)
    var p3 = predicate.or(predicate.not())
    var p4 = predicate.or(predicate)

    assertFalseAndComment(p1, subject)
    assertTrueAndComment(p2, subject)
    assertTrueAndComment(p3, subject)
    assertTrueAndComment(p4, subject)
  }

  function testAnd (predicate, subject) {
    console.log()
    console.log('# test predicate.and')
    var p1 = predicate.not().and(predicate.not())
    var p2 = predicate.not().and(predicate)
    var p3 = predicate.and(predicate.not())
    var p4 = predicate.and(predicate)

    assertFalseAndComment(p1, subject)
    assertFalseAndComment(p2, subject)
    assertFalseAndComment(p3, subject)
    assertTrueAndComment(p4, subject)
  }

  function assertTrueAndComment (predicate, subject) {
    console.log('# true:  ' + predicate.toString(subject))
    funAssert.truthy(predicate.evaluate(subject))
  }

  function assertFalseAndComment (predicate, subject) {
    console.log('# false: ' + predicate.toString(subject))
    funAssert.falsey(predicate.evaluate(subject))
  }
})()

