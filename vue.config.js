const path = require('path');
const webpackConfig = require('./config/webpack.config.js');

function resolve(p) {
  return path.join(__dirname, p);
}

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
    const { alias } = config.resolve;
    alias.set('styleguideIcons', resolve('node_modules/styleguide/icons'));
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "~styleguide/src/mixins.scss";
        `,
      },
    },
  },
};
