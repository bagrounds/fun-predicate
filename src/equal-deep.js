;(function () {
  'use strict'

  /* imports */
  var deepEqual = require('deep-equal')

  /* exports */
  module.exports = equalDeep

  /**
   *
   * @method module:fun-predicate.equalDeep
   *
   * @param {*} reference to compare for equality
   * @return {Function} equal(subject) -> {true if subject equal reference}
   */
  function equalDeep (reference) {
    return function (subject) {
      return deepEqual(reference, subject)
    }
  }
})()

