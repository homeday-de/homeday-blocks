import { shallowMount } from '@vue/test-utils';
import HdDashedList from '@/components/HdDashedList.vue';
import ITEMS from '@/stories/mocks/DASHED_LIST_ITEMS';

const ITEM_SELECTOR = '.dashed-list__item';
const LIST_WITH_EXPANDED_LABELS_CLASS = 'dashed-list--expanded-label';

describe('HdDashedList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HdDashedList, {
      propsData: {
        items: ITEMS,
      },
    });
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders items correctly', () => {
    expect(wrapper.findAll(ITEM_SELECTOR).length).toEqual(ITEMS.length);
  });

  test('renders expanded labels if if the prop `expandedLabel` is true', () => {
    expect(wrapper.classes()).not.toContain(LIST_WITH_EXPANDED_LABELS_CLASS);

    wrapper.setProps({
      expandedLabel: true,
    });

    expect(wrapper.classes()).toContain(LIST_WITH_EXPANDED_LABELS_CLASS);
  });
});
