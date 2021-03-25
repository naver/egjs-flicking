var handlebars = require('handlebars')
var ddata = require('./ddata')

exports.identifiers = identifiers
exports.identifier = identifier
exports.orphans = orphans
exports.globals = globals
exports.modules = modules
exports.module = module
exports.classes = classes
exports.class = class_
exports.functions = functions
exports.function = function_
exports.namespace = namespace
exports.enum = enum_
exports.misc = misc

/**
 * render the supplied block for each identifier in the query
 * @static
 */
function identifiers (options) {
  return handlebars.helpers.each(ddata._identifiers(options), options)
}

/**
 * render the supplied block for the specified identifier
 * @static
 */
function identifier (options) {
  var result = ddata._identifier(options)
  return result ? options.fn(result) : 'ERROR, Cannot find identifier.'
}

/**
 * render the supplied block for each parent (global identifier, or module)
 * @static
 */
function orphans (options) {
  return handlebars.helpers.each(ddata._orphans(options), options)
}

/**
 * render the supplied block for each identifier in global scope
 * @static
 */
function globals (options) {
  return handlebars.helpers.each(ddata._globals(options), options)
}

/**
 * render the supplied block for each module
 * @static
 */
function modules (options) {
  options.hash.kind = 'module'
  return handlebars.helpers.each(ddata._identifiers(options), options)
}

/**
 * render the supplied block for the specified module
 * @static
 */
function module (options) {
  options.hash.kind = 'module'
  var result = ddata._identifiers(options)[0]
  return result ? options.fn(result) : 'ERROR, Cannot find module.'
}

/**
 * render the block for each class
 * @static
 */
function classes (options) {
  options.hash.kind = 'class'
  return handlebars.helpers.each(ddata._identifiers(options), options)
}

/**
 * render the supplied block for the specified class
 */
function class_ (options) {
  options.hash.kind = 'class'
  var result = ddata._identifier(options)
  return result ? options.fn(result) : 'ERROR, Cannot find class.'
}

/**
 * render the block for each function/method
 * @static
 */
function functions (options) {
  options.hash.kind = 'function'
  return handlebars.helpers.each(ddata._identifiers(options), options)
}

/**
 * render the supplied block for the specified function
 */
function function_ (options) {
  options.hash.kind = 'function'
  var result = ddata._identifier(options)
  return result ? options.fn(result) : 'ERROR, Cannot find function.'
}

/**
 * render the supplied block for the specified function
 */
function namespace (options) {
  options.hash.kind = 'namespace'
  var result = ddata._identifier(options)
  return result ? options.fn(result) : 'ERROR, Cannot find namespace.'
}

/**
 * render the supplied block for the specified enum
 */
function enum_ (options) {
  options.hash.kind = 'enum'
  var result = ddata._identifier(options)
  return result ? options.fn(result) : 'ERROR, Cannot find enum.'
}

/**
 * render the supplied block for each orphan with no scope set
 * @static
 */
function misc (options) {
  options.hash.scope = undefined
  options.hash['!kind'] = /module|constructor|external/
  options.hash['!isExported'] = true
  return handlebars.helpers.each(ddata._identifiers(options), options)
}
