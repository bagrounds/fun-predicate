;(function () {
  'use strict'

  /* exports */
  module.exports = greaterThan

  /**
   *
   * @method module:fun-predicate.greaterThan
   *
   * @param {Number} reference - to compare against
   * @param {Number} subject - to compare
   *
   * @return {Boolean} if subject > reference
   */
  function greaterThan (reference, subject) {
    return subject > reference
  }
})()

