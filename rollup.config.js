import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";

const version = process.env.NIGHTLY || require("./package.json").version;
const merge = require("./rollup/merge");
const banner = require("./rollup/banner").banner;

const replaceVersion = replace({
	"#__VERSION__#": version,
	delimiters: ["", ""]
});

const defaultConfig = {
	input: "src/Flicking.js",
	plugins: [babel(), replaceVersion],
	output: {
		banner,
		freeze: false,
		name: "eg.Flicking",
		format: "umd",
		exports: "default",
		interop: false,
		sourcemap: true
	}
};

export default merge(defaultConfig, [
	...require("./rollup/rollup.config.esm"),
	...require("./rollup/rollup.config.development"),
	...require("./rollup/rollup.config.pkgd")
]);
