;(function () {
  'use strict'

  /* exports */
  module.exports = throws

  /**
   *
   * @method module:fun-predicate.throws
   *
   * @param {Function} f - function to check
   * @return {Function} function(input) -> {true if f throws on input}
   */
  function throws (f) {
    return function (input) {
      try {
        f(input)
      } catch (error) {
        return true
      }

      return false
    }
  }
})()

