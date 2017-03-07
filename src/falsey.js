;(function () {
  'use strict'

  /* exports */
  module.exports = falsey

  /**
   *
   * @method module:fun-predicate.falsey
   *
   * @return {Function} falsey(subject) -> {true if subject is falsey}
   */
  function falsey () {
    return function (subject) {
      return !subject
    }
  }
})()

