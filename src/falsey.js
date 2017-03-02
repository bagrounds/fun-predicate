;(function () {
  'use strict'

  /* imports */
  var Predicate = require('./predicate')

  /* exports */
  module.exports = falsey

  /**
   *
   * @method module:fun-predicate.falsey
   *
   * @return {Function} falsey(subject) -> {true if subject is falsey}
   */
  function falsey () {
    return Predicate({
      predicate: subject => !subject,
      toString: () => 'isFalsey'
    })
  }
})()

