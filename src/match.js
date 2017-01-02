;(function () {
  'use strict'

  /* imports */
  var predicate = require('./predicate')

  /* exports */
  module.exports = match

  /**
   *
   * @param {RegExp} regex to match against
   * @return {Function} function(subject) -> {true if subject matches regex}
   */
  function match (regex) {
    return predicate({
      reference: regex,
      compare: function match (subject, regex) {
        return regex.test(subject)
      }
    })
  }
})()

