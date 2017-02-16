;(function () {
  'use strict'

  /* imports */
  var predicate = require('./predicate')

  /* exports */
  module.exports = pass

  /**
   *
   * @method module:fun-predicate.pass
   *
   * @return {Function} pass(subject) -> true
   */
  function pass () {
    return predicate({
      compare: function pass () {
        return true
      }
    })
  }
})()

