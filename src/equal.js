;(function () {
  'use strict'

  /* imports */
  var stringify = require('stringify-anything')
  var deepEqual = require('deep-equal')
  var typeCheck = require('type-check').typeCheck
  var Predicate = require('./predicate')

  /* exports */
  module.exports = equal

  /**
   *
   * @method module:fun-predicate.equal
   *
   * @param {*} reference to compare for equality
   * @return {Function} equal(subject) -> {true if subject equal reference}
   */
  function equal (reference) {
    return Predicate({
      predicate: Predicate.ifThenElse(
        subject => typeCheck('Object|Array', reference),
        subject => deepEqual(reference, subject),
        subject => reference === subject
      ),
      toString: () => 'equals' + stringify(reference)
    })
  }
})()

