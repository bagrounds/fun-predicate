;(function () {
  'use strict'

  /* imports */
  var stringify = require('stringify-anything')

  /* exports */
  module.exports = Predicate

  const ifThenElse = module.exports.ifThenElse = (predicate, ifTrue, ifFalse) =>
    subject => predicate(subject) ? ifTrue(subject) : ifFalse(subject)

  const predicate = module.exports.predicate = {
    and: (p1, p2) => subject => p1(subject) && p2(subject),
    or: (p1, p2) => subject => p1(subject) || p2(subject),
    not: p => subject => !p(subject)
  }

  const toString = module.exports.toString = {
    and: (p1, p2) => () => '(' + p1() + ' AND ' + p2() + ')',
    or: (p1, p2) => () => '(' + p1() + ' OR ' + p2() + ')',
    not: p => () => 'NOT(' + p() + ')'
  }

  /**
   *
   * @constructor module:fun-predicate.Predicate
   *
   * @param {Object} options - all function parameters
   * @param {Function} options.predicate - subject -> Boolean
   * @param {Function} options.toString - () -> String
   */
  function Predicate (options) {
    if (!this) {
      return new Predicate(options)
    }

    this.predicate = options.predicate
    this.toString = options.toString
  }

  Predicate.prototype.and = function (p) {
    return Predicate({
      predicate: predicate.and(this.predicate, p.predicate),
      toString: toString.and(this.toString, p.toString)
    })
  }

  Predicate.prototype.or = function (p) {
    return Predicate({
      predicate: predicate.or(this.predicate, p.predicate),
      toString: toString.or(this.toString, p.toString)
    })
  }

  Predicate.prototype.not = function () {
    return Predicate({
      predicate: predicate.not(this.predicate),
      toString: toString.not(this.toString)
    })
  }

  Predicate.prototype.check = function (subject) {
    return this.predicate(subject)
  }

  Predicate.prototype.assert = function (subject) {
    if (!this.predicate(subject)) {
      throw new Error('Assert: ' + stringify(subject) + ' ' + this.toString())
    }

    return subject
  }

  Predicate.prototype.ifThenElse = function (ifTrue, ifFalse) {
    return ifThenElse(this.predicate, ifTrue, ifFalse)
  }
})()

