import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdSelect from '@/components/form/HdSelect.vue';
import ITEMS from '@/stories/mocks/FORM_ITEMS';
import FIELD_CLASSES from './FIELD_CLASSES';

const ERROR_SELECTOR = '.field__error';
const HELPER_SELECTOR = '.field__error--helper';
const ICON_SELECTOR = '.field__icon';

const wrapperBuilder = wrapperFactoryBuilder(HdSelect, {
  props: {
    name: 'testSelect',
    label: 'test select label',
    options: ITEMS,
  },
});

describe('HdSelect', () => {
  it('is rendered as expected', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders with preselected item', () => {
    const ITEM_VALUE = ITEMS[2].value;
    const wrapper = wrapperBuilder({
      props: {
        value: ITEM_VALUE,
      },
    });

    expect(wrapper.find('select').element.value).toBe(ITEM_VALUE);
  });

  it('can change the selected item', () => {
    const ITEM_VALUE = ITEMS[2].value;
    const wrapper = wrapperBuilder({
      props: {
        value: ITEM_VALUE,
      },
    });

    expect(wrapper.find('select').element.value).toBe(ITEM_VALUE);
  });

  it('emits `input` event with the right payload', async () => {
    const ITEM_INDEX = 1;
    const wrapper = wrapperBuilder();

    wrapper.findAll('option').at(ITEM_INDEX).setSelected();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')[0][0]).toEqual(ITEMS[ITEM_INDEX].value);
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
        value: undefined,
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

    expect(wrapper.find('select').attributes().disabled).toBe('disabled');
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
