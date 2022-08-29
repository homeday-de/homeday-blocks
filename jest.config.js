/**
 * NOTE: hd-blocks mapper is needed to solve hd-blocks path in the components
 */
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  globalSetup: '<rootDir>/tests/unit/globalSetup.js',
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.js'],
  collectCoverageFrom: [
    'src/components/**/*.vue',
    'src/services/**/*.js',
  ],
  coverageReporters: [
    'lcov',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(vue-flickity|vue-zoomer|homeday-assets)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^homeday-blocks/(.*)$': '<rootDir>/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
};
