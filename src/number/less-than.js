;(function () {
  'use strict'

  /* exports */
  module.exports = lessThan

  /**
   *
   * @method module:fun-predicate.lessThan
   *
   * @param {Number} reference - to compare against
   * @param {Number} subject - to compare
   *
   * @return {Boolean} if subject < reference
   */
  function lessThan (reference, subject) {
    return subject < reference
  }
})()

