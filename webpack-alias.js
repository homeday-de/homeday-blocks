const path = require('path');

// Generates a webpack alias object
// NOTE: The paths are generated from the point of view of this file
module.exports = ({ custom = {} } = {}) => {
  const startAlias = {
    'homeday-blocks': '.',
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
