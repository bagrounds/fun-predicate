;(function () {
  'use strict'

  /* exports */
  module.exports = throwsWith

  /**
   *
   * @method module:fun-predicate.throws
   *
   * @param {Array} inputs - to feed to function
   * @param {Function} f - to try with inputs
   *
   * @return {Boolean} if f(...inputs) throws
   */
  function throwsWith (inputs, f) {
    try {
      f.apply(null, inputs)

      return false
    } catch (error) {
      return true
    }
  }
})()

