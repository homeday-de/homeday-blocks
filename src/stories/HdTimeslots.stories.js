/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import TimeslotsWrapper from 'homeday-blocks/src/storiesWrappers/TimeslotsWrapper';
import HdTimeslots from 'homeday-blocks/src/components/HdTimeslots.vue';
import generateSlots from './mocks/generateTimeSlots';

export default {
  title: 'Components/Selection Controls/HdTimeslots',
  decorators: [TimeslotsWrapper],
  parameters: {
    percy: { skip: true },
  },
};

export const Base = {
  render: () => ({
    components: { HdTimeslots },
    data: () => ({
      timeslots: generateSlots(400, 20),
    }),
    template: `<HdTimeslots
        @timeSelected="action"
        :timeslots="timeslots"
      />`,
    methods: { action: action('timeSelected') },
  }),

  name: 'base',
};
