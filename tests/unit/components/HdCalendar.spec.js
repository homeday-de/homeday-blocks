import { mount } from '@vue/test-utils';
import { generateDateCycles } from '@/services/date';
import HdCalendar from '@/components/HdCalendar.vue';

describe('HdCalendar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdCalendar, {
      propsData: {
        dates: generateDateCycles(2, 2, 2, new Date(1789, 4, 5)),
      },
    });
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('as a user I\'m able to change week', () => {
    const setWeekIndexTailMock = jest.fn();
    wrapper.setMethods({ setWeekIndexTail: setWeekIndexTailMock });

    wrapper.find('.calendar__button--next').trigger('click');
    expect(setWeekIndexTailMock).toHaveBeenCalledTimes(1);

    wrapper.find('.calendar__button--prev').trigger('click');
    expect(setWeekIndexTailMock).toHaveBeenCalledTimes(2);
  });

  test('as a user I\'m able to change week and the first available day gets selected', () => {
    jest.useFakeTimers();

    const selectDateMock = jest.fn();
    wrapper.setMethods({ selectDate: selectDateMock });

    wrapper.find('.calendar__button--next').trigger('click');
    jest.advanceTimersByTime(0);

    expect(selectDateMock).toHaveBeenCalled();
  });

  test('as a user I\'m able to select a day', () => {
    const selectDateMock = jest.fn();
    wrapper.setMethods({ selectDate: selectDateMock });

    const firstDate = wrapper.find('.calendar__date');
    firstDate.trigger('click');
    expect(selectDateMock).toHaveBeenCalled();
    expect(firstDate.classes()).toContain('calendar__date--selected');
  });

  test('when the disabled indexes are updated, the first available date is selected', () => {
    const selectFirstAvialableMock = jest.fn();
    wrapper.setMethods({ selectFirstAvialable: selectFirstAvialableMock });

    wrapper.vm.disabledIndexes = [];
    expect(selectFirstAvialableMock).toHaveBeenCalled();
  });
});
