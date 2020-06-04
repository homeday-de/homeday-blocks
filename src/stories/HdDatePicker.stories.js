/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import {
  withKnobs, boolean, select,
} from '@storybook/addon-knobs';
import { HdDatePicker } from 'homeday-blocks';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import {
  defaultNotes,
  disabledNotes,
  disablingDatesNotes,
  displayFormatNotes,
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
  .add('displayFormat', () => ({
    components: { HdDatePicker },
    template: `
      <HdDatePicker
        v-model="date"
        :displayFormat="displayFormat"
      />
    `,
    props: {
      displayFormat: {
        default: select('Display format', [
          'MM - YYYY',
          'DD.MM.YYYY',
          'DDMMYYYY',
          'DD/MM/YYYY',
          'MM/DD/YYYY',
          'MM-DD-YYYY',
        ], 'MM - YYYY'),
      },
    },
    data() {
      return {
        date: '2020.06.01',
      };
    },
  }), {
    notes: {
      markdown: displayFormatNotes,
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
