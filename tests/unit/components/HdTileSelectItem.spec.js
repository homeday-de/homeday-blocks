import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdTileSelectItem from '@/components/HdTileSelectItem.vue';

const model = 1;
const value = 2;
const wrapperFactory = wrapperFactoryBuilder(HdTileSelectItem, {
  props: {
    model,
    value,
  },
});

describe('HdTileSelectItem', () => {
  it('renders component not selected', () => {
    const wrapper = wrapperFactory();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders component selected', () => {
    const wrapper = wrapperFactory({
      props: {
        value: model,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders component with text as display', () => {
    const text = 'Two';
    const wrapper = wrapperFactory({
      props: { text },
    });

    expect(wrapper.text()).toBe(text);
  });

  it('emits value on click', () => {
    const wrapper = wrapperFactory();

    wrapper.trigger('click');

    expect(wrapper.emitted().input[0][0]).toBe(value);
  });

  it('emits value on keydown space', () => {
    const wrapper = wrapperFactory();

    wrapper.trigger('keydown.space');

    expect(wrapper.emitted().input[0][0]).toBe(value);
  });

  it('emits value on keydown enter', () => {
    const wrapper = wrapperFactory();

    wrapper.trigger('keydown.enter');

    expect(wrapper.emitted().input[0][0]).toBe(value);
  });
});
