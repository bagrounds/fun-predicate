;(function () {
  'use strict'

  /* imports */
  var Predicate = require('./predicate')

  /* exports */
  module.exports = pass

  /**
   *
   * @method module:fun-predicate.pass
   *
   * @return {Function} pass(subject) -> true
   */
  function pass () {
    return Predicate({
      predicate: () => true,
      toString: () => 'willPass'
    })
  }
})()

