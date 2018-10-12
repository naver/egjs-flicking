const uglify = require("rollup-plugin-uglify").uglify;

module.exports = uglify({
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
		}
	}
});
