import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdInputFormatter from '@/components/form/HdInputFormatter.vue';

const defaultType = 'number';
const defaultValue = 123;
const wrapperBuilder = wrapperFactoryBuilder(HdInputFormatter, {
  props: {
    name: 'input-name',
    type: defaultType,
    value: defaultValue,
    formatter: jest.fn(),
  },
});

describe('HdInputFormatter', () => {
  it('should render with type text', () => {
    const wrapper = wrapperBuilder();
    const $input = wrapper.find('input').element;

    expect($input.type).toBe('text');
  });

  it('should render with formatted value', () => {
    const formattedValue = '1,23';
    const wrapper = wrapperBuilder({
      props: {
        formatter: () => formattedValue,
      },
    });
    const $input = wrapper.find('input').element;

    expect($input.value).toBe(formattedValue);
  });

  it('should set raw type on focus', async () => {
    const wrapper = wrapperBuilder();
    const input = wrapper.find('input');
    const $input = input.element;

    input.trigger('focus');

    await wrapper.vm.$nextTick();

    expect($input.type).toBe(defaultType);
  });

  it('should set raw value on focus', async () => {
    const formattedValue = '1,23';
    const wrapper = wrapperBuilder({
      propsData: {
        formatter: () => formattedValue,
      },
    });
    const input = wrapper.find('input');
    const $input = input.element;

    input.trigger('focus');

    await wrapper.vm.$nextTick();

    expect($input.value).toBe(String(defaultValue));
  });

  it('should set text type on blur', async () => {
    const wrapper = wrapperBuilder();
    const input = wrapper.find('input');
    const $input = input.element;

    input.trigger('focus');

    await wrapper.vm.$nextTick();

    expect($input.type).toBe(defaultType);

    input.trigger('blur');

    await wrapper.vm.$nextTick();

    expect($input.type).toBe('text');
  });

  it('should set formatted value on blur', async () => {
    const formattedValue = '1,23';
    const wrapper = wrapperBuilder({
      props: {
        formatter: () => formattedValue,
      },
    });
    const input = wrapper.find('input');
    const $input = input.element;

    input.trigger('focus');

    await wrapper.vm.$nextTick();

    expect($input.value).toBe(String(defaultValue));

    input.trigger('blur');

    await wrapper.vm.$nextTick();

    expect($input.value).toBe(formattedValue);
  });

  it('should emit input with raw value', () => {
    const formattedValue = '1,23';
    const wrapper = wrapperBuilder({
      props: {
        formatter: () => formattedValue,
      },
    });
    const input = wrapper.find('input');

    input.trigger('focus');
    input.setValue(defaultValue);
    input.trigger('blur');

    expect(wrapper.emitted('input')[0][0]).toBe(String(defaultValue));
  });
});
