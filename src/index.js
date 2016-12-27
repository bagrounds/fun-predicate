;(function () {
  'use strict'

  /* exports */
  module.exports = Predicate

  /**
   *
   * @param {Function} evaluate function(subject) -> Boolean
   * @return {Object} instance of Predicate
   */
  function Predicate (evaluate) {
    if (!this) {
      return new Predicate(evaluate)
    } else {
      this.evaluate = evaluate
    }
  }

  /**
   *
   * @param {Function} predicate function(subject) -> Boolean
   * @return {Function} thisAndPredicate(subject) -> Boolean
   */
  Predicate.prototype.and = function (predicate) {
    var me = this

    return Predicate(function (subject) {
      return me.evaluate(subject) && predicate.evaluate(subject)
    })
  }

  /**
   *
   * @param {Function} predicate function(subject) -> Boolean
   * @return {Function} thisOrPredicate(subject) -> Boolean
   */
  Predicate.prototype.or = function (predicate) {
    var me = this

    return Predicate(function (subject) {
      return me.evaluate(subject) || predicate.evaluate(subject)
    })
  }

  /**
   *
   * @return {Function} notPredicate(subject) -> Boolean
   */
  Predicate.prototype.not = function () {
    var me = this

    return Predicate(function (subject) {
      return !me.evaluate(subject)
    })
  }

  /**
   *
   * @return {Function} notPredicate(subject) -> Boolean
   */
  Predicate.prototype.same = function () {
    return this
  }

  /**
   *
   * @return {Boolean} true
   */
  Predicate.yes = function () {
    return true
  }

  /**
   *
   * @return {Boolean} false
   */
  Predicate.no = function () {
    return false
  }
})()

