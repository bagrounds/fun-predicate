;(function () {
  'use strict'

  /* imports */
  var stringify = require('stringify-anything')
  var predicate = require('./predicate')

  /* exports */
  module.exports = not

  /**
   *
   * @param {Function} p function(subject) -> Boolean
   * @return {Function} notPredicate(subject) -> Boolean
   */
  function not (p) {
    function compare (subject) {
      return !p(subject)
    }

    compare.toString = function toString () {
      return 'NOT(' + stringify(p) + ')'
    }

    return predicate({
      compare: compare
    })
  }
})()

