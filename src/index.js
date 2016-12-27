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

    var newPredicate = function (subject) {
      return me.evaluate(subject) && predicate.evaluate(subject)
    }

    var newName = '(' + me.evaluate.name + ') AND (' + predicate.evaluate.name +
      ')'

    newPredicate = setName(newPredicate, newName)

    return Predicate(newPredicate)
  }

  /**
   *
   * @param {Function} predicate function(subject) -> Boolean
   * @return {Function} thisOrPredicate(subject) -> Boolean
   */
  Predicate.prototype.or = function (predicate) {
    var me = this

    var newPredicate = function (subject) {
      return me.evaluate(subject) || predicate.evaluate(subject)
    }

    var newName = '(' + me.evaluate.name + ') OR (' + predicate.evaluate.name +
      ')'

    newPredicate = setName(newPredicate, newName)

    return Predicate(newPredicate)
  }

  /**
   *
   * @return {Function} notPredicate(subject) -> Boolean
   */
  Predicate.prototype.not = function () {
    var me = this

    var newPredicate = function (subject) {
      return !me.evaluate(subject)
    }

    var newName = 'NOT(' + me.evaluate.name + ')'

    newPredicate = setName(newPredicate, newName)

    return Predicate(newPredicate)
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

  function setName (aFunction, newName) {
    var description = {
      value: newName
    }

    return Object.defineProperty(aFunction, 'name', description)
  }
})()

