module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/index.scss";`
      },
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            // 以设计稿750为例， 750 / 10 = 75
            remUnit: 37.5
          }),
        ]
      }
    }
  },

  devServer: {
    // proxy: process.env.VUE_APP_BASE_API
  }
}