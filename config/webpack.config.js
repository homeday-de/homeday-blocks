const path = require('path');
const generateWebpackAlias = require('../webpack-alias');

const resolve = dir => path.join(__dirname, './', dir);

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules'),
    ],
    alias: generateWebpackAlias({
      custom: {
        tests: './tests',
      },
    }),
  },
};
