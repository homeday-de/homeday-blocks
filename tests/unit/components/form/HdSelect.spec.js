import { mount } from '@vue/test-utils';
import HdSelect from '@/components/form/HdSelect.vue';
import ITEMS from '@/stories/mocks/FORM_ITEMS';
import FIELD_CLASSES from './FIELD_CLASSES';

const ERROR_SELECTOR = '.field__error';

describe('HdSelect', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdSelect, {
      propsData: {
        name: 'testSelect',
        label: 'test select label',
        options: ITEMS,
      },
    });
  });

  test('is rendered as expected', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('can change the selected item', () => {
    const ITEM_VALUE = ITEMS[2].value;
    wrapper.setProps({ value: ITEM_VALUE });
    expect(wrapper.find('select').element.value).toBe(ITEM_VALUE);
  });

  test('emits `input` event with the right payload', () => {
    const ITEM_INDEX = 1;
    wrapper.findAll('option').at(ITEM_INDEX).setSelected();
    expect(wrapper.emitted('input')[0][0]).toEqual(ITEMS[ITEM_INDEX].value);
  });

  test('validates requiredness', () => {
    wrapper.setProps({
      value: undefined,
      required: true,
    });
    expect(wrapper.vm.validate()).toBe(false);
    expect(wrapper.find(ERROR_SELECTOR).text()).toBeTruthy();
    expect(wrapper.classes()).toContain(FIELD_CLASSES.INVALID);
    wrapper.setProps({
      required: false,
    });
    expect(wrapper.vm.validate()).toBe(true);
  });
});
