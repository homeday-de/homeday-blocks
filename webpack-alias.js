const path = require('path');

// Generates a webpack alias object
// NOTE: The paths are generated from the point of view of this file
module.exports = ({ custom = {} } = {}) => {
  const startAlias = {
    'hd-blocks-src': './src',
    'hd-blocks-services': './src/services',
    'hd-blocks-config': './config',
    'hd-blocks-assets': './src/assets',
    'hd-blocks-components': './src/components',
    styleguideIcons: './node_modules/styleguide/icons',
  };
  const mergedAlias = { ...startAlias, ...custom };

  return Object.keys(mergedAlias).reduce((alias, currentKey) => {
    const calculatedPath = path.join(
      __dirname,
      mergedAlias[currentKey],
    );

    return { ...alias, [currentKey]: calculatedPath };
  }, {});
};
