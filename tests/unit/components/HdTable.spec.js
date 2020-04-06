import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdTable from '@/components/HdTable.vue';

const headerData = ['a', 'b', 'c'];
const bodyData = [
  [1, 2, 3],
  [4, 5, 6],
];

const wrapperBuilder = wrapperFactoryBuilder(HdTable, {
  props: {
    header: headerData,
    body: bodyData,
  },
});

describe('HdTable', () => {
  it('renders component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('creates a <table>', () => {
    const wrapper = wrapperBuilder();
    const table = wrapper.find('table');

    expect(table.exists()).toBe(true);
  });

  describe('methods', () => {
    describe('isComponent', () => {
      it('false for random object', () => {
        const wrapper = wrapperBuilder();
        const object = {};

        expect(wrapper.vm.isComponent(object)).toBe(false);
      });

      it('true for object with property component', () => {
        const wrapper = wrapperBuilder();
        const object = { component: HdTable };

        expect(wrapper.vm.isComponent(object)).toBe(true);
      });
    });
  });
});
