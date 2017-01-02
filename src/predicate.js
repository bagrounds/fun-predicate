;(function () {
  'use strict'

  /* imports */
  var stringify = require('stringify-anything')
  var optionsChecker = require('./spec-options-predicate')

  /* exports */
  module.exports = predicate

  /**
   *
   * @function module:fun-predicate.predicate
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
})()

