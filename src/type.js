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
   * @param {String} type - to specify
   * @param {*} subject - to check
   *
   * @return {Boolean} if subject has type
   */
  function type (type, subject) {
    return typeCheck(type, subject)
  }
})()

