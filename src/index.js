/**
 *
 * @module fun-predicate
 */
;(function () {
  'use strict'

  /* imports */
  var predicate = require('./predicate')
  var and = require('./and')
  var or = require('./or')
  var not = require('./not')
  var truthy = require('./truthy')
  var falsey = require('./falsey')
  var equal = require('./equal')
  var type = require('./type')
  var match = require('./match')
  var fold = require('./fold')
  var fail = require('./fail')
  var pass = require('./pass')

  /* exports */
  module.exports = predicate
  module.exports.and = and
  module.exports.or = or
  module.exports.not = not
  module.exports.truthy = truthy
  module.exports.falsey = falsey
  module.exports.equal = equal
  module.exports.type = type
  module.exports.match = match
  module.exports.fold = fold
  module.exports.fail = fail
  module.exports.pass = pass
})()

