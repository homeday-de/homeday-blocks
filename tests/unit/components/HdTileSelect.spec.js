import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdTileSelect from '@/components/form/HdTileSelect.vue';

const HELPER_SELECTOR = '.field__helper';
const FIELD_ERROR_CLASS = 'field--errored';

const items = [1, 2, 3];
const value = 0;
const wrapperFactory = wrapperFactoryBuilder(HdTileSelect, {
  props: {
    value,
    items,
    name: 'myTileSelect',
  },
});

describe('HdTileSelect', () => {
  it('renders component not selected', () => {
    const wrapper = wrapperFactory();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders component selected', () => {
    const wrapper = wrapperFactory({
      props: {
        value: items[0],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('accepts items entries as objects', () => {
    const objectItems = [
      {
        text: 'Yes',
        value: true,
      },
      {
        text: 'No',
        value: false,
      },
    ];
    const wrapper = wrapperFactory({
      props: {
        items: objectItems,
      },
    });
    const button = wrapper.get('button');

    expect(button.text()).toBe(objectItems[0].text);
  });

  it('emits input on item selected', () => {
    const wrapper = wrapperFactory();
    const button = wrapper.get('button');

    button.trigger('click');

    expect(wrapper.emitted().input[0][0]).toBe(items[0]);
  });

  it('applies formatter to text', () => {
    const formatter = (text) => (`formatted ${text}`);
    const wrapper = wrapperFactory({
      props: { formatter },
    });
    const formattedText = formatter(items[0]);
    const button = wrapper.get('button');

    expect(button.text()).toBe(formattedText);
  });

  it('allows custom new value', () => {
    const wrapper = wrapperFactory({
      props: {
        acceptNewValue: true,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('validates requiredness', async () => {
    const wrapper = wrapperFactory({
      props: {
        items,
        value: null,
        required: true,
      },
    });

    expect(wrapper.vm.validate()).toBe(false);

    await wrapper.vm.$nextTick();

    expect(wrapper.find(HELPER_SELECTOR).text().length).toBeGreaterThan(1);
    expect(wrapper.classes()).toContain(FIELD_ERROR_CLASS);

    wrapper.setProps({
      required: false,
    });

    expect(wrapper.vm.validate()).toBe(true);

    await wrapper.vm.$nextTick();

    expect(wrapper.find(HELPER_SELECTOR).text().length).toBeLessThanOrEqual(1);
    expect(wrapper.classes()).not.toContain(FIELD_ERROR_CLASS);
  });
});
