;(function () {
  'use strict'

  /* imports */
  var typeCheck = require('type-check').typeCheck
  var Predicate = require('./predicate')

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
    return Predicate({
      predicate: function (subject) {
        return typeCheck(type, subject)
      },
      toString: function () {
        return 'isA' + type
      }
    })
  }
})()

