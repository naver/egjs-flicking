var arrayify = require('array-back')
var util = require('util')
var handlebars = require('handlebars')
var marked = require('marked')
var objectGet = require('object-get')
var where = require('test-value').where
var flatten = require('reduce-flatten')
var state = require('../lib/state')

/**
 * ddata is a collection of handlebars helpers for working with the documentation data output by [jsdoc-parse](https://github.com/75lb/jsdoc-parse).
 * @module
 * @example
 * ```js
 * var handlebars = require("handlebars")
 * var ddata = require("ddata")
 * var docs = require("./docs.json") // jsdoc-parse output
 *
 * handlebars.registerHelper(ddata)
 * var template =
 * "{{#module name='yeah-module'}}\
 * The author of the module is: {{author}}.\
 * {{/module}}"
 * console.log(handlebars.compile(template)(docs))
 * ```
 */

/* utility block helpers */
exports.link = link
exports.returnSig2 = returnSig2
exports.sig = sig
exports.children = children
exports.indexChildren = indexChildren

exports.properties = properties
exports.constructors = constructors
exports.methods = methods
exports.events = events

/* helpers which return objects */
exports._link = _link

/* helpers which return booleans */
exports.isClass = isClass
exports.isClassMember = isClassMember
exports.isConstructor = isConstructor
exports.isFunction = isFunction
exports.isConstant = isConstant
exports.isEvent = isEvent
exports.isEnum = isEnum
exports.isTypedef = isTypedef
exports.isCallback = isCallback
exports.isModule = isModule
exports.isMixin = isMixin
exports.isExternal = isExternal
exports.isPrivate = isPrivate
exports.isProtected = isProtected
exports.showMainIndex = showMainIndex

/* helpers which return lists */
exports._orphans = _orphans
exports._identifiers = _identifiers
exports._children = _children
exports._globals = _globals
exports.descendants = descendants

/* helpers which return single identifiers */
exports.exported = exported
exports.parentObject = parentObject
exports._identifier = _identifier

/* helpers which return strings */
exports.anchorName = anchorName
exports.md = md
exports.md2 = md2
exports.methodSig = methodSig
exports.parseLink = parseLink
exports.parentName = parentName
exports.option = option
exports.optionEquals = optionEquals
exports.optionSet = optionSet
exports.optionIsSet = optionIsSet
exports.stripNewlines = stripNewlines

/* helpers which keep state */
exports.headingDepth = headingDepth
exports.depth = depth
exports.depthIncrement = depthIncrement
exports.depthDecrement = depthDecrement
exports.indexDepth = indexDepth
exports.indexDepthIncrement = indexDepthIncrement
exports.indexDepthDecrement = indexDepthDecrement

/**
 * omits externals without a description
 * @static
 */
function _globals (options) {
  options.hash.scope = 'global'
  return _identifiers(options).filter(function (identifier) {
    if (identifier.kind === 'external') {
      return identifier.description && identifier.description.length > 0
    } else {
      return true
    }
  })
}

/**
 * This helper is a duplicate of the handlebars `each` helper with the one exception that `depthIncrement` is called on each iteration.
 * @category Block helper: selector
 */
function children (options) {
  var context = _children.call(this, options)
  var fn = options.fn
  var inverse = options.inverse
  var i = 0
  var ret = ''
  var data

  var contextPath

  if (options.data) {
    data = handlebars.createFrame(options.data)
  }

  for (var j = context.length; i < j; i++) {
    depthIncrement(options)
    if (data) {
      data.index = i
      data.first = (i === 0)
      data.last = (i === (context.length - 1))

      if (contextPath) {
        data.contextPath = contextPath + i
      }
    }
    ret = ret + fn(context[i], { data: data })
    depthDecrement(options)
  }

  if (i === 0) {
    ret = inverse(this)
  }

  return ret
}

/**
 * This helper is a duplicate of the handlebars `each` helper with the one exception that `indexDepthIncrement` is called on each iteration.
 * @static
 * @category Block helper: selector
 */
function indexChildren (options) {
  var context = _children.call(this, options)
  var fn = options.fn
  var inverse = options.inverse
  var i = 0
  var ret = ''
  var data

  var contextPath

  if (options.data) {
    data = handlebars.createFrame(options.data)
  }

  for (var j = context.length; i < j; i++) {
    indexDepthIncrement(options)
    if (data) {
      data.index = i
      data.first = (i === 0)
      data.last = (i === (context.length - 1))

      if (contextPath) {
        data.contextPath = contextPath + i
      }
    }
    ret = ret + fn(context[i], { data: data })
    indexDepthDecrement(options)
  }

  if (i === 0) {
    ret = inverse(this)
  }

  return ret
}

