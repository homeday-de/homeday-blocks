import { mount } from '@vue/test-utils';
import HdTagsList from '@/components/HdTagsList.vue';

const ITEMS = [
  'foo',
  'bar',
];

describe('HdTagsList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdTagsList, {
      propsData: {
        items: ITEMS,
      },
    });
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
