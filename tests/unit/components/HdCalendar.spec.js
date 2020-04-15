import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import { generateDateCycles } from '@/services/date';
import HdCalendar from '@/components/HdCalendar.vue';

const wrapperBuilder = wrapperFactoryBuilder(HdCalendar, {
  props: {
    dates: generateDateCycles(2, 2, 2, new Date(1789, 4, 5)),
  },
  shallow: true,
});

describe('HdCalendar', () => {
  it('renders component', async () => {
    const wrapper = wrapperBuilder();

    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('as a user I\'m able to change week', () => {
    const setWeekIndexTailMock = jest.fn();
    const wrapper = wrapperBuilder({
      methods: {
        setWeekIndexTail: setWeekIndexTailMock,
      },
    });

    wrapper.find('.calendar__button--next').trigger('click');
    expect(setWeekIndexTailMock).toHaveBeenCalledTimes(1);

    wrapper.find('.calendar__button--prev').trigger('click');
    expect(setWeekIndexTailMock).toHaveBeenCalledTimes(2);
  });

  it('as a user I\'m able to change week and the first available day gets selected', () => {
    jest.useFakeTimers();

    const selectDateMock = jest.fn();
    const wrapper = wrapperBuilder({
      methods: {
        selectDate: selectDateMock,
      },
    });

    wrapper.find('.calendar__button--next').trigger('click');
    jest.advanceTimersByTime(0);

    expect(selectDateMock).toHaveBeenCalled();
  });

  it('as a user I\'m able to select a day', async () => {
    const wrapper = wrapperBuilder();

    await wrapper.vm.$nextTick();

    const firstDate = wrapper.find('.calendar__date');
    firstDate.trigger('click');

    expect(firstDate.classes()).toContain('calendar__date--selected');
  });

  it('when the disabled indexes are updated, the first available date is selected', () => {
    const selectFirstAvialableMock = jest.fn();
    const wrapper = wrapperBuilder({
      methods: {
        selectFirstAvialable: selectFirstAvialableMock,
      },
    });

    wrapper.setProps({
      disabledIndexes: [],
    });

    expect(selectFirstAvialableMock).toHaveBeenCalled();
  });
});
