;(function () {
  'use strict'

  /* imports */
  var Predicate = require('./predicate')

  /* exports */
  module.exports = truthy

  /**
   *
   * @method module:fun-predicate.truthy
   *
   * @return {Function} truthy(subject) -> {true if subject is truthy}
   */
  function truthy () {
    return Predicate({
      predicate: subject => !!subject,
      toString: () => 'isTruthy'
    })
  }
})()

