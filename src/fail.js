;(function () {
  'use strict'

  /* imports */
  var predicate = require('./predicate')

  /* exports */
  module.exports = fail

  /**
   *
   * @method module:fun-predicate.fail
   *
   * @return {Function} fail(subject) -> false
   */
  function fail () {
    return predicate({
      compare: function fail () {
        return false
      }
    })
  }
})()

