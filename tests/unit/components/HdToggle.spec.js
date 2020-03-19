import { shallowMount } from '@vue/test-utils';
import HdToggle from '@/components/HdToggle.vue';

const BODY_SELECTOR = '.hd-toggle__body';
const TOGGLE_OPEN_SELECTOR = '.hd-toggle--is-open';

const CONTENT = '<b>This is the HdToggle body.</b>';

describe('HdModal', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HdToggle, {
      slots: {
        default: CONTENT,
      },
    });
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders the slot correctly', () => {
    expect(wrapper.find(BODY_SELECTOR).element.innerHTML).toBe(CONTENT);
  });

  test('toggles the body with the prop `open` true/false', () => {
    expect(wrapper.find(TOGGLE_OPEN_SELECTOR).exists()).toBeTruthy();

    wrapper.setProps({
      open: false,
    });

    expect(wrapper.find(TOGGLE_OPEN_SELECTOR).exists()).toBeFalsy();
  });
});
