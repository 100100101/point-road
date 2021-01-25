try {
  module.exports = {
    devServer: {
      open: false,
      public: 'http://localhost:8080',
      host: 'localhost',
      port: 8080,
      proxy: {
        '^/api': {
          target: process.env.API_ORIGIN,
          changeOrigin: true,
          logLevel: 'debug',
          pathRewrite: { '^/api': '/' },
        },
      },
      // https: {
      //     key: JSON.parse(`"${process.env.HTTPS_LOCALHOST_KEY}"`),
      //     cert: JSON.parse(`"${process.env.HTTPS_LOCALHOST_CRT}"`),
      // },
      // hotOnly: false,
      // disableHostCheck: true,
    },
    transpileDependencies: ['vuetify'],
  }
} catch (error) {
  console.error(error)
}
