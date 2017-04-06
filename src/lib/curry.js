/**
 *
 * @module fun-curry
 */
;(function () {
  'use strict'

  /* imports */
  var setProp = require('./set-prop')
  var nameFunction = require('./name-function')

  /* exports */
  module.exports = curry

  function curry (f, arity, args) {
    arity = arity || f.length
    args = args || []

    return setProp('name', nameFunction(f, args),
      setProp('length', arity, function curried () {
        var newArgs = args.concat(Array.prototype.slice.call(arguments))

        return newArgs.length >= arity
          ? f.apply(null, newArgs)
          : setProp(
            'length',
            arity - newArgs.length,
            curry(f, arity, newArgs)
          )
      })
    )
  }
})()

