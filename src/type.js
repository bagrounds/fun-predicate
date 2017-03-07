;(function () {
  'use strict'

  /* imports */
  var typeCheck = require('type-check').typeCheck

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
    return function (subject) {
      return typeCheck(type, subject)
    }
  }
})()

