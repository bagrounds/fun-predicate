;(function () {
  'use strict'

  /* imports*/
  var apply = require('fun-apply')

  /* exports */
  module.exports = throwsWith

  /**
   *
   * @method module:fun-predicate.throws
   *
   * @param {Array} inputs - to feed to function
   * @return {Function} function(input) -> {true if f throws on input}
   */
  function throwsWith (inputs) {
    return function (f) {
      try {
        apply(f, inputs)
      } catch (error) {
        return true
      }

      return false
    }
  }
})()

