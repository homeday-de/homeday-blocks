import { mount } from '@vue/test-utils';
import HdToast from '@/components/HdToast.vue';

describe('HdToast', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdToast);
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders component closed', () => {
    const data = wrapper.vm.$data;

    expect(data.isOpen).toBe(false);
  });

  test("'primaryLabel' text binds to primary <button>", () => {
    const text = 'random-text';

    wrapper.setProps({ primaryLabel: text });

    const button = wrapper.find('.toast__control--primary');

    expect(wrapper.html()).toMatchSnapshot();
    expect(button.text()).toBe(text);
  });

  test("primary <button> calls 'primaryClick' when clicked", () => {
    const text = 'random-text';
    const primaryClickMock = jest.fn();

    wrapper.setProps({ primaryLabel: text });
    wrapper.setMethods({ primaryClick: primaryClickMock });

    const button = wrapper.find('.toast__control--primary');

    button.trigger('click');

    expect(primaryClickMock).toHaveBeenCalledTimes(1);
  });

  test("'secondaryLabel' text binds to secondary <button>", () => {
    const text = 'random-text';
    wrapper.setProps({ secondaryLabel: text });

    const button = wrapper.find('.toast__control--secondary');

    expect(wrapper.html()).toMatchSnapshot();
    expect(button.text()).toBe(text);
  });

  test("secondary <button> calls 'secondaryClick' when clicked", () => {
    const text = 'random-text';
    const secondaryClickMock = jest.fn();

    wrapper.setProps({ primaryLabel: text });
    wrapper.setMethods({ secondaryClick: secondaryClickMock });

    const button = wrapper.find('.toast__control--secondary');

    button.trigger('click');

    expect(secondaryClickMock).toHaveBeenCalledTimes(1);
  });

  test('renders default slot', () => {
    const innerWrapper = mount(HdToast, {
      slots: {
        default: '<div id="slot"></div>',
      },
    });
    const slot = innerWrapper.find('#slot');

    expect(innerWrapper.html()).toMatchSnapshot();
    expect(slot.exists()).toBe(true);
  });

  describe('props', () => {
    describe('primaryLabel', () => {
      test('defaults to undefined', () => {
        const { primaryLabel } = wrapper.props();

        expect(primaryLabel).toBeUndefined();
      });

      test('only accepts String', () => {
        const { primaryLabel } = wrapper.vm.$options.props;

        expect(primaryLabel.type).toBe(String);
      });
    });

    describe('secondaryLabel', () => {
      test('defaults to undefined', () => {
        const { secondaryLabel } = wrapper.props();

        expect(secondaryLabel).toBeUndefined();
      });

      test('only accepts String', () => {
        const { secondaryLabel } = wrapper.vm.$options.props;

        expect(secondaryLabel.type).toBe(String);
      });
    });
  });

  describe('computed', () => {
    describe('hasLabels', () => {
      test('defaults to false', () => {
        const { vm } = wrapper;

        expect(vm.hasLabels).toBe(false);
      });

      test('true when primaryLabel exists', () => {
        const { vm } = wrapper;

        wrapper.setProps({ primaryLabel: 'random-text' });

        expect(vm.hasLabels).toBe(true);
      });

      test('true when secondaryLabel exists', () => {
        const { vm } = wrapper;

        wrapper.setProps({ secondaryLabel: 'random-text' });

        expect(vm.hasLabels).toBe(true);
      });
    });

    describe('computedClasses', () => {
      test("'toast--isOpen' when isOpen is true", () => {
        const { vm } = wrapper;
        const className = 'toast--isOpen';

        expect(vm.computedClasses[className]).toBe(false);
        expect(wrapper.html()).toMatchSnapshot();

        wrapper.setData({ isOpen: true });

        expect(vm.computedClasses[className]).toBe(true);
        expect(wrapper.html()).toMatchSnapshot();
      });

      test("'toast--isClosing' when isClosing is true", () => {
        const { vm } = wrapper;
        const className = 'toast--isClosing';

        expect(vm.computedClasses[className]).toBe(false);
        expect(wrapper.html()).toMatchSnapshot();

        wrapper.setData({ isClosing: true });

        expect(vm.computedClasses[className]).toBe(true);
        expect(wrapper.html()).toMatchSnapshot();
      });
    });
  });

  describe('methods', () => {
    describe('open', () => {
      test('sets isOpen to true', () => {
        const { vm } = wrapper;

        expect(vm.isOpen).toBe(false);

        vm.open();

        expect(vm.isOpen).toBe(true);
      });
    });

    describe('primaryClick', () => {
      test("emits 'primaryClick' event", () => {
        wrapper.vm.primaryClick();

        expect(wrapper.emitted().primaryClick).toBeTruthy();
        expect(wrapper.emitted().primaryClick.length).toBe(1);
      });
    });

    describe('secondaryClick', () => {
      test("emits 'secondaryClick' event and call 'close'", () => {
        const closeMock = jest.fn();

        wrapper.setMethods({ close: closeMock });
        wrapper.vm.secondaryClick();

        expect(wrapper.emitted().secondaryClick).toBeTruthy();
        expect(wrapper.emitted().secondaryClick.length).toBe(1);

        expect(closeMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('close', () => {
      test("sets 'isClosing' to true before timers then sets 'isOpen' and 'isClosing' to false and emits 'close'", () => {
        jest.useFakeTimers();

        const { vm } = wrapper;

        vm.close();

        expect(vm.isClosing).toBe(true);

        jest.runAllTimers();

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);

        expect(vm.isOpen).toBe(false);
        expect(vm.isClosing).toBe(false);

        expect(wrapper.emitted().close).toBeTruthy();
        expect(wrapper.emitted().close.length).toBe(1);
      });
    });
  });
});
