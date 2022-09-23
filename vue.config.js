const webpackConfig = require('./config/webpack.config');

module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: webpackConfig,
  chainWebpack: (config) => {
    // Reset svg defualt config
    config.module.rule('svg').uses.clear();

    // Embed svgs
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .use('svg-url-loader')
      .loader('svg-url-loader')
      .end();

    // Enabled auto-fix for eslint
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true,
    });
  },
  transpileDependencies: ['vue-zoomer'],
  css: {
    extract: false,
  },
};
