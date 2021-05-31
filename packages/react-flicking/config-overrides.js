const { aliasDangerous } = require("react-app-rewire-alias/lib/aliasDangerous")

const aliasMap = {
  "~": '../../src',
}

module.exports = aliasDangerous(aliasMap)
