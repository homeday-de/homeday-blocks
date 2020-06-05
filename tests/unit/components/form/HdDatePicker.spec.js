import { wrapperFactoryBuilder } from 'tests/unit/helpers';

import HdDatePicker from '@/components/form/HdDatePicker.vue';

const wrapperBuilder = wrapperFactoryBuilder(HdDatePicker, {});

describe('HdDatePicker', () => {
  it('is rendered as expected', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
