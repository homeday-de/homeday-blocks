import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdToast from '@/components/HdToast.vue';

const wrapperBuilder = wrapperFactoryBuilder(HdToast);

describe('HdToast', () => {
  it('renders component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("'primaryLabel' text binds to primary <button>", async () => {
    const text = 'random-text';
    const wrapper = wrapperBuilder({
      props: {
        primaryLabel: text,
      },
    });

    const button = wrapper.get('.toast__control--primary');

    expect(wrapper.html()).toMatchSnapshot();
    expect(button.text()).toBe(text);
  });

  it("primary <button> calls 'primaryClick' when clicked", () => {
    const text = 'random-text';
    const primaryClickMock = jest.fn();
    const wrapper = wrapperBuilder({
      props: {
        primaryLabel: text,
      },
      methods: {
        primaryClick: primaryClickMock,
      },
    });

    const button = wrapper.get('.toast__control--primary');

    button.trigger('click');

    expect(primaryClickMock).toHaveBeenCalledTimes(1);
  });

  it("'secondaryLabel' text binds to secondary <button>", () => {
    const text = 'random-text';
    const wrapper = wrapperBuilder({
      props: {
        secondaryLabel: text,
      },
    });

    const button = wrapper.get('.toast__control--secondary');

    expect(wrapper.html()).toMatchSnapshot();
    expect(button.text()).toBe(text);
  });

  it("secondary <button> calls 'secondaryClick' when clicked", () => {
    const text = 'random-text';
    const secondaryClickMock = jest.fn();
    const wrapper = wrapperBuilder({
      props: {
        secondaryLabel: text,
      },
      methods: {
        secondaryClick: secondaryClickMock,
      },
    });

    const button = wrapper.find('.toast__control--secondary');

    button.trigger('click');

    expect(secondaryClickMock).toHaveBeenCalledTimes(1);
  });

  it('renders default slot', () => {
    const wrapper = wrapperBuilder({
      slots: {
        default: '<div id="slot"></div>',
      },
    });
    const slot = wrapper.get('#slot');

    expect(wrapper.html()).toMatchSnapshot();
    expect(slot.exists()).toBe(true);
  });

  describe('methods', () => {
    describe('open', () => {
      it('sets isOpen to true', () => {
        const wrapper = wrapperBuilder();
        const { vm } = wrapper;


        expect(vm.isOpen).toBe(false);

        vm.open();

        expect(vm.isOpen).toBe(true);
      });
    });

    describe('close', () => {
      it("sets 'isClosing' to true before timers then sets 'isOpen' and 'isClosing' to false and emits 'close'", () => {
        jest.useFakeTimers();

        const wrapper = wrapperBuilder();
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
