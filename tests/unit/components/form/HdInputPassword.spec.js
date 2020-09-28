import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdInputPassword from '@/components/form/HdInputPassword.vue';
import HdInput from '@/components/form/HdInput.vue';

const VISIBILITY_TOGGLE_SELECTOR = '.password-input__visibility-toggle';

const PASSWORD_VISIBLE_CLASS = 'password-input__visibility-toggle--visible';

const TEST_VALUE = 'new value';
const TEST_PROPS = {
  name: 'test name',
  label: 'test label',
  placeholder: 'test placeholder',
  value: 'test password',
};

const wrapperBuilder = wrapperFactoryBuilder(HdInputPassword, {
  props: {
    ...TEST_PROPS,
  },
});

describe('HdInputPassword', () => {
  it('is rendered as expected', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('updates the field on change of the prop `value`', () => {
    const wrapper = wrapperBuilder({
      props: {
        value: TEST_VALUE,
      },
    });

    expect(wrapper.find('input').element.value).toBe(TEST_VALUE);
  });

  it('emits `input` event with the right payload', () => {
    const wrapper = wrapperBuilder();
    const input = wrapper.get(HdInput);

    wrapper.find('input').setValue(TEST_VALUE);

    expect(input.emitted('input')[0][0]).toEqual(TEST_VALUE);
  });

  it('check if the input type is "password"', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper
      .find('input')
      .attributes()
      .type).toBe('password');
  });

  it('shows the visibility toggle', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.find(VISIBILITY_TOGGLE_SELECTOR).exists()).toBe(true);
  });

  it('toggles the password\'s visibility', async () => {
    const wrapper = wrapperBuilder();
    const toggle = wrapper.find(VISIBILITY_TOGGLE_SELECTOR);

    toggle.trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('input').attributes().type).toBe('text');
    expect(toggle.classes()).toContain(PASSWORD_VISIBLE_CLASS);

    toggle.trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('input').attributes().type).toBe('password');
    expect(toggle.classes()).not.toContain(PASSWORD_VISIBLE_CLASS);
  });

  it('doesn\'t show visibility toggle if empty', () => {
    const wrapper = wrapperBuilder({
      props: {
        value: '',
      },
    });

    expect(wrapper.find(VISIBILITY_TOGGLE_SELECTOR).exists()).toBe(false);
  });
});
