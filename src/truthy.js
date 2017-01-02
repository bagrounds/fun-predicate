;(function () {
  'use strict'

  /* imports */
  var predicate = require('./predicate')

  /* exports */
  module.exports = truthy()

  /**
   *
   * @return {Function} truthy(subject) -> {true if subject is truthy}
   */
  function truthy () {
    return predicate({
      compare: function beTruthy (subject) {
        return !!subject
      }
    })
  }
})()

