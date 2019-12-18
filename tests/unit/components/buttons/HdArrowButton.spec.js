import { mount } from '@vue/test-utils';
import HdArrowButton from '@/components/buttons/HdArrowButton.vue';

describe('HdArrowButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdArrowButton);
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('creates a <button>', () => {
    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);
  });

  test("<button> has 'arrowButton' class", () => {
    const button = wrapper.find('button');

    expect(button.classes()).toContain('arrowButton');
  });

  // FIXME: https://bugzilla.mozilla.org/show_bug.cgi?id=654072
  test("<button> has autocomplete='off' attribute", () => {
    const button = wrapper.find('button');
    const { autocomplete } = button.attributes();

    expect(autocomplete).toBe('off');
  });

  describe('props', () => {
    describe('disabled', () => {
      test('defaults to false', () => {
        const { disabled } = wrapper.props();

        expect(disabled).toBe(false);
      });

      test('only accepts Boolean', () => {
        const { disabled } = wrapper.vm.$options.props;

        expect(disabled.type).toBe(Boolean);
      });

      test('disables button when true', async () => {
        const button = wrapper.find('button');

        expect(button.attributes().disabled).toBeUndefined();
        expect(wrapper.html()).toMatchSnapshot();

        wrapper.setProps({ disabled: true });

        await wrapper.vm.$nextTick();

        expect(button.attributes().disabled).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
      });
    });

    describe('direction', () => {
      test('defaults to right', () => {
        const { direction } = wrapper.props();

        expect(direction).toBe('right');
      });

      test('only accepts String', () => {
        const { direction } = wrapper.vm.$options.props;

        expect(direction.type).toBe(String);
      });

      test("only accepts 'right' and 'left'", () => {
        const { direction } = wrapper.vm.$options.props;

        expect(direction.validator('right')).toBe(true);
        expect(direction.validator('left')).toBe(true);
        expect(direction.validator('top')).toBe(false);
      });
    });

    describe('computed', () => {
      describe('computedClasses', () => {
        test('direction class based on direction prop', async () => {
          const { vm } = wrapper;

          wrapper.setProps({ direction: 'right' });

          await wrapper.vm.$nextTick();

          expect(vm.computedClasses).toBe('arrowButton--right');
          expect(wrapper.html()).toMatchSnapshot();

          wrapper.setProps({ direction: 'left' });

          await wrapper.vm.$nextTick();

          expect(vm.computedClasses).toBe('arrowButton--left');
          expect(wrapper.html()).toMatchSnapshot();
        });
      });
    });
  });
});
