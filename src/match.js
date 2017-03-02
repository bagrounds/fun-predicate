;(function () {
  'use strict'

  /* imports */
  var Predicate = require('./predicate')

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
    return Predicate({
      predicate: subject => regex.test(subject),
      toString: () => 'matches/' + regex.source + '/'
    })
  }
})()

