import { wrapperFactoryBuilder } from 'tests/unit/helpers';

import HdDatePicker from '@/components/HdDatePicker.vue';

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

  it('updates the i18n weekdays', () => {
    const weekdays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
    const wrapper = wrapperBuilder({
      props: {
        value: TEST_VALUE,
        weekdays,
      },
      shallow: true,
    });

    expect(wrapper.attributes('weekdays')).toBe(weekdays.join(','));
  });

  it('updates the i18n months', () => {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril',
      'Mayo', 'Junio', 'Julio', 'Agosto',
      'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];
    const wrapper = wrapperBuilder({
      props: {
        value: TEST_VALUE,
        months,
      },
      shallow: true,
    });

    expect(wrapper.attributes('months')).toBe(months.join(','));
  });

  it('updates the i18n set time', () => {
    const setTimeText = 'Elige hora';
    const wrapper = wrapperBuilder({
      props: {
        value: TEST_VALUE,
        setTimeText,
      },
      shallow: true,
    });

    expect(wrapper.attributes('settimetext')).toBe(setTimeText);
  });

  it('updates the i18n next month caption', () => {
    const nextMonthCaption = 'Siguiente mes';
    const wrapper = wrapperBuilder({
      props: {
        value: TEST_VALUE,
        nextMonthCaption,
      },
      shallow: true,
    });

    expect(wrapper.attributes('nextmonthcaption')).toBe(nextMonthCaption);
  });

  it('updates the i18n previous month caption', () => {
    const prevMonthCaption = 'Siguiente anterior';
    const wrapper = wrapperBuilder({
      props: {
        value: TEST_VALUE,
        prevMonthCaption,
      },
      shallow: true,
    });

    expect(wrapper.attributes('prevmonthcaption')).toBe(prevMonthCaption);
  });
});
