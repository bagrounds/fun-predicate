;(function () {
  'use strict'

  /* exports */
  module.exports = match

  /**
   *
   * @method module:fun-predicate.match
   *
   * @param {RegExp} regex to match against
   * @return {Function} function(subject) -> {true if subject matches regex}
   */
  function match (regex) {
    return function (subject) {
      return regex.test(subject)
    }
  }
})()

