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
});
