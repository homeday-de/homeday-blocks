import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdTabsMenu from '@/components/HdTabsMenu.vue';
import ITEMS from '@/stories/mocks/MENU_ITEMS';

const MENU_ITEM_SELECTOR = '.js-tabs-menu-item';
const ACTIVE_MENU_ITEM_SELECTOR = '.js-tabs-menu-item.isActive';

const wrapperBuilder = wrapperFactoryBuilder(HdTabsMenu, {
  props: {
    items: ITEMS,
  },
});

describe('HdTabsMenu', () => {
  it('The component is rendered', () => {
    const wrapper = wrapperBuilder({
      props: {
        value: ITEMS[1].value,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Rendered selected menu item should match passed in preselected item', () => {
    const wrapper = wrapperBuilder({
      props: {
        value: ITEMS[1].value,
      },
    });

    expect(wrapper.findAll(ACTIVE_MENU_ITEM_SELECTOR).length).toBe(1);
  });

  it('By default, no menu item is selected', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.findAll(ACTIVE_MENU_ITEM_SELECTOR).length).toBe(0);
  });

  it('Menu item can be selected', async () => {
    const wrapper = wrapperBuilder();

    // select a menu item
    wrapper.find(MENU_ITEM_SELECTOR).trigger('click');
    // confirm that input event is emitted
    expect(wrapper.emitted('input')).toBeTruthy();
    // And that expected payload is passed with the event
    const payload = wrapper.emitted('input')[0][0];
    expect(payload).toBe(ITEMS[0].value);
    // check that a menu item is selected
    wrapper.setProps({ value: payload });

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll(ACTIVE_MENU_ITEM_SELECTOR).length).toBe(1);
  });
});
