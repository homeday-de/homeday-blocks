import { wrapperFactoryBuilder } from 'tests/unit/helpers';

import HdDatePicker from '@/components/form/HdDatePicker.vue';

const TEST_VALUE = '2020.06.01';
const wrapperBuilder = wrapperFactoryBuilder(HdDatePicker, {});

describe('HdDatePicker', () => {
  it('is rendered as expected', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('is rendered with prefilled value', () => {
    const wrapper = wrapperBuilder({
      props: {
        value: TEST_VALUE,
      },
    });

    expect(wrapper.find('input').element.value).toBe(TEST_VALUE);
  });

  it('updates the field on change of the prop `value`', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.find('input').element.value).not.toBe(TEST_VALUE);

    wrapper.get('input').setValue(TEST_VALUE);

    expect(wrapper.find('input').element.value).toBe(TEST_VALUE);
  });

  it('is disabled with prop `disabled`', () => {
    const wrapper = wrapperBuilder({
      props: {
        value: TEST_VALUE,
        disabled: true,
      },
    });

    expect(wrapper.find('input').attributes('readonly')).toBe('readonly');
  });

  it('emits `input` event with the right payload', () => {
    const wrapper = wrapperBuilder();

    wrapper.get('input').setValue(TEST_VALUE);

    expect(wrapper.emitted('input')[0][0]).toEqual(TEST_VALUE);
  });
});
