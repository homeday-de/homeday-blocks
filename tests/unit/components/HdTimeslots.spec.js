import { mount } from '@vue/test-utils';
import HdTimeslots from '@/components/HdTimeslots.vue';
import generateSlots from '@/stories/HdTimeslots.stories';

describe('HdTimeslots', () => {
  let wrapper;
  const testTimeslots = generateSlots(400, 20);
  // the page is shorter then the timeslots quantity
  const testTimeslotsPerPage = Math.floor(testTimeslots.length / 2);
  const getDisplayedTimeslots = () => wrapper.findAll('.timeslots__slot');
  const getDisplayedTimeslotsHtml = () => wrapper.findAll('.timeslots__slot').wrappers.reduce((acc, element) => acc + element.html(), '');

  beforeEach(() => {
    wrapper = mount(HdTimeslots, {
      propsData: {
        timeslots: testTimeslots,
        timeslotsPerPage: testTimeslotsPerPage,
      },
    });
  });

  test.skip('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('once the component is mounted, the first slot is selected', () => {
    const firstTimeslot = getDisplayedTimeslots().at(0);

    expect(firstTimeslot.classes()).toContain('timeslots__slot--isSelected');
  });

  test('clicking on a timeslot, the timeslot selecting method is called', () => {
    const mockedSelectTimeslot = jest.fn();
    const displayedTimeslots = getDisplayedTimeslots();
    const randomTimeslot = displayedTimeslots.at(Math.floor(Math.random() * displayedTimeslots.length));
    wrapper.setMethods({ selectTimeslot: mockedSelectTimeslot });
    randomTimeslot.trigger('click');

    expect(mockedSelectTimeslot).toHaveBeenCalled();
  });

  test('clicking on a timeslot, the timeslot is selected', async () => {
    const displayedTimeslots = getDisplayedTimeslots();
    const randomTimeslot = displayedTimeslots.at(Math.floor(Math.random() * displayedTimeslots.length));
    randomTimeslot.trigger('click');

    await wrapper.vm.$nextTick();

    expect(randomTimeslot.classes()).toContain('timeslots__slot--isSelected');
  });

  test('clicking on arrows, the page change methods are called', () => {
    const mockedFlipPage = jest.fn();
    wrapper.setMethods({ flipPage: mockedFlipPage });
    wrapper.find('.arrowButton--right').trigger('click');

    expect(mockedFlipPage).toHaveBeenCalledTimes(1);

    wrapper.find('.arrowButton--left').trigger('click');

    expect(mockedFlipPage).toHaveBeenCalledTimes(2);
  });

  test('clicking on arrows, the page is changed', async () => {
    const initialTimeslotsListContent = getDisplayedTimeslotsHtml();
    wrapper.find('.arrowButton--right').trigger('click');

    await wrapper.vm.$nextTick();

    expect(getDisplayedTimeslotsHtml()).not.toBe(initialTimeslotsListContent);

    wrapper.find('.arrowButton--left').trigger('click');

    await wrapper.vm.$nextTick();

    expect(getDisplayedTimeslotsHtml()).toBe(initialTimeslotsListContent);
  });

  test('slots are displayed in the proper quantity', async () => {
    const { timeslots } = wrapper.vm.$options.props;

    expect(timeslots.validator(Array.from(timeslots))).toBe(true);
    expect(getDisplayedTimeslots().length).toBe(testTimeslotsPerPage);

    // the page is now wider then the timeslots quantity
    wrapper.setProps({ timeslotsPerPage: testTimeslots.length * 2 });

    await wrapper.vm.$nextTick();

    expect(getDisplayedTimeslots().length).toBe(testTimeslots.length);
    // data validity check
    expect(testTimeslots.length).toBeGreaterThan(0);
  });
});
