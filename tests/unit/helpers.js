import { mount, shallowMount } from '@vue/test-utils';

export function wrapperFactoryBuilder(
  component,
  {
    data: defaultData,
    slots: defaultSlots,
    scopedSlots: defaultScopedSlots,
    stubs: defaultStubs,
    attachToDocument: defaultAttachToDocument,
    props: defaultProps,
    listeners: defaultListeners,
    provide: defaultProvide,
    methods: defaultMethods,
    shallow: defaultShallow = false,
  } = {},
) {
  return function innerHandler({
    data,
    slots,
    scopedSlots,
    stubs,
    attachToDocument = defaultAttachToDocument,
    props,
    listeners,
    provide,
    methods,
    shallow = defaultShallow,
  } = {}) {
    const mounter = shallow ? shallowMount : mount;

    return mounter(component, {
      data: () => ({
        ...defaultData,
        ...data,
      }),
      slots: {
        ...defaultSlots,
        ...slots,
      },
      scopedSlots: {
        ...defaultScopedSlots,
        ...scopedSlots,
      },
      stubs: {
        ...defaultStubs,
        ...stubs,
      },
      attachToDocument,
      propsData: {
        ...defaultProps,
        ...props,
      },
      listeners: {
        ...defaultListeners,
        ...listeners,
      },
      provide: {
        ...defaultProvide,
        ...provide,
      },
      methods: {
        ...defaultMethods,
        ...methods,
      },
    });
  };
}

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
