import { mount } from '@vue/test-utils';
import HdTimeslots from '@/components/HdTimeslots.vue';
import generateSlots from '@/stories/HdTimeslots.stories.js'

describe('HdTimeslots', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdTimeslots, {
      timeslots: generateSlots(400, 20),
    });
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('once the component is mounted, the first slot is selected', () => {
    const timeslots = wrapper.findAll('timeslots__slot');

    expect(timeslots[0].classes()).toContain('timeslots__slot--isSelected');
  });
});
