import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdDashedList from '@/components/HdDashedList.vue';
import ITEMS from '@/stories/mocks/DASHED_LIST_ITEMS';

const ITEM_SELECTOR = '.dashed-list__item';
const LIST_WITH_EXPANDED_LABELS_CLASS = 'dashed-list--expanded-label';

const wrapperBuilder = wrapperFactoryBuilder(HdDashedList, {
  props: {
    items: ITEMS,
  },
});

describe('HdDashedList', () => {
  it('renders component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders items correctly', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.findAll(ITEM_SELECTOR).length).toEqual(4);
  });

  it('renders expanded labels if if the prop `expandedLabel` is true', async () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.classes()).not.toContain(LIST_WITH_EXPANDED_LABELS_CLASS);

    wrapper.setProps({
      expandedLabel: true,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.classes()).toContain(LIST_WITH_EXPANDED_LABELS_CLASS);
  });
});
