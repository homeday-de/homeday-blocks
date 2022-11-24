import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdPager from '@/components/HdPager.vue';
import { Wide, White, Condensed } from 'homeday-blocks/src/stories/HdPager.stories';

const wrapperBuilder = wrapperFactoryBuilder(HdPager, {
  props: {
    count: 10,
  },
});

describe('HdPager', () => {
  // list of classNames we depend on
  const PAGER_ITEMS_SELECTOR = '.pager__items';
  const PAGER_ITEM_SELECTOR = '.pager__items__item';
  const ACTIVE_PAGER_ITEM_SELECTOR = `${PAGER_ITEM_SELECTOR}.isActive`;

  it('The component is rendered', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Pre-selecting the active item should work', () => {
    const wrapper = wrapperBuilder({
      props: {
        value: 3,
      },
    });

    // We increment the nth-child by 1 because there is always a sizer item
    // before the pager items
    expect(wrapper.findAll(`${ACTIVE_PAGER_ITEM_SELECTOR}:nth-child(5)`).length).toBe(1);
  });

  it('By default, first item is selected', () => {
    const wrapper = wrapperBuilder();

    // We increment the nth-child by 1 because there is always a sizer item
    // before the pager items
    expect(wrapper.findAll(`${ACTIVE_PAGER_ITEM_SELECTOR}:nth-child(2)`).length).toBe(1);
  });

  it('Pager item can be selected', () => {
    const wrapper = wrapperBuilder();

    // select a pager item
    wrapper.find(`${PAGER_ITEM_SELECTOR}:nth-child(5)`).trigger('click');
    // confirm that input event is emitted
    expect(wrapper.emitted('input')).toBeTruthy();
    // And that expected payload is passed with the event
    const payload = wrapper.emitted('input')[0][0];
    expect(payload).toBe(3);
  });

  it('Pager supports keyboard navigation', () => {
    const wrapper = wrapperBuilder({
      props: {
        value: 3,
      },
    });

    const pagerItems = wrapper.find(PAGER_ITEMS_SELECTOR);
    let payload;
    // Left arrow
    pagerItems.trigger('keydown.left');
    expect(wrapper.emitted('input')).toBeTruthy();
    // eslint-disable-next-line prefer-destructuring
    payload = wrapper.emitted('input')[0][0];
    expect(payload).toBe(2);
    // Up arrow
    pagerItems.trigger('keydown.up');
    expect(wrapper.emitted('input')).toBeTruthy();
    // eslint-disable-next-line prefer-destructuring
    payload = wrapper.emitted('input')[1][0];
    expect(payload).toBe(2);
    // Right arrow
    pagerItems.trigger('keydown.right');
    expect(wrapper.emitted('input')).toBeTruthy();
    // eslint-disable-next-line prefer-destructuring
    payload = wrapper.emitted('input')[2][0];
    expect(payload).toBe(4);
    // Down arrow
    pagerItems.trigger('keydown.down');
    expect(wrapper.emitted('input')).toBeTruthy();
    // eslint-disable-next-line prefer-destructuring
    payload = wrapper.emitted('input')[3][0];
    expect(payload).toBe(4);
  });

  it('should render the wide pager', () => {
    const wrapper = wrapperBuilder({
      props: Wide.args,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render the wide pager with white color', () => {
    const wrapper = wrapperBuilder({
      props: White.args,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render the condensed pager', () => {
    const wrapper = wrapperBuilder({
      props: Condensed.args,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
