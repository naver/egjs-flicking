module.exports = {
	include: /\.min\.js$/,
	uglifyOptions: {
		ie8: true,
		compress: {
			warnings: false,
		},
		output: {
			comments: false,
			beautify: false
		},
	},
	sourceMap: true,
};

