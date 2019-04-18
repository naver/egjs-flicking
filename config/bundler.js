
const pluginResolve = require("rollup-plugin-node-resolve");
const pluginTypescript = require("rollup-plugin-typescript");
const pluginReplace = require("rollup-plugin-replace");
const pluginUglify = require("rollup-plugin-uglify").uglify;
const pluginProtoMinify = require("rollup-plugin-prototype-minify");
const {common, pkgd} = require("./banner");
const version = require("../package.json").version;


const bannerCommon = `/*
${common}
*/`;
const bannerPkgd = `/*
${common}
${pkgd}
*/`;
const uglify = pluginUglify({
	sourcemap: true,
	output: {
		comments: (node, comment) => {
			const text = comment.value;
			const type = comment.type;

			if (type === "comment2") {
				// multiline comment
				return /@egjs\/flicking/.test(text);
			}
			return false;
		},
	},
});

const protoMinify = pluginProtoMinify({
	sourcemap: true,
});
const typescript = pluginTypescript({
	"module": "es2015",
	"target": "es5",
	"lib": ["es2015", "dom"],
	"exclude": "node_modules/**",
	"sourceMap": true,
});
const replace = pluginReplace({
	"#__VERSION__#": version,
	"/** @class */": "/*#__PURE__*/",
	delimiters: ["", ""],
});
const _resolve = pluginResolve({});

function umd({
	input,
	output,
	library,
	ugly,
	externals = {},
	resolve,
}) {
	const plugins = [typescript, protoMinify, replace];

	resolve && plugins.push(_resolve);
	ugly && plugins.push(uglify);
	return {
		input,
		plugins,
		external: Object.keys(externals),
		output: {
			file: output,
			globals: externals,
			banner: resolve ? bannerPkgd : bannerCommon,
			freeze: false,
			name: library,
			format: "umd",
			exports: "default",
			interop: false,
			sourcemap: true,
		},
	};
}

exports.umds = function umds({
	input,
	outputs,
	library,
	externals = {},
	resolve,
	ugly,
}) {
	return outputs.map(output => umd({
		input,
		output,
		library,
		externals,
		resolve: resolve || ~output.indexOf(".pkgd"),
		ugly: ugly || ~output.indexOf(".min"),
	}));
};

exports.esm = function esm({
	input,
	output,
	externals,
}) {
	const plugins = [typescript, protoMinify, replace];

	return {
		input,
		plugins,
		external: Object.keys(externals),
		output: {
			file: output,
			banner: bannerCommon,
			freeze: false,
			format: "esm",
			interop: false,
			sourcemap: true,
			globals: externals,
		},
	};
};

exports.umd = umd;