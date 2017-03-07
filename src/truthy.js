;(function () {
  'use strict'

  /* exports */
  module.exports = truthy

  /**
   *
   * @method module:fun-predicate.truthy
   *
   * @return {Function} truthy(subject) -> {true if subject is truthy}
   */
  function truthy () {
    return function (subject) {
      return !!subject
    }
  }
})()

