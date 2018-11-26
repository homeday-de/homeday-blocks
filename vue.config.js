
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
