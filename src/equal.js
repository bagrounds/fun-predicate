;(function () {
  'use strict'

  /* exports */
  module.exports = equal

  /**
   *
   * @method module:fun-predicate.equal
   *
   * @param {*} reference - to compare against
   * @param {*} subject - to compare
   *
   * @return {Boolean} if subject === reference
   */
  function equal (reference, subject) {
    return subject === reference
  }
})()

