/**
 * A function that returns a Boolean
 *
 * @typedef {Function} Predicate
 */

/**
 *
 *
 * @module fun-predicate
 */
;(function () {
  'use strict'

  /* imports */
  var typeCheck = require('type-check').typeCheck
  var deepEqual = require('deep-equal')
  var bool = require('fun-boolean')
  var curry = require('fun-curry')
  var apply = require('fun-apply')
  var setProp = require('set-prop')
  var stringify = require('stringify-anything')

  /* exports */
  module.exports = {
    and: curry(and),
    or: curry(or),
    xor: curry(xor),
    xnor: curry(xnor),
    not: curry(not),
    t: t,
    f: f,
    truthy: truthy,
    falsey: falsey,
    equal: curry(equal),
    equalDeep: curry(equalDeep),
    type: curry(type),
    match: curry(match),
    throwsWith: curry(throwsWith),
    ifThenElse: curry(ifThenElse)
  }

  /**
   *
   * @function module:fun-predicate.ifThenElse
   *
   * @param {Predicate} predicate - subject -> Boolean
   * @param {Function} ifTrue - subject -> *
   * @param {Function} ifFalse - subject -> *
   * @param {*} subject - to apply to predicate, and resulting function
   *
   * @return {*} predicate(subject) ? ifTrue(subject) : ifFalse(subject)
   */ // eslint-disable-next-line max-params
  function ifThenElse (predicate, ifTrue, ifFalse, subject) {
    return predicate(subject) ? ifTrue(subject) : ifFalse(subject)
  }

  /**
   *
   * @method module:fun-predicate.match
   *
   * @param {RegExp} regex - to match against
   * @param {String} subject - to test
   *
   * @return {Boolean} if subject matches regex
   */
  function match (regex, subject) {
    return regex.test(subject)
  }

  /**
   *
   * @method module:fun-predicate.falsey
   *
   * @param {*} subject - to check for falsiness
   *
   * @return {Boolean} !subject
   */
  function falsey (subject) {
    return !subject
  }

  /**
   *
   * @method module:fun-predicate.truthy
   *
   * @param {*} subject - to check for truthiness
   *
   * @return {Boolean} !!subject
   */
  function truthy (subject) {
    return !!subject
  }

  /**
   *
   * @method module:fun-predicate.equal
   *
   * @param {*} reference - to compare against
   * @param {*} subject - to compare
   *
   * @return {Boolean} if subject === reference
   */
  function equal (reference, subject) {
    return subject === reference
  }

  /**
   *
   * @method module:fun-predicate.equalDeep
   *
   * @param {*} reference - to compare against
   * @param {*} subject - to compare
   *
   * @return {Boolean} if subject === reference
   */
  function equalDeep (reference, subject) {
    return deepEqual(reference, subject)
  }

  /**
   *
   * @method module:fun-predicate.throwsWith
   *
   * @param {Array} inputs - to feed to function
   * @param {Function} f - to try with inputs
   *
   * @return {Boolean} if f(...inputs) throws
   */
  function throwsWith (inputs, f) {
    try {
      f.apply(null, inputs)

      return false
    } catch (error) {
      return true
    }
  }

  /**
   *
   * @method module:fun-predicate.type
   *
   * @param {String} type - to specify
   * @param {*} subject - to check
   *
   * @return {Boolean} if subject has type
   */
  function type (type, subject) {
    return typeCheck(type, subject)
  }

  /**
   *
   * @method module:fun-predicate.t
   *
   * @return {Boolean} true
   */
  function t () {
    return true
  }

  /**
   *
   * @method module:fun-predicate.f
   *
   * @return {Boolean} false
   */
  function f () {
    return false
  }

  /**
   *
   * @method module:fun-predicate.not
   *
   * @param {Predicate} p - to compliment
   *
   * @return {Predicate} not(p)
   */
  function not (p) {
    return lift(bool.not)(p)
  }

  /**
   *
   * @method module:fun-predicate.xnor
   *
   * @param {Predicate} p1 - to xnor
   * @param {Predicate} p2 - to xnor
   *
   * @return {Predicate} xnor(p1, p2)
   */
  function xnor (p1, p2) {
    return lift(bool.equal)(p1, p2)
  }

  /**
   *
   * @method module:fun-predicate.xor
   *
   * @param {Predicate} p1 - to xor
   * @param {Predicate} p2 - to xor
   *
   * @return {Predicate} xor(p1, p2)
   */
  function xor (p1, p2) {
    return lift(bool.xor)(p1, p2)
  }

  /**
   *
   * @method module:fun-predicate.or
   *
   * @param {Predicate} p1 - to or
   * @param {Predicate} p2 - to or
   *
   * @return {Predicate} or(p1, p2)
   */
  function or (p1, p2) {
    return lift(bool.or)(p1, p2)
  }

  /**
   *
   * @method module:fun-predicate.and
   *
   * @param {Predicate} p1 - to and
   * @param {Predicate} p2 - to and
   *
   * @return {Predicate} and(p1, p2)
   */
  function and (p1, p2) {
    return lift(bool.and)(p1, p2)
  }

  /**
   * Lift a function from Booleans to a function from predicates
   *
   * @param {Function} f - (b1, b2, ...) -> b
   *
   * @return {Function} ((-> b1), (-> b2), ...) -> (-> b)
   */
  function lift (f) {
    return curry(setProp('name', 'lift(' + stringify(f) + ')', function () {
      var fs = Array.prototype.slice.call(arguments, 0, f.length)

      var n = 'lift(' + stringify(f) + ')(' + fs.map(stringify).join(',') + ')'

      return curry(setProp('name', n, function () {
        var args = Array.prototype.slice.call(arguments)

        return apply(fs.map(apply(args)), f)
      }), fs[0].length)
    }), f.length)
  }
})()

