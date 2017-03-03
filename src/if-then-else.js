;(function () {
  'use strict'

  /* exports */
  module.exports = ifThenElse

  /**
   *
   * @function module:fun-predicate.ifThenElse
   *
   * @param {Function} predicate - subject -> Boolean
   * @param {Function} ifTrue - subject -> *
   * @param {Function} ifFalse - subject -> *
   */
  function ifThenElse (predicate, ifTrue, ifFalse) {
    return function (subject) {
      return predicate(subject) ? ifTrue(subject) : ifFalse(subject)
    }
  }
})()

