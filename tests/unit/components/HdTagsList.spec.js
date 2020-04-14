import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdTagsList from '@/components/HdTagsList.vue';

const ITEMS = [
  'foo',
  'bar',
];

const wrapperBuilder = wrapperFactoryBuilder(HdTagsList, {
  props: {
    items: ITEMS,
  },
});

describe('HdTagsList', () => {
  it('renders component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
