;(function () {
  'use strict'

  /* exports */
  module.exports = match

  /**
   *
   * @method module:fun-predicate.match
   *
   * @param {RegExp} regex - to match against
   * @param {String} subject - to test
   *
   * @return {Boolean} if subject matches regex
   */
  function match (regex, subject) {
    return regex.test(subject)
  }
})()

