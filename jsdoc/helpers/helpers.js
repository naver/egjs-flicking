var ddata = require('./ddata')
var arrayify = require('array-back')
var handlebars = require('handlebars')
var util = require('util')
var commonSequence = require('common-sequence')
var unique = require('reduce-unique')
var without = require('reduce-without')

/**
A library of helpers used exclusively by dmd.. dmd also registers helpers from ddata.
@module
*/
exports.escape = escape
exports.inlineLinks = inlineLinks
exports.tableHead = tableHead
exports.tableHeadHtml = tableHeadHtml
exports.tableRow = tableRow
exports.deprecated = deprecated
exports.groupBy = groupBy
exports._groupBy = _groupBy
exports._addGroup = _addGroup
exports.add = add
exports.kindInThisContext = kindInThisContext
exports.titleCase = titleCase
exports.parseType = parseType
exports.params = params
exports.examples = examples
exports.setLevel = setLevel
exports['string-repeat'] = stringRepeat
exports['regexp-test'] = regexpTest
exports.equal = equal
exports['json-stringify'] = JSON.stringify

/**
Escape special markdown characters
*/
function escape (input) {
  if (typeof input !== 'string') return null
  return input.replace(/([\*|_])/g, '\\$1')
}

/**
replaces {@link} tags with markdown links in the suppied input text
*/
function inlineLinks (text, options) {
  if (text) {
    var links = ddata.parseLink(text)
    links.forEach(function (link) {
      var linked = ddata._link(link.url, options)
      if (link.caption === link.url) link.caption = linked.name
      if (linked.url) link.url = linked.url
      text = text.replace(link.original, '[' + link.caption + '](' + link.url + ')')
    })
  }
  return text
}

/**
returns a gfm table header row.. only columns which contain data are included in the output
*/
function tableHead () {
  var args = arrayify(arguments)
  var data = args.shift()
  if (!data) return
  args.pop()
  var cols = args
  var colHeaders = cols.map(function (col) {
    var spl = col.split('|')
    return spl[1] || spl[0]
  })
  cols = cols.map(function (col) {
    return col.split('|')[0]
  })
  var toSplice = []
  cols = cols.filter(function (col, index) {
    var hasValue = data.some(function (row) {
      return typeof row[col] !== 'undefined'
    })
    if (!hasValue) toSplice.push(index)
    return hasValue
  })
  toSplice.reverse().forEach(function (index) {
    colHeaders.splice(index, 1)
  })

  var table = '| ' + colHeaders.join(' | ') + ' |\n'
  table += cols.reduce(function (p) { return p + ' --- |' }, '|') + '\n'
  return table
}

function containsData (rows, col) {
  return rows.some(function (row) {
    return typeof row[col] !== 'undefined'
  })
}

/**
returns a gfm table row.. only columns which contain data are included in the output
*/
function tableRow () {
  var args = arrayify(arguments)
  var rows = args.shift()
  if (!rows) return
  var options = args.pop()
  var cols = args
  var output = ''

  if (options.data) {
    var data = handlebars.createFrame(options.data)
    cols.forEach(function (col, index) {
      var colNumber = index + 1
      data['col' + colNumber] = containsData(rows, col)
    })
  }
  rows.forEach(function (row) {
    output += options.fn(row, { data: data })
  })
  return output
}

/**
@example
{{#each (tableHeadHtml params "name|Param" "type|Type" )}}<td>{{this}}</td>{{/each}}
*/
function tableHeadHtml () {
  var args = arrayify(arguments)
  var data = args.shift()
  if (!data) return
  args.pop()
  var cols = args
  var colHeaders = cols.map(function (col) {
    var spl = col.split('|')
    return spl[1] || spl[0]
  })
  cols = cols.map(function (col) {
    return col.split('|')[0]
  })
  var toSplice = []
  cols = cols.filter(function (col, index) {
    var hasValue = data.some(function (row) {
      return typeof row[col] !== 'undefined'
    })
    if (!hasValue) toSplice.push(index)
    return hasValue
  })
  toSplice.reverse().forEach(function (index) {
    colHeaders.splice(index, 1)
  })

  return colHeaders
}

function deprecated (options) {
  if (this.deprecated) {
    if (ddata.optionEquals('no-gfm', true, options) || options.hash['no-gfm']) {
      return '<del>' + options.fn(this) + '</del>'
    } else {
      return '~~' + options.fn(this) + '~~'
    }
  } else {
    return options.fn(this)
  }
}

/**

*/
function groupBy (groupByFields, options) {
  groupByFields = arrayify(groupByFields)
  return handlebars.helpers.each(_groupChildren.call(this, groupByFields, options), options)
}

function _addGroup (identifiers, groupByFields) {
  return identifiers.map(function (identifier) {
    identifier._group = groupByFields.map(function (field) {
      return typeof identifier[field] === 'undefined' ? null : identifier[field]
    })
    return identifier
  })
}

