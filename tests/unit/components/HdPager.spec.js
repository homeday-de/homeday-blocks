import { mount } from '@vue/test-utils';
import HdPager from '@/components/HdPager.vue';

describe('HdPager', () => {
  // list of classNames we depend on
  const PAGER_ITEMS_SELECTOR = '.pager__items';
  const PAGER_ITEM_SELECTOR = '.pager__items__item';
  const ACTIVE_PAGER_ITEM_SELECTOR = `${PAGER_ITEM_SELECTOR}.isActive`;

  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdPager, {
      // this is needed to trigger window events
      // when mounting to document, we need to call wrapper.destroy after
      // every test - https://vue-test-utils.vuejs.org/api/options.html#attachtodocument
      attachToDocument: true,
    });
  });

  test('The component is rendered', () => {
    wrapper.setProps({ count: 10 });
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.destroy();
  });

  test('Pre-selecting the active item should work', () => {
    wrapper.setProps({ count: 10, value: 3 });
    // We increment the nth-child by 1 because there is always a sizer item
    // before the pager items
    expect(wrapper.findAll(`${ACTIVE_PAGER_ITEM_SELECTOR}:nth-child(5)`).length).toBe(1);
    wrapper.destroy();
  });

  test('By default, first item is selected', () => {
    wrapper.setProps({ count: 10 });
    // We increment the nth-child by 1 because there is always a sizer item
    // before the pager items
    expect(wrapper.findAll(`${ACTIVE_PAGER_ITEM_SELECTOR}:nth-child(2)`).length).toBe(1);
    wrapper.destroy();
  });

  test('Pager item can be selected', () => {
    wrapper.setProps({ count: 10 });
    // select a pager item
    wrapper.find(`${PAGER_ITEM_SELECTOR}:nth-child(5)`).trigger('click');
    // confirm that input event is emitted
    expect(wrapper.emitted('input')).toBeTruthy();
    // And that expected payload is passed with the event
    const payload = wrapper.emitted('input')[0][0];
    expect(payload).toBe(3);
    wrapper.destroy();
  });

  test('Pager supports keyboard navigation', () => {
    wrapper.setProps({ count: 10, value: 3 });

    const pagerItems = wrapper.find(PAGER_ITEMS_SELECTOR);
    let payload;
    // Left arrow
    pagerItems.trigger('keydown.left', { key: 'ArrowLeft' });
    expect(wrapper.emitted('input')).toBeTruthy();
    // eslint-disable-next-line prefer-destructuring
    payload = wrapper.emitted('input')[0][0];
    expect(payload).toBe(2);
    // Up arrow
    pagerItems.trigger('keydown.up', { key: 'ArrowUp' });
    expect(wrapper.emitted('input')).toBeTruthy();
    // eslint-disable-next-line prefer-destructuring
    payload = wrapper.emitted('input')[1][0];
    expect(payload).toBe(2);
    // Right arrow
    pagerItems.trigger('keydown.right', { key: 'ArrowRight' });
    expect(wrapper.emitted('input')).toBeTruthy();
    // eslint-disable-next-line prefer-destructuring
    payload = wrapper.emitted('input')[2][0];
    expect(payload).toBe(4);
    // Down arrow
    pagerItems.trigger('keydown.down', { key: 'ArrowDown' });
    expect(wrapper.emitted('input')).toBeTruthy();
    // eslint-disable-next-line prefer-destructuring
    payload = wrapper.emitted('input')[3][0];
    expect(payload).toBe(4);
  });
});
