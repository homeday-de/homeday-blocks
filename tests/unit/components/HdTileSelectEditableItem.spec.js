import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdTileSelectEditableItem from '@/components/HdTileSelectEditableItem.vue';

const model = 1;
const value = 2;
const wrapperFactory = wrapperFactoryBuilder(HdTileSelectEditableItem, {
  props: {
    model,
    value,
  },
});

describe('HdTileSelectEditableItem', () => {
  it('renders component not editable', () => {
    const wrapper = wrapperFactory();

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.get('button')).toBeTruthy();
  });

  it('render component editable', () => {
    const wrapper = wrapperFactory({
      data: {
        isEditing: true,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.get('input')).toBeTruthy();
  });

  it('emits value on inpu', () => {
    const newValue = '3';
    const wrapper = wrapperFactory({
      data: {
        isEditing: true,
      },
    });
    wrapper.setValue(newValue);

    expect(wrapper.emitted().input[0][0]).toBe(newValue);
  });
});