function _groupChildren (groupByFields, options) {
  var children = ddata._children.call(this, options)
  return _groupBy(children, groupByFields)
}

/**
takes the children of this, groups them, inserts group headings..
*/
function _groupBy (identifiers, groupByFields) {
  /* don't modify the input array */
  groupByFields = groupByFields.slice(0)

  groupByFields.forEach(function (group) {
    var groupValues = identifiers
      .filter(function (identifier) {
        /* exclude constructors from grouping.. re-implement to work off a `null` group value */
        return identifier.kind !== 'constructor'
      })
      .map(function (i) { return i[group] })
      .reduce(unique, [])
    if (groupValues.length <= 1) groupByFields = groupByFields.reduce(without(group), [])
  })
  identifiers = _addGroup(identifiers, groupByFields)

  var inserts = []
  var prevGroup = []
  var level = 0
  identifiers.forEach(function (identifier, index) {
    if (!deepEqual(identifier._group, prevGroup)) {
      var common = commonSequence(identifier._group, prevGroup)
      level = common.length
      identifier._group.forEach(function (group, i) {
        if (group !== common[i] && group !== null) {
          inserts.push({
            index: index,
            _title: group,
            level: level++
          })
        }
      })
    }
    identifier.level = level
    prevGroup = identifier._group
    delete identifier._group
  })

  /* insert title items */
  inserts.reverse().forEach(function (insert) {
    identifiers.splice(insert.index, 0, { _title: insert._title, level: insert.level })
  })
  return identifiers
}

function add () {
  var args = arrayify(arguments)
  args.pop()
  return args.reduce(function (p, c) { return p + (c || 0) }, 0)
}

function deepEqual (a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

/**
returns a more appropriate 'kind', depending on context
@return {string}
*/
function kindInThisContext (options) {
  if (this.kind === 'function' && this.memberof) {
    return 'method'
  } else if (this.kind === 'member' && !this.isEnum && this.memberof) {
    return 'property'
  } else if (this.kind === 'member' && this.isEnum && this.memberof) {
    return 'enum property'
  } else if (this.kind === 'member' && this.isEnum && !this.memberof) {
    return 'enum'
  } else if (this.kind === 'member' && this.scope === 'global') {
    return 'variable'
  } else {
    return this.kind
  }
}

function titleCase (string) {
  return string[0].toUpperCase() + string.slice(1)
}

/**
@returns {{ type: string, description: string }}
*/
function parseType (string) {
  if (!string) return
  var matches = string.match(/({(.*?)})?([\s\S]*)/)
  if (matches) {
    return { type: matches[2], description: matches[3] }
  }
}

/**
block helper.. provides the data to render the @params tag
*/
function params (options) {
  if (this.params) {
    var list = this.params.map(function (param) {
      var nameSplit = param.name.split('.')
      var name = nameSplit[nameSplit.length - 1]
      if (nameSplit.length > 1) name = '.' + name
      if (param.variable) name = '...' + name
      if (param.optional) name = '[' + name + ']'
      return {
        indent: '    '.repeat(nameSplit.length - 1),
        name: name,
        type: param.type,
        optional: param.optional,
        defaultvalue: param.defaultvalue,
        description: param.description
      }
    })
    return options.fn(list)
  }
}

function examples (options) {
  if (this.examples) {
    return this.examples.reduce(function (prev, example) {
      var lines = example.split(/\r\n|\r|\n/)

      /* Process @lang */
      var exampleLangOptions = ddata.option('example-lang', options)
      var matches = lines[0].match(/@lang\s+(\w+)\s*/)
      if (matches) {
        var exampleLangSubtag = matches[1]
        lines[0] = lines[0].replace(matches[0], '')
        if (lines[0].length === 0) {
          lines.splice(0, 1)
        }
      }
      var exampleLang = exampleLangSubtag || exampleLangOptions

      /* Process <caption> and update example */
      matches = lines[0].match(/\s*<caption>(.*?)<\/caption>\s*/)
      var caption
      if (matches) {
        caption = matches[1]
        example = lines.slice(1).join('\n')
      } else if (exampleLangSubtag) {
        example = lines.join('\n')
      }

      if (!(/```/.test(example) || exampleLang === 'off')) {
        example = util.format('```%s%s```', exampleLang ? exampleLang + '\n' : '', example ? example + '\n' : '')
      }

      return prev + options.fn({ caption: caption, example: example })
    }, '')
  }
}

function setLevel (identifier, level) {
  identifier.level = level
}

function stringRepeat (string, times) {
  return string.repeat(times)
}

function regexpTest (value, regex) {
  var re = new RegExp(regex)
  return re.test(value)
}

function equal (arg1, arg2) {
  return arg1 === arg2
}
