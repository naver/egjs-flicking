const resolve = require("rollup-plugin-node-resolve");
const uglify = require("./uglify");
const pkgd = require("./banner").pkgd;

module.exports = [
	{
		plugins: [resolve()],
		output: {
			banner: pkgd,
			file: "./dist/flicking.pkgd.js"
		}
	},
	{
		plugins: [resolve(), uglify],
		output: {
			banner: pkgd,
			file: "./dist/flicking.pkgd.min.js"
		}
	}
];
