const webpackConfig = require('./config/webpack.config');

module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: webpackConfig,
  chainWebpack: (config) => {
    // Reset svg default config
    config.module.rules.delete('svg');

    // Embed svgs
    config.module
      .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('svg-url-loader')
      .loader('svg-url-loader')
      .end();
  },
  transpileDependencies: ['vue-zoomer'],
  css: {
    extract: false,
  },
};
