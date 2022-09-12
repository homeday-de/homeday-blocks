import range from 'lodash/range';

export default (endStartDeltaMins, duration) =>
  range(1, endStartDeltaMins / duration + 2).map((slot) => {
    const date = new Date();
    const mins = duration * slot;
    // We have to make sure to also set the seconds and milliseconds to 0
    date.setMinutes(mins, 0, 0);

    const hours = date.getHours();
    // Pad minutes with trailing zero
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const time = `${hours}:${minutes}`;
    return {
      time,
      isAvailable: true,
    };
  });
