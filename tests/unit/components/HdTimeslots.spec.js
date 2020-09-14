import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdTimeslots from '@/components/HdTimeslots.vue';
import generateSlots from '@/stories/mocks/generateTimeSlots';

const defaultTimeslots = generateSlots(400, 20);
const defaultTimeslotsPerPage = Math.floor(defaultTimeslots.length / 2);

const wrapperBuilder = wrapperFactoryBuilder(HdTimeslots, {
  props: {
    timeslots: defaultTimeslots,
    timeslotsPerPage: defaultTimeslotsPerPage,
  },
});

describe('HdTimeslots', () => {
  const getDisplayedTimeslots = wrapper => wrapper.findAll('.timeslots__slot');

  it('once the component is mounted, the first slot is selected', async () => {
    const wrapper = wrapperBuilder();
    const firstTimeslot = getDisplayedTimeslots(wrapper).at(0);

    await wrapper.vm.$nextTick();

    expect(firstTimeslot.classes()).toContain('timeslots__slot--isSelected');
  });

  it('clicking on a timeslot, the timeslot selecting method is called', () => {
    const mockedSelectTimeslot = jest.fn();
    const wrapper = wrapperBuilder({
      methods: {
        selectTimeslot: mockedSelectTimeslot,
      },
    });
    const displayedTimeslots = getDisplayedTimeslots(wrapper);
    const randomTimeslot = displayedTimeslots.at(Math.floor(Math.random() * displayedTimeslots.length));

    randomTimeslot.trigger('click');

    expect(mockedSelectTimeslot).toHaveBeenCalled();
  });

  it('clicking on a timeslot, the timeslot is selected', async () => {
    const wrapper = wrapperBuilder();
    const displayedTimeslots = getDisplayedTimeslots(wrapper);
    const randomTimeslot = displayedTimeslots.at(Math.floor(Math.random() * displayedTimeslots.length));

    randomTimeslot.trigger('click');

    await wrapper.vm.$nextTick();

    expect(randomTimeslot.classes()).toContain('timeslots__slot--isSelected');
  });

  it('clicking on arrows, the page change methods are called', () => {
    const mockedFlipPage = jest.fn();
    const wrapper = wrapperBuilder({
      methods: {
        flipPage: mockedFlipPage,
      },
    });

    wrapper.find('.arrowButton--right').trigger('click');

    expect(mockedFlipPage).toHaveBeenCalledTimes(1);

    wrapper.find('.arrowButton--left').trigger('click');

    expect(mockedFlipPage).toHaveBeenCalledTimes(2);
  });

  it('slots are displayed in the proper quantity', async () => {
    const wrapper = wrapperBuilder();
    const { timeslots } = wrapper.vm.$options.props;

    expect(timeslots.validator(Array.from(timeslots))).toBe(true);
    expect(getDisplayedTimeslots(wrapper).length).toBe(defaultTimeslotsPerPage);

    // the page is now wider then the timeslots quantity
    wrapper.setProps({ timeslotsPerPage: defaultTimeslots.length * 2 });

    await wrapper.vm.$nextTick();

    expect(getDisplayedTimeslots(wrapper).length).toBe(defaultTimeslots.length);
    // data validity check
    expect(defaultTimeslots.length).toBeGreaterThan(0);
  });
});
