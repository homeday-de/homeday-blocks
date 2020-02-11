// Sets date time to midnight for unifying purposes
export const resetDateTime = (date) => {
  const clonedDate = new Date(date);
  clonedDate.setHours(0, 0, 0, 0);

  return clonedDate;
};

// Returns date which is amountOfDays from the initialDate
export const getNDaysFromDate = (initialDate, amountOfDays) => {
  // Create a clone of initialDate in order not to edit it
  const startDate = new Date(initialDate);
  return resetDateTime(new Date(startDate.setDate(initialDate.getDate() + amountOfDays)));
};

export const convertMsToDays = ms => Math.round(ms / 1000 / 60 / 60 / 24);

export const getDaysDateRange = (startDate, endDate) => {
  const dateDiffDays = convertMsToDays(endDate.getTime() - startDate.getTime());
  const datesArray = [];

  /* eslint-disable no-plusplus  */
  for (let day = 0; day < dateDiffDays; day++) {
    datesArray.push(getNDaysFromDate(startDate, day));
  }

  return datesArray;
};

// Returns array of unique date strings from original array
export const getIntlDateString = (locale, datesArray, localStringArgs) => datesArray.reduce((accumulator, currentItem) => {
  const currentDay = new Date(currentItem).toLocaleString(
    locale,
    localStringArgs,
  );
  if (accumulator.indexOf(currentDay) === -1) accumulator.push(currentDay);

  return accumulator;
}, []);

export const generateDateCycles = (cycleLengthWeeks, amountOfCycles, startDateOffset, startDate = false) => {
  const WEEK_DAYS = 7;
  const cycleLengthDays = cycleLengthWeeks * WEEK_DAYS;
  const calculatedStartDate = getNDaysFromDate(startDate || new Date(), startDateOffset);
  const endDate = getNDaysFromDate(startDate || new Date(), (cycleLengthDays * amountOfCycles) + startDateOffset);

  return getDaysDateRange(calculatedStartDate, endDate);
};

export default {
  resetDateTime,
  getNDaysFromDate,
  convertMsToDays,
  getDaysDateRange,
  getIntlDateString,
  generateDateCycles,
};
