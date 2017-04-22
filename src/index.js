/**
 *
 * @module fun-predicate
 */
;(function () {
  'use strict'

  /* imports */
  var bool = require('./lib/boolean')
  var curry = require('./lib/curry')
  var setProp = require('./lib/set-prop')
  var nameFunction = require('./lib/name-function')

  var truthy = require('./truthy')
  var equal = require('./equal')
  var equalDeep = require('./equal-deep')
  var type = require('./type')
  var match = require('./match')
  var throwsWith = require('./throws-with')
  var ifThenElse = require('./if-then-else')
  var number = require('./number')

  /* exports */
  module.exports = predicate
  module.exports.truthy = curry(truthy)
  module.exports.equal = curry(equal)
  module.exports.equalDeep = curry(equalDeep)
  module.exports.type = curry(type)
  module.exports.match = curry(match)
  module.exports.throwsWith = curry(throwsWith)
  module.exports.ifThenElse = curry(ifThenElse)
  module.exports.no = predicate(bool.no)
  module.exports.yes = predicate(bool.yes)
  module.exports.and = predicate(bool.and)
  module.exports.or = predicate(bool.or)
  module.exports.not = predicate(bool.not)
  module.exports.number = number

  /**
   *
   * @function module:fun-predicate.predicate
   *
   * @param {Function} f - (b1, b2, ..., bn) -> b
   * @return {Function} (s -> b1, s -> b2, ..., s -> bn) -> (s -> b)
   */
  function predicate (f) {
    return setProp('name', f.name, function () {
      var ps = Array.prototype.slice.call(arguments, 0, f.length)

      return setProp('name', nameFunction(f, ps), function (subject) {
        return f.apply(null, ps.map(function (p) {
          return p(subject)
        }))
      })
    })
  }
})()

