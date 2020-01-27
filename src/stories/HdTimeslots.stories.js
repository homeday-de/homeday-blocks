/* eslint-disable import/no-extraneous-dependencies */
import range from 'lodash/range';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import TimeslotsWrapper from 'hd-blocks/storiesWrappers/TimeslotsWrapper';

import HdTimeslots from 'hd-blocks/components/HdTimeslots.vue';

const generateSlots = (endStartDeltaMins, duration) => range(1, (endStartDeltaMins / duration) + 2)
  .map((slot) => {
    const date = new Date();
    const mins = duration * slot;
    // We have to make sure to also set the seconds and milliseconds to 0
    date.setMinutes(mins, 0, 0);
    const isAvialable = true;

    const hours = date.getHours();
    // Pad minutes with trailing zero
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const time = `${hours}:${minutes}`;
    return {
      time,
      isAvialable,
    };
  });

storiesOf('HdTimeslots', module)
  .addParameters({ percy: { skip: true } })
  .addDecorator(TimeslotsWrapper)
  .add('base', () => ({
    components: { HdTimeslots },
    data: () => ({
      timeslots: generateSlots(400, 20),
    }),
    template: `<HdTimeslots
      @timeSelected="action"
      :timeslots="timeslots"
    />`,
    methods: { action: action('timeSelected') },
  }));


export default generateSlots;
