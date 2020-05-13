module.exports = {
  devServer: {
    host: 'localhost', //'bt.com',
    port: 3000,

    proxy: {
       '/uploads/': { target: 'https://api.travel.iteora.com' }
    }
  },

  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
  }
};
