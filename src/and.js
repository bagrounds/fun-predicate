;(function () {
  'use strict'

  /* imports */
  var stringify = require('stringify-anything')
  var predicate = require('./predicate')

  /* exports */
  module.exports = and

  /**
   *
   * @param {Function} p1 function(subject) -> Boolean
   * @param {Function} p2 function(subject) -> Boolean
   * @return {Function} thisAndPredicate(subject) -> Boolean
   */
  function and (p1, p2) {
    function compare (subject) {
      return p1(subject) && p2(subject)
    }

    compare.toString = function toString () {
      return '(' + stringify(p1) + ' AND ' + stringify(p2) + ')'
    }

    return predicate({
      compare: compare
    })
  }
})()

