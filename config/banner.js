var pkg = require("../package.json");

module.exports = {
	common: [
		"Copyright (c) 2017 " + pkg.author.name,
		pkg.name + " project is licensed under the " + pkg.license + " license",
		"",
		pkg.name + " JavaScript library",
		pkg.homepage,
		"",
		"@version " + pkg.version
		].join("\r\n"),
	pkgd: [
		"All-in-one packaged file for ease use of '" + pkg.name + "' with below dependencies.",
		"NOTE: This is not an official distribution file and is only for user convenience.",
		""].join("\r\n")
};