/**
 * @param id {string} - the ID to link to, e.g. `external:XMLHttpRequest`, `GlobalClass#propOne` etc.
 * @static
 * @category Block helper: util
 * @example
 * {{#link "module:someModule.property"~}}
 *   {{name}} {{!-- prints 'property' --}}
 *   {{url}}  {{!-- prints 'module-someModule-property' --}}
 * {{/link}}
 */
function link (longname, options) {
  return options.fn(_link(longname, options))
}

/**
 * e.g. namepaths `module:Something` or type expression `Array.<module:Something>`
 * @static
 * @param {string} - namepath or type expression
 * @param {object} - the handlebars helper options object
 */
function _link (input, options) {
  if (typeof input !== 'string') return null

  var linked, matches, namepath
  var output = {}

  /*
  test input for
  1. A type expression containing a namepath, e.g. Array.<module:Something>
  2. a namepath referencing an `id`
  3. a namepath referencing a `longname`
  */
  if ((matches = input.match(/.*?<(.*?)>/))) {
    namepath = matches[1]
  } else {
    namepath = input
  }

  options.hash = { id: namepath }
  linked = _identifier(options)
  if (!linked) {
    options.hash = { longname: namepath }
    linked = _identifier(options)
  }
  if (!linked) {
    output = { name: input, url: null }
  } else {
    output.name = input.replace(namepath, linked.name)
    if (isExternal.call(linked)) {
      if (linked.description) {
        output.url = '#' + anchorName.call(linked, options)
      } else {
        if (linked.see && linked.see.length) {
          var firstLink = parseLink(linked.see[0])[0]
          output.url = firstLink ? firstLink.url : linked.see[0]
        } else {
          output.url = null
        }
      }
    } else {
      output.url = '#' + anchorName.call(linked, options)
    }
  }
  return output
}

/**
@static
@returns {{symbol: string, types: array}}
@category Block helper: util
*/
function returnSig2 (options) {
  if (!isConstructor.call(this)) {
    if (this.returns) {
      var typeNames = arrayify(this.returns).map(function (ret) {
        return ret.type && ret.type.names
      })
      typeNames = typeNames.filter(function (name) {
        return name
      })
      if (typeNames.length) {
        return options.fn({
          symbol: '⇒',
          types: typeNames.reduce(flatten, [])
        })
      } else {
        return options.fn({
          symbol: null,
          types: null
        })
      }
    } else if ((this.type || this.kind === 'namespace') && this.kind !== 'event') {
      if (this.kind === 'namespace') {
        return options.fn({
          symbol: ':',
          types: ['object']
        })
      } else {
        return options.fn({
          symbol: ':',
          types: this.type.names
        })
      }
    }
  }
}

/**
@category Block helper: util
*/
function sig (options) {
  var data

  if (options.data) {
    data = handlebars.createFrame(options.data || {})
  }

  data.prefix = this.kind === 'constructor' ? 'new' : ''
  data.parent = null
  data.accessSymbol = null
  data.name = isEvent.call(this) ? '"' + this.name + '"' : this.name
  data.methodSign = null
  data.returnSymbol = null
  data.returnTypes = null
  data.suffix = this.isExported ? '⏏' : isPrivate.call(this) ? '℗' : ''
  data.depOpen = null
  data.depClose = null
  data.codeOpen = null
  data.codeClose = null

  var mSig = methodSig.call(this)
  if (isConstructor.call(this) || isFunction.call(this)) {
    data.methodSign = '(' + mSig + ')'
  } else if (isEvent.call(this)) {
    if (mSig) data.methodSign = '(' + mSig + ')'
  }

  if (!isEvent.call(this)) {
    data.parent = parentName.call(this, options)
    data.accessSymbol = (this.scope === 'static' || this.scope === 'instance') ? '' : this.scope === 'inner' ? '~' : ''
  }

  if (!isConstructor.call(this)) {
    if (this.returns) {
      data.returnSymbol = '⇒'
      var typeNames = arrayify(this.returns)
        .map(function (ret) {
          return ret.type && ret.type.names
        })
        .filter(function (name) {
          return name
        })
      if (typeNames.length) {
        data.returnTypes = typeNames.reduce(flatten, [])
      }
    } else if ((this.type || this.kind === 'namespace') && this.kind !== 'event') {
      data.returnSymbol = ':'

      if (isEnum.call(this)) {
        data.returnTypes = ['enum']
      } else if (this.kind === 'namespace') {
        data.returnTypes = ['object']
      } else {
        data.returnTypes = this.type.names
      }
    } else if (this.chainable) {
      data.returnSymbol = '↩︎'
    } else if (this.augments) {
      data.returnSymbol = '⇐'
      data.returnTypes = [this.augments[0]]
    }
  }

  if (this.deprecated) {
    if (optionEquals('no-gfm', true, options) || options.hash['no-gfm']) {
      data.depOpen = '<del>'
      data.depClose = '</del>'
    } else {
      data.depOpen = '~~'
      data.depClose = '~~'
    }
  }

  if (option('name-format', options) && !isClass.call(this) && !isModule.call(this)) {
    data.codeOpen = '`'
    data.codeClose = '`'
  }

  return options.fn(this, { data: data })
}

