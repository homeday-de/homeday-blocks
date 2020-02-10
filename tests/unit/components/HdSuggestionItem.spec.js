import { mount } from '@vue/test-utils';
import HdSuggestionItem from '@/components/HdSuggestionItem.vue';

describe('HdSuggestionItem', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdSuggestionItem, {
      propsData: {
        line1: 'Lorem ipsum dolor sit amet',
        line2: 'onsectetur adipiscing elit',
        icon: 'https://dummyimage.com/32x32',
        highlightString: 'consectetur',
        isSelected: true,
      },
    });
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
