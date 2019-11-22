import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import FIELD_CLASSES from './FIELD_CLASSES';
import HdTextarea from '@/components/form/HdTextarea.vue';

const ERROR_SELECTOR = '.field__error';
const HELPER_SELECTOR = '.field__error--helper';
const TEST_VALUE = 'new value';
const ICON_SELECTOR = '.field__icon';

describe('HdTextarea', () => {
  const wrapperFactory = wrapperFactoryBuilder(
    HdTextarea,
    {
      propsData: {
        name: 'test name',
        label: 'test label',
        placeholder: 'test placeholder',
      },
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
    expect(wrapper.find('textarea').element.value).toBe(TEST_VALUE);
  });

  test('updates the field on change of the prop `value`', () => {
    wrapper.setProps({ value: TEST_VALUE });
    expect(wrapper.find('textarea').element.value).toBe(TEST_VALUE);
  });

  test('emits `input` event with the right payload', () => {
    wrapper.find('textarea').setValue(TEST_VALUE);
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
    wrapper.setProps({
      required: false,
    });
    expect(wrapper.vm.validate()).toBe(true);
  });

  test('Supports disabling', () => {
    wrapper.setProps({
      disabled: true,
    });
    expect(wrapper.find('textarea').attributes().disabled).toBe('disabled');
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
