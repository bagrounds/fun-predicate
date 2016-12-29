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

    var evaluateAnd = function (subject) {
      return me.evaluate(subject) && predicate.evaluate(subject)
    }

    var predicateAnd = Predicate(evaluateAnd)

    predicateAnd.toString = toStringAnd(me, predicate)

    return predicateAnd
  }

  /**
   *
   * @param {Function} predicate function(subject) -> Boolean
   * @return {Function} thisOrPredicate(subject) -> Boolean
   */
  Predicate.prototype.or = function (predicate) {
    var me = this

    var evaluateOr = function (subject) {
      return me.evaluate(subject) || predicate.evaluate(subject)
    }

    var predicateOr = Predicate(evaluateOr)

    predicateOr.toString = toStringOr(me, predicate)

    return predicateOr
  }

  /**
   *
   * @return {Function} notPredicate(subject) -> Boolean
   */
  Predicate.prototype.not = function () {
    var me = this

    var evaluateNot = function (subject) {
      return !me.evaluate(subject)
    }

    var predicateNot = Predicate(evaluateNot)

    predicateNot.toString = toStringNot(me)

    return predicateNot
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
   * @param {*} subject to evaluate
   * @return {String} subject should predicateFunctionName
   */
  Predicate.prototype.toString = function toString (subject) {
    return subject + ' should ' + this.evaluate.name
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

  function toStringNot (a) {
    return function toString (subject) {
      return 'NOT(' + a.toString(subject) + ')'
    }
  }

  function toStringAnd (a, b) {
    return function toString (subject) {
      return '(' + a.toString(subject) + ' AND ' + b.toString(subject) + ')'
    }
  }

  function toStringOr (a, b) {
    return function toString (subject) {
      return '(' + a.toString(subject) + ' OR ' + b.toString(subject) + ')'
    }
  }
})()

