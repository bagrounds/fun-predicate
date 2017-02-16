;(function () {
  'use strict'

  /* imports */
  var typeCheck = require('type-check').typeCheck

  /* exports */
  module.exports = fold

  /**
   *
   * @method module:fun-predicate.fold
   *
   * @param {Function} id - neutral predicate
   * @param {Function} combine - binary operator over predicates
   * @param {Object|Array} collection - of predicates
   * @return {Function} function(subject) -> {true if subject matches regex}
   */
  function fold (id, combine, collection) {
    return predicates(collection).reduce(function (result, key) {
      return combine(result, key)
    }, id)
  }

  function predicates (collection) {
    if (!typeCheck('Array', collection)) {
      return Object.keys(collection).map(function (key) {
        return collection[key]
      })
    }

    return collection
  }
})()

