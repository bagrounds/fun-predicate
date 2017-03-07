/**
 *
 * @module fun-predicate
 */
;(function () {
  'use strict'

  /* imports */
  var bool = require('fun-boolean')
  var truthy = require('./truthy')
  var falsey = require('./falsey')
  var equal = require('./equal')
  var equalDeep = require('./equal-deep')
  var type = require('./type')
  var match = require('./match')
  var throws = require('./throws')
  var ifThenElse = require('./if-then-else')

  /* exports */
  module.exports = predicate
  module.exports.truthy = truthy
  module.exports.falsey = falsey
  module.exports.equal = equal
  module.exports.equalDeep = equalDeep
  module.exports.type = type
  module.exports.match = match
  module.exports.throws = throws
  module.exports.ifThenElse = ifThenElse
  module.exports.no = predicate(bool.no)
  module.exports.yes = predicate(bool.yes)
  module.exports.and = predicate(bool.and)
  module.exports.or = predicate(bool.or)
  module.exports.not = predicate(bool.not)

  /**
   *
   * @function module:fun-predicate.predicate
   *
   * @param {Function} f - (b1, b2, ..., bn) -> b
   * @return {Function} (s -> b1, s -> b2, ..., s -> bn) -> (s -> b)
   */
  function predicate (f) {
    return function () {
      var ps = Array.prototype.slice.call(arguments, 0, f.length)

      return function (subject) {
        return f.apply(null, ps.map(function (p) {
          return p(subject)
        }))
      }
    }
  }
})()

