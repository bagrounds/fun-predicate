/**
 *
 * @module fun-curry
 */
;(function () {
  'use strict'

  /* imports */
  var stringify = require('./stringify')

  /* exports */
  module.exports = nameFunction

  function nameFunction (f, args) {
    return f.name + '(' + args.map(x => stringify(x)).join(',') + ')'
  }
})()

