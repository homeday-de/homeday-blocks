/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { generateDateCycles } from 'homeday-blocks/src/services/date';

import HdCalendar from 'homeday-blocks/src/components/HdCalendar.vue';

storiesOf('HdCalendar', module)
  .addParameters({ percy: { skip: true } })
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