/**
@this {identifier}
@returns {boolean}
@alias module:ddata.isClass
*/
function isClass () { return this.kind === 'class' }

/**
returns true if the parent of the current identifier is a class
@returns {boolean}
@static
*/
function isClassMember (options) {
  var parent = arrayify(options.data.root).find(where({ id: this.memberof }))
  if (parent) {
    return parent.kind === 'class'
  }
}
function isConstructor () { return this.kind === 'constructor' }
function isFunction () { return this.kind === 'function' }
function isConstant () { return this.kind === 'constant' }
/**
returns true if this is an event
@returns {boolean}
@static
*/
function isEvent () { return this.kind === 'event' }
function isEnum () { return this.isEnum || this.kind === 'enum' }
function isExternal () { return this.kind === 'external' }
function isTypedef () {
  return this.kind === 'typedef' && this.type.names[0] !== 'function'
}
function isCallback () {
  return this.kind === 'typedef' && this.type.names[0] === 'function'
}
function isModule () { return this.kind === 'module' }
function isMixin () { return this.kind === 'mixin' }
function isPrivate () { return this.access === 'private' }
function isProtected () { return this.access === 'protected' }

/**
True if there at least two top-level identifiers (i.e. globals or modules)
@category returns boolean
@returns {boolean}
@static
*/
function showMainIndex (options) {
  return _orphans(options).length > 1
}

/**
 * Returns an array of the top-level elements which have no parents. Output only includes externals which have a description.
 * @returns {array}
 * @static
 * @category Returns list
 */
function _orphans (options) {
  options.hash.memberof = undefined
  return _identifiers(options).filter(function (identifier) {
    if (identifier.kind === 'external') {
      return identifier.description && identifier.description.length > 0
    } else {
      return true
    }
  })
}

/**
 * Returns an array of identifiers matching the query
 * @returns {array}
 * @static
 */
function _identifiers (options) {
  var query = {}

  for (var prop in options.hash) {
    if (/^-/.test(prop)) {
      query[prop.replace(/^-/, '!')] = options.hash[prop]
    } else if (/^_/.test(prop)) {
      query[prop.replace(/^_/, '')] = new RegExp(options.hash[prop])
    } else {
      query[prop] = options.hash[prop]
    }
  }
  return arrayify(options.data.root).filter(where(query)).filter(function (doclet) {
    return !doclet.ignore && (state.options.private ? true : doclet.access !== 'private')
  })
}

/**
return the identifiers which are a `memberof` this one. Exclude externals without descriptions.
@param [sortBy] {string} - "kind"
@param [min] {number} - only returns if there are `min` children
@this {identifier}
@returns {identifier[]}
@static
*/
function _children (options) {
  if (!this.id) return []
  var min = options.hash.min
  delete options.hash.min
  options.hash.memberof = this.id
  var output = _identifiers(options)
  output = output.filter(function (identifier) {
    if (identifier.kind === 'external') {
      return identifier.description && identifier.description.length > 0
    } else {
      return true
    }
  })
  if (output.length >= (min || 0)) return output
}

/**
return a flat list containing all decendants
@param [sortBy] {string} - "kind"
@param [min] {number} - only returns if there are `min` children
@this {identifier}
@returns {identifier[]}
@static
*/
function descendants (options) {
  var min = typeof options.hash.min !== 'undefined' ? options.hash.min : 2
  delete options.hash.min
  options.hash.memberof = this.id
  var output = []
  function iterate (childrenList) {
    if (childrenList.length) {
      childrenList.forEach(function (child) {
        output.push(child)
        iterate(_children.call(child, options))
      })
    }
  }
  iterate(_children.call(this, options))
  if (output.length >= (min || 0)) return output
}

