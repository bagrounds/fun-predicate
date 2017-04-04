;(function () {
  'use strict'

  /* exports */
  module.exports = truthy

  /**
   *
   * @method module:fun-predicate.truthy
   *
   * @param {Boolean} bool - truthiness value
   * @param {*} subject - to check
   *
   * @return {Boolean} if !!subject === bool
   */
  function truthy (bool, subject) {
    return !!subject === bool
  }
})()

