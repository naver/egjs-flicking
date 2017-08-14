module.exports = {
	include: /\.min\.js$/,
	beautify: false,
	mangle: {
		screw_ie8: false,
		keep_fnames: true
	},
	compress: {
		screw_ie8: false,
		warnings: false
	},
	output: {
		screw_ie8: false
	},
	comments: false,
	sourceMap: true
};
