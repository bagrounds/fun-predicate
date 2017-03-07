;(function () {
  'use strict'

  /* exports */
  module.exports = equal

  /**
   *
   * @method module:fun-predicate.equal
   *
   * @param {*} reference to compare for equality
   * @return {Function} equal(subject) -> {true if subject equal reference}
   */
  function equal (reference) {
    return function (subject) {
      return subject === reference
    }
  }
})()

