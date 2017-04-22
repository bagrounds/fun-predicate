/**
 *
 * @module fun-predicate
 */
;(function () {
  'use strict'

  /* imports */
  var curry = require('../lib/curry')
  var greaterThan = require('./greater-than')
  var lessThan = require('./less-than')

  /* exports */
  module.exports = {
    greaterThan: curry(greaterThan),
    lessThan: curry(lessThan)
  }
})()

