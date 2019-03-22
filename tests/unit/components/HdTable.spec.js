import { mount } from '@vue/test-utils';
import HdTable from '@/components/HdTable.vue';

const headerData = ['a', 'b', 'c'];
const bodyData = [
  [1, 2, 3],
  [4, 5, 6],
];

describe('HdTable', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdTable, {
      propsData: {
        header: headerData,
        body: bodyData,
      },
    });
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('creates a <table>', () => {
    const table = wrapper.find('table');

    expect(table.exists()).toBe(true);
  });

  describe('props', () => {
    describe('fixed', () => {
      test('only accepts Boolean', () => {
        const { fixed } = wrapper.vm.$options.props;

        expect(fixed.type).toBe(Boolean);
      });

      test('defaults to false', () => {
        const { fixed } = wrapper.props();

        expect(fixed).toBe(false);
      });
    });

    describe('noWrap', () => {
      test('only accepts Boolean', () => {
        const { noWrap } = wrapper.vm.$options.props;

        expect(noWrap.type).toBe(Boolean);
      });

      test('defaults to false', () => {
        const { noWrap } = wrapper.props();

        expect(noWrap).toBe(false);
      });
    });

    describe('header', () => {
      test('only accepts Array', () => {
        const { header } = wrapper.vm.$options.props;

        expect(header.type).toBe(Array);
      });

      test('is required', () => {
        const { header } = wrapper.vm.$options.props;

        expect(header.required).toBe(true);
      });

      test('length should be bigger than 0', () => {
        const { header } = wrapper.vm.$options.props;

        expect(header.validator([])).toBe(false);
        expect(header.validator([1])).toBe(true);
      });
    });

    describe('body', () => {
      test('only accepts Array', () => {
        const { body } = wrapper.vm.$options.props;

        expect(body.type).toBe(Array);
      });

      test('is required', () => {
        const { body } = wrapper.vm.$options.props;

        expect(body.required).toBe(true);
      });

      test('length should be bigger than 0', () => {
        const { body } = wrapper.vm.$options.props;

        expect(body.validator([])).toBe(false);
        expect(body.validator([1])).toBe(true);
      });
    });

    describe('align', () => {
      test('only accepts String', () => {
        const { align } = wrapper.vm.$options.props;

        expect(align.type).toBe(String);
      });

      test('defaults to center', () => {
        const { align } = wrapper.props();

        expect(align).toBe('center');
      });
    });
  });

  describe('methods', () => {
    describe('isComponent', () => {
      test('false for random object', () => {
        const object = {};
        const { vm } = wrapper;

        expect(vm.isComponent(object)).toBe(false);
      });

      test('true for object with property component', () => {
        const object = { component: HdTable };
        const { vm } = wrapper;

        expect(vm.isComponent(object)).toBe(true);
      });
    });
  });
});
