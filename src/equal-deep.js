;(function () {
  'use strict'

  /* imports */
  var deepEqual = require('deep-equal')

  /* exports */
  module.exports = equalDeep

  /**
   *
   * @method module:fun-predicate.equalDeep
   *
   * @param {*} reference - to compare against
   * @param {*} subject - to compare
   *
   * @return {Boolean} if subject === reference
   */
  function equalDeep (reference, subject) {
    return deepEqual(reference, subject)
  }
})()

