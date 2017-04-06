/**
 *
 * @module fun-curry
 */
;(function () {
  'use strict'

  /* imports */
  var stringifySafe = require('json-stringify-safe')

  /* exports */
  module.exports = curry

  function curry (f, arity, args) {
    arity = arity || f.length
    args = args || []

    return setProp('name', partialName(f, args),
      setProp('length', arity, function curried () {
        var newArgs = args.concat(Array.prototype.slice.call(arguments))

        return newArgs.length === arity
          ? f.apply(null, newArgs)
          : setProp(
            'length',
            arity - newArgs.length,
            curry(f, arity, newArgs)
          )
      })
    )
  }

  function partialName (f, args) {
    return f.name + '(' + args.map(x => stringify(x)).join(',') + ')'
  }

  function setProp (key, value, target) {
    return Object.defineProperty(target, key, { value: value })
  }

  function stringify (anything) {
    return stringifySafe(anything, function (key, value) {
      return (typeof value === 'function')
        ? '[' + (value.name || '=>') + ']'
        : value
    })
  }
})()

