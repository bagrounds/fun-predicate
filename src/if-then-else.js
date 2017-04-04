;(function () {
  /* eslint max-params: "off" */
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
   * @param {*} subject - to apply to predicate, and resulting function
   *
   * @return {*} predicate(subject) ? ifTrue(subject) : ifFalse(subject)
   */
  function ifThenElse (predicate, ifTrue, ifFalse, subject) {
    return predicate(subject) ? ifTrue(subject) : ifFalse(subject)
  }
})()