/**
returns the exported identifier of this module
@this {identifier} - only works on a module
@returns {identifier}
@static
*/
function exported (options) {
  var exp = arrayify(options.data.root).find(where({ '!kind': 'module', id: this.id }))
  return exp || this
}

/**
Returns an identifier matching the query
@static
*/
function _identifier (options) {
  return _identifiers(options)[0]
}

/**
Returns the parent
@static
*/
function parentObject (options) {
  return arrayify(options.data.root).find(where({ id: this.memberof }))
}

/**
returns a unique ID string suitable for use as an `href`.
@this {identifier}
@returns {string}
@static
@category Returns string
@example
```js
> ddata.anchorName.call({ id: "module:yeah--Yeah()" })
'module_yeah--Yeah_new'
```
*/
function anchorName (options) {
  if (!this.id) throw new Error('[anchorName helper] cannot create a link without a id: ' + JSON.stringify(this))
  if (this.inherited) {
    options.hash.id = this.inherits
    var inherits = _identifier(options)
    if (inherits) {
      return anchorName.call(inherits, options)
    } else {
      return ''
    }
  }

  return util.format(
    '%s%s%s',
    this.isExported ? 'exp_' : '',
    this.kind === 'constructor' ? 'new_' : '',
    this.id
      .replace(/:/g, '_')
      .replace(/~/g, '..')
      .replace(/\(\)/g, '_new')
      .replace(/#/g, '+')
  )
}

/**
converts the supplied text to markdown
@static
@category Returns string
*/
function md (string, options) {
  if (string) {
    // var result = marked(string).replace('lang-js', 'language-javascript')
    // return result
    return string;
  }
}
function md2 (options) {
  // return marked.inlineLexer(options.fn(this).toString(), [])
  return options.fn(this).toString();
}

/**
Returns the method signature, e.g. `(options, [onComplete])`
@this {identifier}
@returns {string}
@category Returns string
@static
*/
function methodSig () {
  return arrayify(this.params).filter(function (param) {
    return param.name && !/\./.test(param.name)
  }).map(function (param) {
    if (param.variable) {
      return param.optional ? '[...' + param.name + ']' : '...' + param.name
    } else {
      return param.optional ? '[' + param.name + ']' : param.name
    }
  }).join(', ')
}

/**
 * extracts url and caption data from @link tags
 * @param {string} - a string containing one or more {@link} tags
 * @returns {Array.<{original: string, caption: string, url: string}>}
 * @static
 */
function parseLink (text) {
  if (!text) return ''
  var results = []
  var matches = null
  var link1 = /{@link\s+([^\s}|]+?)\s*}/g // {@link someSymbol}
  var link2 = /\[([^\]]+?)\]{@link\s+([^\s}|]+?)\s*}/g // [caption here]{@link someSymbol}
  var link3 = /{@link\s+([^\s}|]+?)\s*\|([^}]+?)}/g // {@link someSymbol|caption here}
  var link4 = /{@link\s+([^\s}|]+?)\s+([^}|]+?)}/g // {@link someSymbol Caption Here}

  while ((matches = link4.exec(text)) !== null) {
    results.push({
      original: matches[0],
      caption: matches[2],
      url: matches[1]
    })
    text = text.replace(matches[0], ' '.repeat(matches[0].length))
  }

  while ((matches = link3.exec(text)) !== null) {
    results.push({
      original: matches[0],
      caption: matches[2],
      url: matches[1]
    })
    text = text.replace(matches[0], ' '.repeat(matches[0].length))
  }

  while ((matches = link2.exec(text)) !== null) {
    results.push({
      original: matches[0],
      caption: matches[1],
      url: matches[2]
    })
    text = text.replace(matches[0], ' '.repeat(matches[0].length))
  }

  while ((matches = link1.exec(text)) !== null) {
    results.push({
      original: matches[0],
      caption: matches[1],
      url: matches[1]
    })
    text = text.replace(matches[0], ' '.repeat(matches[0].length))
  }
  return results
}

