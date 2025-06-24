const path = require('path');
const generateWebpackAlias = require('../webpack-alias');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-controls'],
  core: {
    builder: 'webpack5',
  },
  framework: '@storybook/vue-webpack5',
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => {
    config.resolve.alias = generateWebpackAlias({
      custom: {
        '@': './src',
        vue$: './node_modules/vue/dist/vue.esm.js',
      },
    });

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
};
