import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdSplitInput from '@/components/form/HdSplitInput.vue';

const HELPER_SELECTOR = '.field__helper';
const SEPARATOR_SELECTOR = '.field__double-input__separator__symbol';
const ICON_SELECTOR = '.field__icon';
const FIELD_ERROR_CLASS = 'field--errored';

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

const wrapperBuilder = wrapperFactoryBuilder(HdSplitInput, {
  props: {
    name: 'test name',
    label: 'test label',
    fields: TEST_FIELDS,
  },
});

describe('HdSplitInput', () => {
  it('is rendered as expected', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('is rendered with prefilled value', () => {
    const TEST_NAME = TEST_FIELDS[0].name;
    const wrapper = wrapperBuilder({
      props: {
        value: {
          [TEST_NAME]: TEST_VALUE,
        },
      },
    });

    expect(wrapper.find(`[name=${TEST_NAME}]`).element.value).toBe(TEST_VALUE);
  });

  it('can customize the separator', () => {
    const CUSTOM_SEPARATOR = '777';
    const wrapper = wrapperBuilder({
      props: {
        separator: CUSTOM_SEPARATOR,
      },
    });
    const wrongSeparators = wrapper
      .findAll(SEPARATOR_SELECTOR)
      .filter((separator) => separator.text() !== CUSTOM_SEPARATOR);

    expect(wrongSeparators.length).toBe(0);
  });

  describe('emits events with the right payload', () => {
    it('input', async () => {
      const wrapper = wrapperBuilder();
      const TEST_NAME = TEST_FIELDS[0].name;

      wrapper.find(`[name=${TEST_NAME}]`).setValue(TEST_VALUE);

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('input')[0][0][TEST_NAME]).toBe(TEST_VALUE);
    });

    it('fieldFocus', () => {
      const wrapper = wrapperBuilder();
      const TEST_FIELD = TEST_FIELDS[0];

      wrapper.find(`[name=${TEST_FIELD.name}]`).trigger('focus');

      expect(wrapper.emitted('fieldFocus')[0][0]).toEqual(TEST_FIELD);
    });

    it('fieldBlur', () => {
      const wrapper = wrapperBuilder();
      const TEST_FIELD = TEST_FIELDS[1];

      wrapper.find(`[name=${TEST_FIELD.name}]`).trigger('blur');

      expect(wrapper.emitted('fieldBlur')[0][0]).toEqual(TEST_FIELD);
    });
  });

  it('allows setting a helper', async () => {
    const wrapper = wrapperBuilder();
    const TEST_HTML = '<b>test</b> test';

    wrapper.vm.showHelper(TEST_HTML);

    await wrapper.vm.$nextTick();

    expect(wrapper.find(HELPER_SELECTOR).element.innerHTML).toBe(TEST_HTML);
  });

  it('validates requiredness', async () => {
    const wrapper = wrapperBuilder({
      props: {
        value: {},
        required: true,
      },
    });

    expect(wrapper.vm.validate()).toBe(false);

    await wrapper.vm.$nextTick();

    const $helper = wrapper.find(HELPER_SELECTOR);

    expect($helper.text().length).toBeGreaterThan(1);
    expect(wrapper.classes()).toContain(FIELD_ERROR_CLASS);

    await wrapper.setProps({
      required: false,
    });

    expect(wrapper.vm.validate()).toBe(true);
  });

  it('Supports disabling', () => {
    const wrapper = wrapperBuilder({
      props: {
        disabled: true,
      },
    });
    const enabledInputs = wrapper
      .findAll('input')
      .filter((input) => input.attributes().disabled !== 'disabled');

    expect(enabledInputs.length).toBe(0);
  });

  it('Can render an icon', async () => {
    const wrapper = wrapperBuilder();
    const ICON_PATH = 'https://placeholder.pics/svg/24';

    expect(wrapper.find(ICON_SELECTOR).exists()).toBe(false);

    wrapper.setProps({
      icon: ICON_PATH,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(ICON_SELECTOR).exists()).toBe(true);
  });
});
