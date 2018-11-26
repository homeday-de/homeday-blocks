const path = require('path');

const resolve = dir => path.join(__dirname, './', dir);

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.
  // eslint-disable-next-line
  defaultConfig.resolve.alias = {
    '@': resolve('../../src'),
    vue$: resolve('../../node_modules/vue/dist/vue.esm.js'),
    src: resolve('../../src'),
    services: resolve('../../src/services'),
    config: resolve('../'),
    assets: resolve('../../src/assets'),
    components: resolve('../../src/components'),
    styleguideIcons: resolve('../../node_modules/styleguide/icons'),
  };
  return defaultConfig;
};
