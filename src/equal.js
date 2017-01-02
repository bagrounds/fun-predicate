;(function () {
  'use strict'

  /* imports */
  var deepEqual = require('deep-equal')
  var typeCheck = require('type-check').typeCheck
  var predicate = require('./predicate')

  /* exports */
  module.exports = equal

  /**
   *
   * @param {*} reference to compare for equality
   * @return {Function} equal(subject) -> {true if subject equal reference}
   */
  function equal (reference) {
    return predicate({
      reference: reference,
      compare: function equal (a, b) {
        var equal = a === b

        if (typeCheck('Object|Array', reference)) {
          equal = deepEqual(a, b)
        }

        return equal
      }
    })
  }
})()

