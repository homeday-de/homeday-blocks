/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { HdDatePicker } from 'homeday-blocks';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import defaultNotes from '../notes/HdDatePicker/default.md';

storiesOf('Components|Form/HdDatePicker', module)
  .addDecorator(FormWrapper)
  .add('default', () => ({
    components: { HdDatePicker },
    template: `
      <HdDatePicker
        v-model="date"
      />
    `,
    data() {
      return {
        date: '2020-06-01',
      };
    },
  }), {
    notes: {
      markdown: defaultNotes,
    },
  });
