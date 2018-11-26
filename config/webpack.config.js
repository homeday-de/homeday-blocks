const path = require('path');

const resolve = dir => path.join(__dirname, './', dir);

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules'),
    ],
    alias: {
      src: resolve('../src'),
      services: resolve('../src/services'),
      config: resolve('../config'),
      assets: resolve('../src/assets'),
      components: resolve('../src/components'),
      styleguideIcons: resolve('../node_modules/styleguide/icons'),
    },
  },
};
