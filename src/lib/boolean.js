/**
 *
 * @module fun-boolean
 */
;(function () {
  'use strict'

  /* exports */
  module.exports = funBoolean
  module.exports.and = and
  module.exports.or = or
  module.exports.not = not
  module.exports.xor = xor
  module.exports.xnor = xnor
  module.exports.yes = yes
  module.exports.no = no

  function funBoolean (anything) {
    return !!anything
  }

  function and (a, b) {
    return a && b
  }

  function or (a, b) {
    return a || b
  }

  function not (b) {
    return !b
  }

  function xor (a, b) {
    return a !== b
  }

  function xnor (a, b) {
    return a === b
  }

  function yes () {
    return true
  }

  function no () {
    return false
  }
})()