/**
returns the parent name, instantiated if necessary
@this {identifier}
@returns {string}
@static
*/
function parentName (options) {
  function instantiate (input) {
    if (/^[A-Z]{3}/.test(input)) {
      return input.replace(/^([A-Z]+)([A-Z])/, function (str, p1, p2) {
        return p1.toLowerCase() + p2
      })
    } else {
      return input.charAt(0).toLowerCase() + input.slice(1)
    }
  }

  /* don't bother with a parentName for exported identifiers */
  if (this.isExported) return ''

  if (this.memberof && this.kind !== 'constructor') {
    var parent = arrayify(options.data.root).find(where({ id: this.memberof }))
    if (parent) {
      if (this.scope === 'instance') {
        var name = parent.typicalname || parent.name
        return instantiate(name)
      } else if (this.scope === 'static' && !(parent.kind === 'class' || parent.kind === 'constructor')) {
        return parent.typicalname || parent.name
      } else {
        return parent.name
      }
    } else {
      return this.memberof
    }
  }
}

/**
 * This helper is a duplicate of the handlebars `each` helper with the one exception that `depthIncrement` is called on each iteration.
 * @category Block helper: selector
 */
function properties (options) {
  var context = _properties.call(this, options)
  return list.call(this, context, options);
}

function constructors (options) {
  var context = _constructors.call(this, options)
  return list.call(this, context, options);
}

function methods (options) {
  var context = _methods.call(this, options)
  return list.call(this, context, options);
}

function events (options) {
  var context = _events.call(this, options)
  return list.call(this, context, options);
}

function list(context, options) {
  var fn = options.fn
  var inverse = options.inverse
  var i = 0
  var ret = ''
  var data

  var contextPath

  if (options.data) {
    data = handlebars.createFrame(options.data)
  }

  for (var j = context.length; i < j; i++) {
    depthIncrement(options)
    if (data) {
      data.index = i
      data.first = (i === 0)
      data.last = (i === (context.length - 1))

      if (contextPath) {
        data.contextPath = contextPath + i
      }
    }
    ret = ret + fn(context[i], { data: data })
    depthDecrement(options)
  }

  if (i === 0) {
    ret = inverse(this)
  }

  return ret
}

function _properties (options) {
  if (!this.id) return []
  var min = options.hash.min
  delete options.hash.min
  options.hash.memberof = this.id
  var output = _identifiers(options)
  output = output.filter(function (identifier) {
    return identifier.kind === "member"
  })
  if (output.length >= (min || 0)) return output
}

function _constructors (options) {
  if (!this.id) return []
  var min = options.hash.min
  delete options.hash.min
  options.hash.memberof = this.id
  var output = _identifiers(options)
  output = output.filter(function (identifier) {
    return identifier.kind === "constructor"
  })
  if (output.length >= (min || 0)) return output
}

function _methods (options) {
  if (!this.id) return []
  var min = options.hash.min
  delete options.hash.min
  options.hash.memberof = this.id
  var output = _identifiers(options)
  output = output.filter(function (identifier) {
    return identifier.kind === "function"
  })
  if (output.length >= (min || 0)) return output
}

function _events (options) {
  if (!this.id) return []
  var min = options.hash.min
  delete options.hash.min
  options.hash.memberof = this.id
  var output = _identifiers(options)
  output = output.filter(function (identifier) {
    return identifier.kind === "event"
  })
  if (output.length >= (min || 0)) return output
}

/**
returns a dmd option, e.g. "sort-by", "heading-depth" etc.
@static
*/
function option (name, options) {
  return objectGet(options.data.root.options, name)
}

/**
@static
*/
function optionEquals (name, value, options) {
  return options.data.root.options[name] === value
}

/**
@static
*/
function optionSet (name, value, options) {
  options.data.root.options[name] = value
}

/**
@static
*/
function optionIsSet (name, options) {
  return options.data.root.options[name] !== undefined
}

/**
@static
*/
function stripNewlines (input) {
  if (input) return input.replace(/[\r\n]+/g, ' ')
}

/**
@static
*/
function headingDepth (options) {
  return options.data.root.options._depth + (options.data.root.options['heading-depth'])
}

/**
@static
*/
function depth (options) {
  return options.data.root.options._depth
}

/**
@static
*/
function depthIncrement (options) {
  options.data.root.options._depth++
}

/**
@static
*/
function depthDecrement (options) {
  options.data.root.options._depth--
}

/**
@static
*/
function indexDepth (options) {
  return options.data.root.options._indexDepth
}

/**
@static
*/
function indexDepthIncrement (options) {
  options.data.root.options._indexDepth++
}

/**
@static
*/
function indexDepthDecrement (options) {
  options.data.root.options._indexDepth--
}
