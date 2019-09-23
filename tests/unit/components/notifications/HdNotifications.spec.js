import { mount } from '@vue/test-utils';
import Vue from 'vue';
import HdNotifications from '@/components/notifications/HdNotifications.vue';

const NOTIFICATIONS = [
  {
    message: 'Hello <a href="http://localhost">Homeday!</a>',
  },
];

describe('HdNotifications', () => {
  let wrapper;
  let scrollHeightSpy = jest.fn();

  beforeEach(() => {
    wrapper = mount(HdNotifications, {
      propsData: {
        notifications: [],
      },
    });
  });

  afterEach(() => {
    scrollHeightSpy.mockRestore();
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('fires the heightChange event when height of the notifications changes', () => {
    scrollHeightSpy = jest.spyOn(wrapper.vm, 'getScrollHeight')
      .mockImplementation(
        // A random number, used just to make sure it's not 0 and that the height
        // actually changes
        () => 123,
      );

    wrapper.setProps({ notifications: NOTIFICATIONS });

    return Vue.nextTick()
      .then(() => {
        expect(wrapper.emitted('heightChange')).toBeTruthy();
      });
  });

  test('fires the route event on anchor click', () => {
    wrapper.setProps({ notifications: NOTIFICATIONS });

    const anchor = wrapper.find('a');

    anchor.trigger('click');
    expect(wrapper.emitted('route')).toBeTruthy();
    expect(wrapper.emitted('route')[0][0].path).toEqual(anchor.element.pathname);
  });
});
