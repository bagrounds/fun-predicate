;(function () {
  'use strict'

  /* imports */
  var funAssert = require('fun-assert')
  var stringify = require('stringify-anything')
  var specifier = require('specifier')

  /* exports */
  module.exports = predicate
  module.exports.and = and
  module.exports.or = or
  module.exports.not = not
  module.exports.truthy = truthy()

  var isFunction = funAssert.type('Function')

  var optionsSpec = {
    compare: [
      isFunction
    ]
  }

  var optionsChecker = specifier(optionsSpec)

  /**
   *
   * @param {Object} options all function parameters
   * @param {*} [options.reference] to compare subject with
   * @param {Function} options.compare function(subject, reference) -> Boolean
   * @return {Function} predicate(subject) -> Boolean
   */
  function predicate (options) {
    options = optionsChecker(options)

    function result (subject) {
      return options.compare(subject, options.reference)
    }

    result.toString = function toString () {
      var description = stringify(options.compare)

      if (options.reference) {
        description += ' ' + stringify(options.reference)
      }

      return description
    }

    return result
  }

  /**
   *
   * @param {Function} p1 function(subject) -> Boolean
   * @param {Function} p2 function(subject) -> Boolean
   * @return {Function} thisAndPredicate(subject) -> Boolean
   */
  function and (p1, p2) {
    function predicateAnd (subject) {
      return p1(subject) && p2(subject)
    }

    predicateAnd.toString = function toString () {
      return '(' + stringify(p1) + ' AND ' + stringify(p2) + ')'
    }

    return predicateAnd
  }

  /**
   *
   * @param {Function} p1 function(subject) -> Boolean
   * @param {Function} p2 function(subject) -> Boolean
   * @return {Function} thisOrPredicate(subject) -> Boolean
   */
  function or (p1, p2) {
    function predicateOr (subject) {
      return p1(subject) || p2(subject)
    }

    predicateOr.toString = function toString () {
      return '(' + stringify(p1) + ' OR ' + stringify(p2) + ')'
    }

    return predicateOr
  }

  /**
   *
   * @param {Function} predicate function(subject) -> Boolean
   * @return {Function} notPredicate(subject) -> Boolean
   */
  function not (predicate) {
    var predicateNot = function (subject) {
      return !predicate(subject)
    }

    predicateNot.toString = function toString () {
      return 'NOT(' + stringify(predicate) + ')'
    }

    return predicateNot
  }

  /**
   *
   * @return {Function} truthy(subject) -> {true if subject is truthy}
   */
  function truthy () {
    var predicate = function (subject) {
      return !!subject
    }

    predicate.toString = function toString () {
      return 'beTruthy'
    }

    return predicate
  }
})()

