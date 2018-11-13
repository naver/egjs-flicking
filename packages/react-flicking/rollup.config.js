import typescript from "rollup-plugin-typescript";
import PrototypeMinify from "rollup-plugin-prototype-minify";

const plugin = typescript({
	"module": "es2015",
	"target": "es3",
	"lib": ["es2015", "dom"],
	"exclude": "node_modules/**",
	"sourceMap": true
});

export default {
	input: "src/react-flicking/index.tsx",
	plugins: [plugin, PrototypeMinify({sourcemap: true})],
	output: [
		{
			format: "es",
			freeze: false,
			exports: "named",
			"sourcemap": true,
			file: "./dist/flicking.esm.js"
		},
		{
			format: "cjs",
			freeze: false,
			exports: "named",
			"sourcemap": true,
			file: "./dist/flicking.cjs.js"
		}
	]
};
