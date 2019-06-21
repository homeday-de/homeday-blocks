import {
  wrapperFactoryBuilder,
  getLastEventPayload,
} from 'tests/unit/helpers';
import HdRadio from '@/components/form/HdRadio.vue';
// reusing items from the stories
import ITEMS from '@/stories/mocks/FORM_ITEMS';

// list of selectors we depend on
const SELECTED_ITEM_SELECTOR = '.isSelected';
const VERTICAL_CLASSNAME = 'radio-wrapper--vertical';
const ITEMS_SELECTOR = { ref: 'items' };

describe('HdRadio', () => {
  const wrapperFactory = wrapperFactoryBuilder(HdRadio, {
    propsData: {
      name: 'testRadio',
      label: 'test radio label',
      items: ITEMS,
    },
  });

  let wrapper;
  beforeEach(() => {
    wrapper = wrapperFactory();
  });

  test('is rendered as expected', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders with preselected item', () => {
    wrapper = wrapperFactory({
      propsData: {
        value: ITEMS[2].value,
      },
    });
    expect(wrapper.findAll(SELECTED_ITEM_SELECTOR).length).toBe(1);
  });

  test('emits `input` event with the right payload on click', () => {
    const ITEM_INDEX = 1;
    wrapper.findAll(ITEMS_SELECTOR).at(ITEM_INDEX).trigger('click');
    expect(wrapper.emitted('input')[0][0]).toEqual(ITEMS[ITEM_INDEX].value);
  });

  test('emits `input` event with the right payload on arrows keydown', () => {
    const INITIAL_ITEM_INDEX = 2;
    wrapper.setProps({ value: ITEMS[INITIAL_ITEM_INDEX].value });
    const getLastInputEventPayload = () => getLastEventPayload({ wrapper, eventName: 'input' });
    // The keydown event handler is the same for all the items
    // so it doesn't matter which items fires it. We pick the first one in this test
    const itemWrapper = wrapper.find(ITEMS_SELECTOR);

    // We test the "next" keys
    ['Down', 'Right'].forEach((key) => {
      itemWrapper.trigger('keydown', {
        key,
      });
      expect(getLastInputEventPayload())
        .toEqual(ITEMS[INITIAL_ITEM_INDEX + 1].value);
    });

    // We test the "previous" keys
    ['Up', 'Left'].forEach((key) => {
      itemWrapper.trigger('keydown', {
        key,
      });
      expect(getLastInputEventPayload())
        .toEqual(ITEMS[INITIAL_ITEM_INDEX - 1].value);
    });

    // We test the handling of the items' array bounds
    wrapper.setProps({ value: ITEMS[ITEMS.length - 1].value });
    ['Down', 'Right'].forEach((key) => {
      itemWrapper.trigger('keydown', {
        key,
      });
      expect(getLastInputEventPayload())
        .toEqual(ITEMS[0].value);
    });

    wrapper.setProps({ value: ITEMS[0].value });
    ['Up', 'Left'].forEach((key) => {
      itemWrapper.trigger('keydown', {
        key,
      });
      expect(getLastInputEventPayload())
        .toEqual(ITEMS[ITEMS.length - 1].value);
    });
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

  test('Supports disabling', () => {
    wrapper.setProps({
      disabled: true,
    });
    expect(wrapper.find('input').attributes().disabled).toBe('disabled');
  });
});
