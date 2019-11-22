import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import FIELD_CLASSES from './FIELD_CLASSES';
import HdSplitInput from '@/components/form/HdSplitInput.vue';

const ERROR_SELECTOR = '.field__error';
const HELPER_SELECTOR = '.field__error--helper';
const SEPARATOR_SELECTOR = '.field__double-input__separator__symbol';
const ICON_SELECTOR = '.field__icon';

const TEST_VALUE = 'new value';
const TEST_FIELDS = [
  {
    placeholder: 'Input 1',
    name: 'input1',
  },
  {
    placeholder: 'Input 2',
    name: 'input2',
  },
];

describe('HdSplitInput', () => {
  const wrapperFactory = wrapperFactoryBuilder(HdSplitInput, {
    propsData: {
      name: 'test name',
      label: 'test label',
      fields: TEST_FIELDS,
    },
  });

  let wrapper;
  beforeEach(() => {
    wrapper = wrapperFactory();
  });

  test('is rendered as expected', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('is rendered with prefilled value', () => {
    const TEST_NAME = TEST_FIELDS[0].name;
    wrapper = wrapperFactory({
      propsData: {
        value: {
          [TEST_NAME]: TEST_VALUE,
        },
      },
    });
    expect(wrapper.find(`[name=${TEST_NAME}]`).element.value).toBe(TEST_VALUE);
  });

  test('can customize the separator', () => {
    const CUSTOM_SEPARATOR = '777';
    wrapper.setProps({
      separator: CUSTOM_SEPARATOR,
    });
    const wrongSeparators = wrapper
      .findAll(SEPARATOR_SELECTOR)
      .filter(separator => separator.text() !== CUSTOM_SEPARATOR);
    expect(wrongSeparators.length).toBe(0);
  });

  describe('emits events with the right payload', () => {
    test('input', () => {
      const TEST_NAME = TEST_FIELDS[0].name;
      wrapper.find(`[name=${TEST_NAME}]`).setValue(TEST_VALUE);
      expect(wrapper.emitted('input')[0][0][TEST_NAME]).toBe(TEST_VALUE);
    });
    test('fieldFocus', () => {
      const TEST_FIELD = TEST_FIELDS[0];
      wrapper.find(`[name=${TEST_FIELD.name}]`).trigger('focus');
      expect(wrapper.emitted('fieldFocus')[0][0]).toEqual(TEST_FIELD);
    });
    test('fieldBlur', () => {
      const TEST_FIELD = TEST_FIELDS[1];
      wrapper.find(`[name=${TEST_FIELD.name}]`).trigger('blur');
      expect(wrapper.emitted('fieldBlur')[0][0]).toEqual(TEST_FIELD);
    });
  });

  test('allows setting a helper', () => {
    const TEST_HTML = '<b>test</b> test';
    wrapper.vm.showHelper(TEST_HTML);
    expect(wrapper.find(HELPER_SELECTOR).element.innerHTML).toBe(TEST_HTML);
  });

  test('validates requiredness', () => {
    wrapper = wrapperFactory({
      propsData: {
        value: {},
        required: true,
      },
    });
    expect(wrapper.vm.validate()).toBe(false);
    expect(wrapper.find(ERROR_SELECTOR).text()).toBeTruthy();
    expect(wrapper.classes()).toContain(FIELD_CLASSES.INVALID);
    wrapper.setProps({
      required: false,
    });
    expect(wrapper.vm.validate()).toBe(true);
  });

  test('Supports disabling', () => {
    wrapper.setProps({
      disabled: true,
    });
    const enabledInputs = wrapper
      .findAll('input')
      .filter(input => input.attributes().disabled !== 'disabled');
    expect(enabledInputs.length).toBe(0);
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
});
