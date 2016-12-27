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
    testConstructor()
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
})()

