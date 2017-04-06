/**
 *
 * @module fun-curry
 */
;(function () {
  'use strict'

  /* imports */
  var R = require('ramda')
  var stringify = require('stringify-anything')

  /* exports */
  module.exports = curry

  function curry (f, arity, args) {
    arity = arity || f.length
    args = args || []

    return setProp('name', partialName(f, args),
      setProp('length', arity, function curried () {
        var newArgs = args.concat(Array.prototype.slice.call(arguments))

        return newArgs.length === arity
          ? R.apply(f, newArgs)
          : setProp(
            'length',
            arity - newArgs.length,
            curry(f, arity, newArgs)
          )
      })
    )
  }

  function partialName (f, args) {
    return stringify(f) + '(' + stringify(args) + ')'
  }

  function setProp (key, value, target) {
    return Object.defineProperty(target, key, { value: value })
  }
})()

