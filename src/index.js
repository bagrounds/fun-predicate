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
;(() => {
  'use strict'

  /* imports */
  const { inputs, output } = require('guarded')
  const { any, bool, string, fun, regExp, arrayOf, tuple } = require('fun-type')
  const { fold, map, repeat } = require('fun-array')
  const typeCheck = require('type-check').typeCheck
  const deepEqual = require('deep-equal')
  const { not: bNot, xor: bXor, or: bOr, and: bAnd } = require('fun-boolean')
  const curry = require('fun-curry')
  const apply = require('fun-apply')
  const setProp = require('set-prop')
  const stringify = require('stringify-anything')
  const { map: oMap, ap: oAp } = require('fun-object')

  const compose = (f, g) => (...args) => f(apply(args, g))

  /**
   * Lift a function from Booleans to a function from predicates
   *
   * @param {Function} f - (b1, b2, ...) -> b
   *
   * @return {Function} ((-> b1), (-> b2), ...) -> (-> b)
   */
  const lift = f => curry(setProp('name', `lift(${stringify(f)})`,
    (...args) => {
      const fs = args.slice(0, f.length)

      return curry(setProp('name',
        `lift(${stringify(f)})(${fs.map(stringify).join(',')})`,
        (...args) => apply(fs.map(apply(args)), f)
      ),
      fs[0].length)
    }),
  f.length)

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
  const ifThenElse = (predicate, ifTrue, ifFalse, subject) =>
    predicate(subject) ? ifTrue(subject) : ifFalse(subject)

  /**
   *
   * @method module:fun-predicate.match
   *
   * @param {RegExp} regex - to match against
   * @param {String} subject - to test
   *
   * @return {Boolean} if subject matches regex
   */
  const match = (regex, subject) => regex.test(subject)

  /**
   *
   * @method module:fun-predicate.falsey
   *
   * @param {*} subject - to check for falsiness
   *
   * @return {Boolean} !subject
   */
  const falsey = subject => !subject

  /**
   *
   * @method module:fun-predicate.truthy
   *
   * @param {*} subject - to check for truthiness
   *
   * @return {Boolean} !!subject
   */
  const truthy = subject => !!subject

  /**
   *
   * @method module:fun-predicate.equal
   *
   * @param {*} reference - to compare against
   * @param {*} subject - to compare
   *
   * @return {Boolean} if subject === reference
   */
  const equal = (reference, subject) => subject === reference

  /**
   *
   * @method module:fun-predicate.equalDeep
   *
   * @param {*} reference - to compare against
   * @param {*} subject - to compare
   *
   * @return {Boolean} if subject === reference
   */
  const equalDeep = (reference, subject) => deepEqual(reference, subject)

  /**
   *
   * @method module:fun-predicate.throwsWith
   *
   * @param {Array} inputs - to feed to function
   * @param {Function} f - to try with inputs
   *
   * @return {Boolean} if f(...inputs) throws
   */
  const throwsWith = (inputs, f) => {
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
  const type = (type, subject) => typeCheck(type, subject)

  /**
   *
   * @method module:fun-predicate.t
   *
   * @return {Boolean} true
   */
  const t = () => true

  /**
   *
   * @method module:fun-predicate.f
   *
   * @return {Boolean} false
   */
  const f = () => false

  /**
   *
   * @method module:fun-predicate.not
   *
   * @param {Predicate} p - to compliment
   *
   * @return {Predicate} not(p)
   */
  const not = lift(bNot)

  /**
   *
   * @method module:fun-predicate.xnor
   *
   * @param {Predicate} p1 - to xnor
   * @param {Predicate} p2 - to xnor
   *
   * @return {Predicate} xnor(p1, p2)
   */
  const xnor = lift(equal)

  /**
   *
   * @method module:fun-predicate.xor
   *
   * @param {Predicate} p1 - to xor
   * @param {Predicate} p2 - to xor
   *
   * @return {Predicate} xor(p1, p2)
   */
  const xor = lift(bXor)

  /**
   *
   * @method module:fun-predicate.or
   *
   * @param {Predicate} p1 - to or
   * @param {Predicate} p2 - to or
   *
   * @return {Predicate} or(p1, p2)
   */
  const or = lift(bOr)

  /**
   *
   * @method module:fun-predicate.and
   *
   * @param {Predicate} p1 - to and
   * @param {Predicate} p2 - to and
   *
   * @return {Predicate} and(p1, p2)
   */
  const and = lift(bAnd)

  /**
   *
   * @method module:fun-predicate.implies
   *
   * @param {Predicate} p - premise
   * @param {Predicate} q - conclusion
   *
   * @return {Predicate} p => q
   */
  const implies = (p, q) => or(not(p), q)

  /**
   *
   * @method module:fun-predicate.all
   *
   * @param {Array<Function>} ps - predicates
   *
   * @return {Predicate} all(ps)
   */
  const all = fold(and, t)

  /**
   *
   * @method module:fun-predicate.some
   *
   * @param {Array<Function>} ps - predicates
   *
   * @return {Predicate} some(ps)
   */
  const some = fold(or, f)

  /**
   *
   * @method module:fun-predicate.none
   *
   * @param {Array<Function>} ps - predicates
   *
   * @return {Predicate} none(ps)
   */
  const none = compose(all, map(not))

  const api = { and, implies, or, xor, xnor, all, some, none, not, t, f, truthy,
    falsey, equal, equalDeep, type, match, throwsWith, ifThenElse }

  const nFuns = n => tuple(repeat(n, fun))

  const guards = {
    and: compose(output(fun), inputs(nFuns(2))),
    implies: compose(output(fun), inputs(nFuns(2))),
    or: compose(output(fun), inputs(nFuns(2))),
    xor: compose(output(fun), inputs(nFuns(2))),
    xnor: compose(output(fun), inputs(nFuns(2))),
    all: compose(output(fun), inputs(tuple([arrayOf(fun)]))),
    some: compose(output(fun), inputs(tuple([arrayOf(fun)]))),
    none: compose(output(fun), inputs(tuple([arrayOf(fun)]))),
    not: compose(output(fun), inputs(nFuns(1))),
    truthy: compose(output(bool), inputs(tuple([any]))),
    falsey: compose(output(bool), inputs(tuple([any]))),
    equal: compose(output(bool), inputs(tuple([any, any]))),
    equalDeep: compose(output(bool), inputs(tuple([any, any]))),
    type: compose(output(bool), inputs(tuple([string, any]))),
    match: compose(output(bool), inputs(tuple([regExp, string]))),
    throwsWith: compose(output(bool), inputs(tuple([arrayOf(any), fun]))),
    ifThenElse: inputs(tuple([fun, fun, fun, any]))
  }

  /* exports */
  module.exports = oMap(curry, oAp(guards, api))
})()

