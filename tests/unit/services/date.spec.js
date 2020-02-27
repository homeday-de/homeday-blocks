import {
  resetDateTime,
  getNDaysFromDate,
  convertMsToDays,
  getDaysDateRange,
  getIntlDateString,
  generateDateCycles,
} from '@/services/date';


describe('Date service', () => {
  const year = 1988;
  // don't forget that months are 0 based
  const month = 1;
  const date = 28;
  const hour = 7;
  const minute = 30;
  const second = 30;
  const miliSecond = 30;
  const fullDate = new Date(year, month, date, hour, minute, second, miliSecond);

  it('resetDateTime returns the new date with time set to 00:00:00:00', () => {
    const resetDate = resetDateTime(fullDate);
    expect(resetDate.getFullYear()).toBe(year);
    expect(resetDate.getMonth()).toBe(month);
    expect(resetDate.getDate()).toBe(date);
    expect(resetDate.getHours()).toBe(0);
    expect(resetDate.getMinutes()).toBe(0);
    expect(resetDate.getSeconds()).toBe(0);
    expect(resetDate.getMilliseconds()).toBe(0);
  });

  describe('getNDaysFromDate', () => {
    it(`can keep the same date and
      resets the time to 00:00:00:00. Returns new date`, () => {
      // we pass in 28.02.1988
      // when we add 0 days, we expect to keep the same date
      // and time is set to 0
      const addedDayes = 0;
      const sameDate = getNDaysFromDate(fullDate, addedDayes);
      expect(sameDate.getFullYear()).toBe(year);
      expect(sameDate.getMonth()).toBe(month);
      expect(sameDate.getDate()).toBe(date);
      expect(sameDate.getHours()).toBe(0);
      expect(sameDate.getMinutes()).toBe(0);
      expect(sameDate.getSeconds()).toBe(0);
      expect(sameDate.getMilliseconds()).toBe(0);
    });

    it(`can add N number of days to selected date and
      resets the time to 00:00:00:00. Returns new date`, () => {
      // expect to get 04.03.1988 back, after adding 5 days
      const addedDayes = 5;
      const futureDate = getNDaysFromDate(fullDate, addedDayes);
      expect(futureDate.getFullYear()).toBe(year);
      expect(futureDate.getMonth()).toBe(2);
      expect(futureDate.getDate()).toBe(4);
      expect(futureDate.getHours()).toBe(0);
      expect(futureDate.getMinutes()).toBe(0);
      expect(futureDate.getSeconds()).toBe(0);
      expect(futureDate.getMilliseconds()).toBe(0);
    });

    it(`can deduct N number of days to selected date and
      resets the time to 00:00:00:00. Returns new date`, () => {
      // expect to get 27.02.1988 back, after deducting a day
      const addedDayes = -1;
      const yesterday = getNDaysFromDate(fullDate, addedDayes);
      expect(yesterday.getFullYear()).toBe(year);
      expect(yesterday.getMonth()).toBe(month);
      expect(yesterday.getDate()).toBe(date - 1);
      expect(yesterday.getHours()).toBe(0);
      expect(yesterday.getMinutes()).toBe(0);
      expect(yesterday.getSeconds()).toBe(0);
      expect(yesterday.getMilliseconds()).toBe(0);
    });
  });

  it('convertMsToDays converts ms to number of dats', () => {
    const days = convertMsToDays(5 * 24 * 60 * 60 * 1000);
    expect(days).toBe(5);
  });

  it(`getDaysDateRange returns array of dates between 2 dates,
      including start date and excluding end date`, () => {
    // we test for interval between fullDate(28.02.1988) and 05.03.1988
    const futureDate = new Date(year, 2, 5, hour, minute, second, miliSecond);
    const datesList = getDaysDateRange(fullDate, futureDate);
    expect(datesList.length).toBe(6);
  });

  it(`'getIntlDateString takes an array of dates and returns a list of unique day names
      in those interval`, () => {
    const datesList = [
      '1988-02-28T00:00:00.000Z',
      '1988-02-29T00:00:00.000Z',
      '1988-03-01T00:00:00.000Z',
      '1988-03-02T00:00:00.000Z',
      '1988-03-03T00:00:00.000Z',
      '1988-03-04T00:00:00.000Z',
      '1988-03-05T00:00:00.000Z',
      '1988-03-06T00:00:00.000Z',
      '1988-03-07T00:00:00.000Z',
      '1988-03-08T00:00:00.000Z',
      '1988-03-09T00:00:00.000Z',
      '1988-03-10T00:00:00.000Z',
      '1988-03-11T00:00:00.000Z',
      '1988-03-12T00:00:00.000Z',
      '1988-03-13T00:00:00.000Z',
      '1988-03-14T00:00:00.000Z',
      '1988-03-15T00:00:00.000Z',
      '1988-03-16T00:00:00.000Z',
      '1988-03-17T00:00:00.000Z',
      '1988-03-18T00:00:00.000Z',
      '1988-03-19T00:00:00.000Z',
    ];
    const daysInIntervalLong = getIntlDateString('en-US', datesList, { weekday: 'long' });
    expect(daysInIntervalLong.length).toBe(7);
    expect(daysInIntervalLong[0]).toBe('Sunday');

    const daysInIntervalShort = getIntlDateString('en-US', datesList, { weekday: 'short' });
    expect(daysInIntervalShort.length).toBe(7);
    expect(daysInIntervalShort[0]).toBe('Sun');
  });

  it('generateDateCycles returns the list if N weeks, from now', () => {
    const cycleLengthWeeks = 2;
    const amountOfCycles = 2;
    const startDateOffset = 0;
    const DAYS_IN_WEEK = 7;
    const dateCycles = generateDateCycles(cycleLengthWeeks, amountOfCycles, startDateOffset);
    expect(dateCycles.length).toBe(cycleLengthWeeks * amountOfCycles * DAYS_IN_WEEK);
    expect(dateCycles[0].toString()).toBe((resetDateTime(new Date()).toString()));
  });

  it('generateDateCycles returns the list if N weeks, from specific start date', () => {
    const specificDate = new Date(1789, 4, 5);
    const cycleLengthWeeks = 2;
    const amountOfCycles = 2;
    const startDateOffset = 0;
    const dateCycles = generateDateCycles(cycleLengthWeeks, amountOfCycles, startDateOffset, specificDate);
    expect(dateCycles[0].toString()).toBe(specificDate.toString());
  });
});
