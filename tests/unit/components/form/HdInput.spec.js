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

describe('HdInput', () => {
  const wrapperFactory = wrapperFactoryBuilder(
    HdInput,
    {
      propsData: TEST_PROPS,
    },
  );

  let wrapper;
  beforeEach(() => {
    wrapper = wrapperFactory();
  });

  test('is rendered as expected', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('is rendered with prefilled value', () => {
    wrapper = wrapperFactory({
      propsData: {
        value: TEST_VALUE,
      },
    });
    expect(wrapper.find('input').element.value).toBe(TEST_VALUE);
  });

  test('updates the field on change of the prop `value`', () => {
    wrapper.setProps({ value: TEST_VALUE });
    expect(wrapper.find('input').element.value).toBe(TEST_VALUE);
  });

  test('emits `input` event with the right payload', () => {
    wrapper.find('input').setValue(TEST_VALUE);
    expect(wrapper.emitted('input')[0][0]).toEqual(TEST_VALUE);
  });

  test('allows setting a helper', () => {
    const TEST_HTML = '<b>test</b> test';
    wrapper.vm.showHelper(TEST_HTML);
    expect(wrapper.find(HELPER_SELECTOR).element.innerHTML).toEqual(TEST_HTML);
  });

  test('validates requiredness', () => {
    wrapper = wrapperFactory({
      propsData: {
        value: '',
        required: true,
      },
    });
    expect(wrapper.vm.validate()).toBe(false);
    expect(wrapper.find(ERROR_SELECTOR).text()).toBeTruthy();
    expect(wrapper.classes()).toContain(FIELD_CLASSES.INVALID);

    wrapper.setProps({ required: false });
    expect(wrapper.vm.validate()).toBe(true);
  });

  describe('type "email"', () => {
    beforeEach(() => {
      wrapper = wrapperFactory({
        propsData: {
          type: 'email',
        },
      });
    });

    test('sets the input type to "email"', () => {
      expect(wrapper
        .find('input')
        .attributes()
        .type).toBe('email');
    });

    test('validates email', () => {
      const VALID_EMAIL = 'valid@email.com';
      const INVALID_EMAIL = 'unvalid@email@com';

      wrapper.setProps({
        type: 'email',
        value: INVALID_EMAIL,
      });

      expect(wrapper.vm.validate()).toBe(false);
      expect(wrapper.find(ERROR_SELECTOR).text()).toBeTruthy();
      expect(wrapper.classes()).toContain(FIELD_CLASSES.INVALID);

      wrapper.setProps({ value: VALID_EMAIL });
      expect(wrapper.vm.validate()).toBe(true);
    });
  });

  describe('type "date"', () => {
    beforeEach(() => {
      wrapper = wrapperFactory({
        propsData: {
          type: 'date',
        },
      });
    });

    test('sets the input type to "date"', () => {
      expect(wrapper
        .find('input')
        .attributes()
        .type).toBe('date');
    });

    test('validates date', () => {
      const VALID_DATE = '1990-01-01';
      const INVALID_DATE = '01-01-1990';

      wrapper.setProps({
        type: 'date',
        value: INVALID_DATE,
      });

      expect(wrapper.vm.validate()).toBe(false);
      expect(wrapper.find(ERROR_SELECTOR).text()).toBeTruthy();
      expect(wrapper.classes()).toContain(FIELD_CLASSES.INVALID);

      wrapper.setProps({ value: VALID_DATE });
      expect(wrapper.vm.validate()).toBe(true);
    });
  });

  describe('type "number"', () => {
    beforeEach(() => {
      wrapper = wrapperFactory({
        propsData: {
          type: 'number',
        },
      });
    });

    test('sets the input type to "number"', () => {
      expect(wrapper
        .find('input')
        .attributes()
        .type).toBe('number');
    });

    test('parses to Number', () => {
      const TEST_STRING = '1234.56';

      const input = wrapper.find('input');
      input.setValue(TEST_STRING);

      expect(wrapper.emitted('input')[0][0]).toBe(parseFloat(TEST_STRING));
    });

    test('limits the value in a given "min"-"max" range', () => {
      const MAX = 100;
      const MIN = 0;
      const TEST_NUMBER = 50;

      wrapper.setProps({
        max: MAX,
        min: MIN,
      });

      const input = wrapper.find('input');

      input.setValue(TEST_NUMBER);
      expect(wrapper.emitted('input')[0][0]).toBe(TEST_NUMBER);

      input.setValue(MAX + 10);
      expect(wrapper.emitted('input')[1][0]).toBe(MAX);

      input.setValue(MIN - 10);
      expect(wrapper.emitted('input')[2][0]).toBe(MIN);
    });
  });

  test('Supports disabling', () => {
    wrapper.setProps({
      disabled: true,
    });
    expect(wrapper.find('input').attributes().disabled).toBe('disabled');
  });

  test('Can render an icon', () => {
    const ICON_PATH = 'fake/icon.svg';

    expect(wrapper.classes()).not.toContain(FIELD_CLASSES.HAS_ICON);
    expect(wrapper.find(ICON_SELECTOR).exists()).toBe(false);

    wrapper.setProps({
      icon: ICON_PATH,
    });

    expect(wrapper.classes()).toContain(FIELD_CLASSES.HAS_ICON);
    expect(wrapper.find(ICON_SELECTOR).exists()).toBe(true);
  });

  test('ignores LastPass auto fill', () => {
    expect(wrapper
      .find('input')
      .attributes()['data-lpignore'])
      .toBe('true');
  });

  test('custom validation prop validation', () => {
    expect(wrapper.vm.$options.props.customRules.validator([1])).toBeFalsy();
    expect(wrapper.vm.$options.props.customRules.validator([{ validate: () => true, errorMessage: '' }])).toBeTruthy();
  });

  test('custom validation error message', async () => {
    // Set a custom validation where input should match 'custom' keyword
    const errorMsg = 'Input should match custom keyword';
    const customKeyword = 'custom';
    wrapper.setProps({
      customRules: [{
        validate: value => value === 'custom',
        errorMessage: errorMsg,
      }],
      value: customKeyword,
    });

    // Makes sure it does not display error msg
    expect(wrapper.vm.$data.error).toBeNull();

    // Change value and look for error message
    wrapper.setData({
      value: TEST_VALUE,
    });
    // expect(wrapper.find(ERROR_SELECTOR).element.textContent).toBe(errorMsg);
  });
});
