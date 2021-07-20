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
    proxy: {  
      '^/cgi-bin/musics.fcg': {
          target: 'https://u.y.qq.com',  // target host
      },
      '^/splcloud/fcgi-bin/smartbox_new.fcg': {
        target: 'https://c.y.qq.com',  // target host
      },
      '^/soso/fcgi-bin': {
        target: 'https://c.y.qq.com',  // target host
        headers: {
          "referer": 'https://y.qq.com/',
          "host": 'https://y.qq.com'
        }
      },
    },
  }
}