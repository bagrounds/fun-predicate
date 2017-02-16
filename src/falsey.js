;(function () {
  'use strict'

  /* imports */
  var predicate = require('./predicate')

  /* exports */
  module.exports = falsey

  /**
   *
   * @method module:fun-predicate.falsey
   *
   * @return {Function} falsey(subject) -> {true if subject is falsey}
   */
  function falsey () {
    return predicate({
      compare: function beFalsey (subject) {
        return !subject
      }
    })
  }
})()

