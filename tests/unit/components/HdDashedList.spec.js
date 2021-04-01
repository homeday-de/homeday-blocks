import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdDashedList from '@/components/HdDashedList.vue';
import ITEMS from '@/stories/mocks/DASHED_LIST_ITEMS';

const wrapperFactory = wrapperFactoryBuilder(HdDashedList);

describe('HdDashedList', () => {
  const build = (args) => {
    const wrapper = wrapperFactory({
      ...args,
      props: {
        items: ITEMS,
        ...args?.props,
      },
    });

    return {
      wrapper,
      items: () => wrapper.findAll('.dashed-list__item'),
      expandedLabels: () => wrapper.findAll('.dashed-list__item--expanded-label'),
    };
  };

  it('renders component', () => {
    const { wrapper } = build();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders items', () => {
    const { items } = build();

    expect(items()).toHaveLength(4);

    const expectItem = (item) => {
      const stripSpaces = (text) => text.replace(/\s/g, '');
      const actual = stripSpaces(item.text());

      return {
        toContain: (matcher) => expect(actual).toEqual(stripSpaces(Object.values(matcher).join(''))),
      };
    };

    expectItem(items().at(0)).toContain(ITEMS[0]);
    expectItem(items().at(1)).toContain(ITEMS[1]);
    expectItem(items().at(2)).toContain(ITEMS[2].items[0]);
    expectItem(items().at(3)).toContain(ITEMS[2].items[1]);
  });

  it('renders expanded labels if if the prop `expandedLabel` is true', async () => {
    const { wrapper, expandedLabels } = build();

    expect(expandedLabels()).toHaveLength(0);

    wrapper.setProps({ expandedLabel: true });
    await wrapper.vm.$nextTick();

    expect(expandedLabels()).toHaveLength(1);
  });
});
