;(function () {
  'use strict'

  /* imports */
  var typeCheck = require('type-check').typeCheck
  var predicate = require('./predicate')

  /* exports */
  module.exports = type

  /**
   *
   * @method module:fun-predicate.type
   *
   * @param {String} type to specify
   * @return {Function} function(subject) -> {true if subject is type type}
   */
  function type (type) {
    return predicate({
      reference: type,
      compare: function beType (subject, type) {
        return typeCheck(type, subject)
      }
    })
  }
})()

