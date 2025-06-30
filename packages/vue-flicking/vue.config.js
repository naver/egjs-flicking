module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require("autoprefixer"),
            require("postcss-clean")
          ]
        }
      }
    }
  }
}; 