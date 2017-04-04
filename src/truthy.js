;(function () {
  'use strict'

  /* exports */
  module.exports = truthy

  /**
   *
   * @method module:fun-predicate.truthy
   *
   * @param {Boolean} bool - truthiness value
   *
   * @return {Function} truthy(subject) -> {true if subject is truthy}
   */
  function truthy (bool) {
    return function (subject) {
      return !!subject === bool
    }
  }
})()

