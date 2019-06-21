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

// Returns the payload of the last emitted `eventName` by the `wrapper`
export function getLastEventPayload({ wrapper, eventName }) {
  if (!wrapper || !eventName) {
    return undefined;
  }

  const emittedEvents = wrapper.emitted(eventName);
  if (!emittedEvents || emittedEvents.length === 0) {
    return undefined;
  }

  return emittedEvents[emittedEvents.length - 1][0];
}
