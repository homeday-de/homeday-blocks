/**
 * NOTE: hd-blocks mapper is needed to solve hd-blocks path in the components
 */
module.exports = {
  globalSetup: './tests/global-setup.js',
  collectCoverageFrom: [
    'src/components/**/*.vue',
    'src/services/**/*.js',
  ],
  coverageReporters: [
    'lcov',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(vue-flickity)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^homeday-blocks/(.*)$': '<rootDir>/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  testURL: 'http://localhost/',
};
