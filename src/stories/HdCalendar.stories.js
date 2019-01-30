/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { generateDateCycles } from 'hd-blocks/services/date';

import HdCalendar from 'hd-blocks/components/HdCalendar.vue';

storiesOf('HdCalendar', module)
  .add('base', () => ({
    components: { HdCalendar },
    data: () => ({
      dates: generateDateCycles(2, 2, 2),
    }),
    template: '<hd-calendar  @dateSelected="dateSelected" :dates=dates />',
    methods: { dateSelected: action('onDateSelected') },
  }))
  .add('with disabled indexes', () => ({
    components: { HdCalendar },
    data: () => ({
      dates: generateDateCycles(2, 2, 2),
      disabledIndexes: [1, 6, 2, 5],
    }),
    template: '<hd-calendar  @dateSelected="dateSelected" :disabledIndexes="disabledIndexes" :dates="dates" />',
    methods: { dateSelected: action('onDateSelected') },
  }));
