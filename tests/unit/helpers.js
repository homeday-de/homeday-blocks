import { mount } from '@vue/test-utils';

export function wrapperFactoryBuilder(
  component,
  {
    propsData: defaultProps = {},
    options: defaultOptions = {},
  } = {},
) {
  return ({ propsData = {}, ...options } = {}) => mount(component, {
    propsData: {
      ...defaultProps,
      ...propsData,
    },
    ...defaultOptions,
    ...options,
  });
}

export default {
  wrapperFactoryBuilder,
};
