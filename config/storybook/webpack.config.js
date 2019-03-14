const generateWebpackAlias = require('../../webpack-alias');

module.exports = ({ config }) => {
  // Extend config as you need.
  // eslint-disable-next-line
  config.resolve.alias = generateWebpackAlias({
    custom: {
      '@': './src',
      vue$: './node_modules/vue/dist/vue.esm.js',
    },
  });
  config.module.rules.push({
    test: /\.md$/,
    use: [
      {
        loader: 'raw-loader',
      },
    ],
  });
  return config;
};
