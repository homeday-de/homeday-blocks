const generateWebpackAlias = require('../../webpack-alias');

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.
  // eslint-disable-next-line
  defaultConfig.resolve.alias = generateWebpackAlias({
    custom: {
      '@': './src',
      vue$: './node_modules/vue/dist/vue.esm.js',
    },
  });
  defaultConfig.module.rules.push({
    test: /\.md$/,
    use: [
      {
        loader: 'html-loader',
      }, {
        loader: 'markdown-loader',
      },
    ],
  });
  return defaultConfig;
};
