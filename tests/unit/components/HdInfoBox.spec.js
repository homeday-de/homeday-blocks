import { mount } from '@vue/test-utils';
import HdInfoBox from '@/components/HdInfoBox.vue';

const MESSAGE = 'Hello, Homeday!';
const MESSAGE_SELECTOR = '.info-box__message';
describe('HdInfoBox', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdInfoBox, {
      propsData: {
        message: MESSAGE,
      },
    });
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders a message correctly', () => {
    expect(wrapper.find(MESSAGE_SELECTOR).text()).toBe(MESSAGE);
  });
});
