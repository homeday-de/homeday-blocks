import { mount } from '@vue/test-utils';
import HdTabsMenu from '@/components/HdTabsMenu.vue';
// reusing items from the stories
import ITEMS from '@/stories/mocks/MENU_ITEMS';

describe('HdTabsMenu', () => {
  // list of classNames we depend on
  const MENU_ITEM_SELECTOR = '.js-tabs-menu-item';
  const ACTIVE_MENU_ITEM_SELECTOR = '.js-tabs-menu-item.isActive';

  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdTabsMenu, {
      propsData: {
        items: ITEMS,
      },
    });
  });

  test('The component is rendered', () => {
    wrapper.setProps({ value: ITEMS[1].value });
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.destroy();
  });

  test('Rendered selected menu item should match passed in preselected item', () => {
    wrapper.setProps({ value: ITEMS[1].value });
    expect(wrapper.findAll(ACTIVE_MENU_ITEM_SELECTOR).length).toBe(1);
    wrapper.destroy();
  });

  test('By default, no menu item is selected', () => {
    expect(wrapper.findAll(ACTIVE_MENU_ITEM_SELECTOR).length).toBe(0);
    wrapper.destroy();
  });

  test('Menu item can be selected', () => {
    // select a menu item
    wrapper.find(MENU_ITEM_SELECTOR).trigger('click');
    // confirm that input event is emitted
    expect(wrapper.emitted('input')).toBeTruthy();
    // And that expected payload is passed with the event
    const payload = wrapper.emitted('input')[0][0];
    expect(payload).toBe(ITEMS[0].value);
    // check that a menu item is selected
    wrapper.setProps({ value: payload });
    expect(wrapper.findAll(ACTIVE_MENU_ITEM_SELECTOR).length).toBe(1);
    wrapper.destroy();
  });

  describe('props', () => {
    describe('items', () => {
      test('only accepts Array', () => {
        const { items } = wrapper.vm.$options.props;

        expect(items.type).toBe(Array);
      });

      test('defaults to empty array', () => {
        const { items } = wrapper.vm.$options.props;

        expect(items.default().length).toBe(0);
      });
    });

    describe('value', () => {
      test('only accepts String', () => {
        const { value } = wrapper.vm.$options.props;

        expect(value.type).toBe(String);
      });

      test('defaults to empty string', () => {
        const { value } = wrapper.props();

        expect(value).toBe('');
      });
    });
  });
});
