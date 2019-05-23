import { mount } from '@vue/test-utils';
import HdPager from '@/components/HdPager.vue';

describe('HdPager', () => {
  // list of classNames we depend on
  const PAGER_ITEMS_SELECTOR = '.pager__items';
  const PAGER_ITEM_SELECTOR = '.pager__items__item';
  const ACTIVE_PAGER_ITEM_SELECTOR = `${PAGER_ITEM_SELECTOR}.isActive`;

  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdPager);
  });

  test('The component is rendered', () => {
    wrapper.setProps({ count: 10 });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Pre-selecting the active item should work', () => {
    wrapper.setProps({ count: 10, value: 3 });
    // We increment the nth-child by 1 because there is always a sizer item
    // before the pager items
    expect(wrapper.findAll(`${ACTIVE_PAGER_ITEM_SELECTOR}:nth-child(5)`).length).toBe(1);
  });

  test('By default, first item is selected', () => {
    wrapper.setProps({ count: 10 });
    // We increment the nth-child by 1 because there is always a sizer item
    // before the pager items
    expect(wrapper.findAll(`${ACTIVE_PAGER_ITEM_SELECTOR}:nth-child(2)`).length).toBe(1);
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

  describe('props', () => {
    describe('value', () => {
      test('only accepts Number', () => {
        const { value } = wrapper.vm.$options.props;

        expect(value.type).toBe(Number);
      });

      test('defaults to 0', () => {
        const { value } = wrapper.props();

        expect(value).toBe(0);
      });
    });

    describe('count', () => {
      test('only accepts Number', () => {
        const { count } = wrapper.vm.$options.props;

        expect(count.type).toBe(Number);
      });

      test('defaults to 1', () => {
        const { count } = wrapper.props();

        expect(count).toBe(1);
      });
    });

    describe('maxVisible', () => {
      test('only accepts Number', () => {
        const { maxVisible } = wrapper.vm.$options.props;

        expect(maxVisible.type).toBe(Number);
      });

      test('defaults to 7', () => {
        const { maxVisible } = wrapper.props();

        expect(maxVisible).toBe(7);
      });
    });
  });
});
