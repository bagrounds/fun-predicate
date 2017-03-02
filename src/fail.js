;(function () {
  'use strict'

  /* imports */
  var Predicate = require('./predicate')

  /* exports */
  module.exports = fail

  /**
   *
   * @method module:fun-predicate.fail
   *
   * @return {Function} fail(subject) -> false
   */
  function fail () {
    return Predicate({
      predicate: () => false,
      toString: () => 'willFail'
    })
  }
})()

