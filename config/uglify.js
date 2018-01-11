module.exports = {
	include: /\.min\.js$/,
	sourceMap: true,
	uglifyOptions: {
		beautify: false,
		mangle: {
			keep_fnames: true
		},
		compress: {
			warnings: false
		},
		comments: false
	}
};
