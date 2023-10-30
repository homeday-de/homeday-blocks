import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdTagsList from '@/components/HdTagsList.vue';
import TYPES from '@/components/HdTagTypes';

const ITEMS = ['foo', 'bar'];

const wrapperBuilder = wrapperFactoryBuilder(HdTagsList, {
  props: {
    items: ITEMS,
  },
});

describe('HdTagsList', () => {
  it('renders default component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });
  it('renders secondary component', () => {
    const wrapper = wrapperBuilder({
      props: {
        items: ITEMS,
        modifier: TYPES.SECONDARY,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
