const webpackConfig = require('./config/webpack.config.js');

module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: webpackConfig,
  // Enabled auto-fix for eslint
  chainWebpack: (config) => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .options({
        fix: true,
      });
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "hd-blocks/styles/mixins.scss";
        `,
      },
    },
  },
  transpileDependencies: ['vue-zoomer'],
};
