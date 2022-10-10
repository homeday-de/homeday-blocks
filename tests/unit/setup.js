import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { config } from '@vue/test-utils';

config.showDeprecationWarnings = false;

// MutationObserver is used in HdButton
/* eslint-disable */
global.MutationObserver = class {
  constructor() {}

  disconnect() {}

  observe() {}
};
 /* eslint-enable */
