import { mount } from '@vue/test-utils';
import HdRadio from '@/components/form/HdRadio.vue';
// reusing items from the stories
import ITEMS from '@/stories/mocks/FORM_ITEMS';

describe('HdRadio', () => {
  // list of selectors we depend on
  const SELECTED_ITEM_SELECTOR = '.isSelected';
  const VERTICAL_CLASSNAME = 'radio-wrapper--vertical';
  const ITEMS_SELECTOR = { ref: 'items' };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdRadio, {
      propsData: {
        name: 'testRadio',
        label: 'test radio label',
        items: ITEMS,
      },
    });
  });

  test('is rendered as expected', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders with preselected item', () => {
    wrapper.setProps({ value: ITEMS[2].value });
    expect(wrapper.findAll(SELECTED_ITEM_SELECTOR).length).toBe(1);
  });

  test('emits `input` event with the right payload', () => {
    const ITEM_INDEX = 1;
    wrapper.findAll(ITEMS_SELECTOR).at(ITEM_INDEX).trigger('click');
    expect(wrapper.emitted('input')[0][0]).toEqual(ITEMS[ITEM_INDEX].value);
  });

  test('can show items vertically', () => {
    wrapper.setProps({
      vertical: true,
    });
    expect(wrapper.classes()).toContain(VERTICAL_CLASSNAME);
  });

  test('validates requiredness', () => {
    wrapper.setProps({
      value: undefined, // or any other `value` that we don't have in the array of items
    });
    // We make sure nothing is selected so we can properly test the validation
    expect(wrapper.findAll(SELECTED_ITEM_SELECTOR).length).toBe(0);
    expect(wrapper.vm.validate()).toBe(true);
    wrapper.setProps({
      required: true,
    });
    expect(wrapper.vm.validate()).toBe(false);
  });
});
