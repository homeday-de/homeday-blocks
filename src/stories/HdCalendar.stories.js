/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { generateDateCycles } from 'services/date';
import HdCalendar from '../components/HdCalendar.vue';

storiesOf('HdCalendar', module)
  .add('base', () => ({
    components: { HdCalendar },
    data: () => ({
      dates: generateDateCycles(2, 2, 2),
    }),
    template: '<hd-calendar  @dateSelected="dateSelected" :dates=dates />',
    methods: { dateSelected: action('onDateSelected') },
  }));
