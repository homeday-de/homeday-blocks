/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import TimeslotsWrapper from 'homeday-blocks/src/storiesWrappers/TimeslotsWrapper';
import { HdTimeslots } from 'homeday-blocks';
import generateSlots from './mocks/generateTimeSlots';


storiesOf('Components/HdTimeslots', module)
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
