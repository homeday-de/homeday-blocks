const path = require('path');

function resolve(p) {
  return path.join(__dirname, p);
}

module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
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
          @import "@/styles/variables.scss";
        `,
      },
    },
  },
};
