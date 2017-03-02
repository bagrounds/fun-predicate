/**
 *
 * @module fun-predicate
 */
;(function () {
  'use strict'

  /* imports */
  var Predicate = require('./predicate')
  var truthy = require('./truthy')
  var falsey = require('./falsey')
  var equal = require('./equal')
  var type = require('./type')
  var match = require('./match')
  var fail = require('./fail')
  var pass = require('./pass')

  /* exports */
  module.exports = Predicate
  module.exports.truthy = truthy
  module.exports.falsey = falsey
  module.exports.equal = equal
  module.exports.type = type
  module.exports.match = match
  module.exports.fail = fail
  module.exports.pass = pass
})()

