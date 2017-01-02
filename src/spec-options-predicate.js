;(function () {
  'use strict'

  /* imports */
  var stringify = require('stringify-anything')
  var specifier = require('specifier')

  var isFunction = function (something) {
    if (typeof something !== 'function') {
      throw new Error(stringify(something) + ' should be a function')
    }

    return something
  }

  var optionsSpec = {
    compare: [
      isFunction
    ]
  }

  /* exports */
  module.exports = specifier(optionsSpec)
})()

