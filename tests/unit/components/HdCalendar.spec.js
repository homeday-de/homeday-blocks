import { mount } from '@vue/test-utils';
import { generateDateCycles } from '@/services/date';
import HdCalendar from '@/components/HdCalendar.vue';

describe('HdCalendar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdCalendar, {
      propsData: {
        dates: generateDateCycles(2, 2, 2, new Date(2020, 1, 10)),
      },
    });
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
