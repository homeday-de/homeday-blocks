import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import FIELD_CLASSES from './FIELD_CLASSES';
import HdInput from '@/components/form/HdInput.vue';

const ERROR_SELECTOR = '.field__error';
const HELPER_SELECTOR = '.field__error--helper';
const ICON_SELECTOR = '.field__icon';

const TEST_VALUE = 'new value';
const TEST_PROPS = {
  name: 'test name',
  label: 'test label',
  placeholder: 'test placeholder',
};

const wrapperBuilder = wrapperFactoryBuilder(HdInput, {
  props: {
    ...TEST_PROPS,
  },
});

describe('HdInput', () => {
  it('is rendered as expected', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('is rendered with prefilled value', () => {
    const wrapper = wrapperBuilder({
      props: {
        value: TEST_VALUE,
      },
    });

    expect(wrapper.find('input').element.value).toBe(TEST_VALUE);
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

    wrapper.get('input').setValue(TEST_VALUE);

    expect(wrapper.emitted('input')[0][0]).toEqual(TEST_VALUE);
  });

  it('allows setting a helper', async () => {
    const wrapper = wrapperBuilder();
    const TEST_HTML = '<b>test</b> test';

    wrapper.vm.showHelper(TEST_HTML);

    await wrapper.vm.$nextTick();

    expect(wrapper.find(HELPER_SELECTOR).element.innerHTML).toEqual(TEST_HTML);
  });

  it('validates requiredness', async () => {
    const wrapper = wrapperBuilder({
      props: {
        value: '',
        required: true,
      },
    });

    expect(wrapper.vm.validate()).toBe(false);

    await wrapper.vm.$nextTick();

    expect(wrapper.find(ERROR_SELECTOR).text()).toBeTruthy();
    expect(wrapper.classes()).toContain(FIELD_CLASSES.INVALID);

    wrapper.setProps({ required: false });

    expect(wrapper.vm.validate()).toBe(true);
  });

  describe('type "email"', () => {
    const emailWrapperBuilder = wrapperFactoryBuilder(HdInput, {
      props: {
        ...TEST_PROPS,
        type: 'email',
      },
    });

    it('sets the input type to "email"', () => {
      const wrapper = emailWrapperBuilder();

      expect(wrapper
        .find('input')
        .attributes()
        .type).toBe('email');
    });

    it('validates email', async () => {
      const VALID_EMAIL = 'valid@email.com';
      const INVALID_EMAIL = 'unvalid@email@com';
      const wrapper = emailWrapperBuilder();

      expect(wrapper.vm.validate()).toBe(true);

      wrapper.setProps({ value: INVALID_EMAIL });

      expect(wrapper.vm.validate()).toBe(false);

      await wrapper.vm.$nextTick();

      expect(wrapper.find(ERROR_SELECTOR).text()).toBeTruthy();
      expect(wrapper.classes()).toContain(FIELD_CLASSES.INVALID);

      wrapper.setProps({ value: VALID_EMAIL });
      expect(wrapper.vm.validate()).toBe(true);
    });
  });

  describe('type "date"', () => {
    const dateWrapperBuilder = wrapperFactoryBuilder(HdInput, {
      props: {
        ...TEST_PROPS,
        type: 'date',
      },
    });

    it('sets the input type to "date"', () => {
      const wrapper = dateWrapperBuilder();

      expect(wrapper
        .find('input')
        .attributes()
        .type).toBe('date');
    });

    it('validates date', async () => {
      const VALID_DATE = '1990-01-01';
      const INVALID_DATE = '01-01-1990';
      const wrapper = dateWrapperBuilder();

      expect(wrapper.vm.validate()).toBe(true);

      wrapper.setProps({ value: INVALID_DATE });

      expect(wrapper.vm.validate()).toBe(false);

      await wrapper.vm.$nextTick();

      expect(wrapper.find(ERROR_SELECTOR).text()).toBeTruthy();
      expect(wrapper.classes()).toContain(FIELD_CLASSES.INVALID);

      wrapper.setProps({ value: VALID_DATE });
      expect(wrapper.vm.validate()).toBe(true);
    });
  });

  describe('type "number"', () => {
    const numberWrapperBuilder = wrapperFactoryBuilder(HdInput, {
      props: {
        ...TEST_PROPS,
        type: 'number',
      },
    });

    it('sets the input type to "number"', () => {
      const wrapper = numberWrapperBuilder();

      expect(wrapper
        .find('input')
        .attributes()
        .type).toBe('number');
    });

    it('parses to Number', () => {
      const wrapper = numberWrapperBuilder();
      const TEST_STRING = '1234.56';
      const input = wrapper.get('input');

      input.setValue(TEST_STRING);

      expect(wrapper.emitted('input')[0][0]).toBe(parseFloat(TEST_STRING));
    });

    it('limits the value in a given "min"-"max" range', () => {
      const MAX = 100;
      const MIN = 0;
      const TEST_NUMBER = 50;
      const wrapper = numberWrapperBuilder({
        props: {
          max: MAX,
          min: MIN,
        },
      });
      const input = wrapper.get('input');

      input.setValue(TEST_NUMBER);
      expect(wrapper.emitted('input')[0][0]).toBe(TEST_NUMBER);

      input.setValue(MAX + 10);
      expect(wrapper.emitted('input')[1][0]).toBe(MAX);

      input.setValue(MIN - 10);
      expect(wrapper.emitted('input')[2][0]).toBe(MIN);
    });
  });

  it('Supports disabling', () => {
    const wrapper = wrapperBuilder({
      props: {
        disabled: true,
      },
    });

    expect(wrapper.find('input').attributes().disabled).toBe('disabled');
  });

  it('Can render an icon', async () => {
    const ICON_PATH = 'fake/icon.svg';
    const wrapper = wrapperBuilder();

    expect(wrapper.classes()).not.toContain(FIELD_CLASSES.HAS_ICON);
    expect(wrapper.find(ICON_SELECTOR).exists()).toBe(false);

    wrapper.setProps({
      icon: ICON_PATH,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.classes()).toContain(FIELD_CLASSES.HAS_ICON);
    expect(wrapper.find(ICON_SELECTOR).exists()).toBe(true);
  });

  it('ignores LastPass auto fill', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper
      .find('input')
      .attributes()['data-lpignore'])
      .toBe('true');
  });

  it('custom validation prop validation', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.vm.$options.props.customRules.validator([1])).toBeFalsy();
    expect(wrapper.vm.$options.props.customRules.validator([{ validate: () => true, errorMessage: '' }])).toBeTruthy();
  });

  it('custom validation error message', async () => {
    // Set a custom validation where input should match 'custom' keyword
    const errorMsg = 'Input should match custom keyword';
    const customKeyword = 'custom';
    const wrapper = wrapperBuilder({
      props: {
        customRules: [{
          validate: value => value === 'custom',
          errorMessage: errorMsg,
        }],
        value: customKeyword,
      },
    });

    // Makes sure it does not display error msg
    expect(wrapper.vm.$data.error).toBeNull();

    // Change value and look for error message
    wrapper.setProps({
      value: TEST_VALUE,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(ERROR_SELECTOR).text()).toBe(errorMsg);
  });

  it('forwards attributes to <input>', () => {
    const wrapper = wrapperBuilder({
      props: {
        readonly: true,
      },
    });

    expect(wrapper.find('input').attributes().readonly).toBe('readonly');
  });
});
