/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import {
  withKnobs, boolean,
} from '@storybook/addon-knobs';
import { HdDatePicker } from 'homeday-blocks';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import {
  defaultNotes,
  disabledNotes,
  disablingDatesNotes,
  startWeekOnSundayNotes,
} from '../notes/HdDatePicker';

storiesOf('Components|Form/HdDatePicker', module)
  .addDecorator(FormWrapper)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components: { HdDatePicker },
    template: `
      <HdDatePicker
        v-model="date"
      />
    `,
    data() {
      return {
        date: '2020.06.01',
      };
    },
  }), {
    notes: {
      markdown: defaultNotes,
    },
  })
  .add('disabled', () => ({
    components: { HdDatePicker },
    template: `
      <HdDatePicker
        v-model="date"
        :editable="false"
      />
    `,
    data() {
      return {
        date: '2020.06.01',
      };
    },
  }), {
    notes: {
      markdown: disabledNotes,
    },
  })
  .add('disablingDates', () => ({
    components: { HdDatePicker },
    template: `
      <HdDatePicker
        v-model="date"
        :isDateDisabled="isFutureDate"
      />
    `,
    data() {
      return {
        date: '2020.06.01',
      };
    },
    methods: {
      isFutureDate(date) {
        const currentDate = new Date();
        return date > currentDate;
      },
    },
  }), {
    notes: {
      markdown: disablingDatesNotes,
    },
  })
  .add('startWeekOnSunday', () => ({
    components: { HdDatePicker },
    template: `
      <HdDatePicker
        v-model="date"
        :startWeekOnSunday="startWeekOnSunday"
      />
    `,
    props: {
      startWeekOnSunday: {
        default: boolean('Start week on Sunday', false),
      },
    },
    data() {
      return {
        date: '2020.06.01',
      };
    },
  }), {
    notes: {
      markdown: startWeekOnSundayNotes,
    },
  });
