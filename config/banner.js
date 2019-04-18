var pkg = require("../package.json");

module.exports = {
	common: [
		"Copyright (c) 2017 " + pkg.author.name,
		pkg.name + " JavaScript library",
		pkg.name + " project is licensed under the " + pkg.license + " license",
		"",
		pkg.homepage || "",
		"@version " + pkg.version
		].join("\r\n"),
	pkgd: [
		`All-in-one packaged file for ease use of '${pkg.name}' with below dependencies.`,
		`- ${Object.entries(pkg.dependencies).map(v => v.join(" ")).join(", ")}`,
		"NOTE: This is not an official distribution file and is only for user convenience.",
		""].join("\r\n")
};
