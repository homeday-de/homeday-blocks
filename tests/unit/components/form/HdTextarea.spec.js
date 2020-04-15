import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import FIELD_CLASSES from './FIELD_CLASSES';
import HdTextarea from '@/components/form/HdTextarea.vue';

const ERROR_SELECTOR = '.field__error';
const HELPER_SELECTOR = '.field__error--helper';
const TEST_VALUE = 'new value';
const ICON_SELECTOR = '.field__icon';

const wrapperBuilder = wrapperFactoryBuilder(HdTextarea, {
  props: {
    name: 'test name',
    label: 'test label',
    placeholder: 'test placeholder',
  },
});

describe('HdTextarea', () => {
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

    expect(wrapper.find('textarea').element.value).toBe(TEST_VALUE);
  });

  it('emits `input` event with the right payload', () => {
    const wrapper = wrapperBuilder();

    wrapper.get('textarea').setValue(TEST_VALUE);

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

    wrapper.setProps({
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

    expect(wrapper.find('textarea').attributes().disabled).toBe('disabled');
  });

  it('Can render an icon', async () => {
    const wrapper = wrapperBuilder();
    const ICON_PATH = 'fake/icon.svg';

    expect(wrapper.classes()).not.toContain(FIELD_CLASSES.HAS_ICON);
    expect(wrapper.find(ICON_SELECTOR).exists()).toBe(false);

    wrapper.setProps({
      icon: ICON_PATH,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.classes()).toContain(FIELD_CLASSES.HAS_ICON);
    expect(wrapper.find(ICON_SELECTOR).exists()).toBe(true);
  });
});
