/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { HdInputFormatter } from 'homeday-blocks';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';

storiesOf('Components|Form/HdInputFormatter', module)
  .addDecorator(FormWrapper)
  .add('simple', () => ({
    components: { HdInputFormatter },
    template: `
      <HdInputFormatter
        v-model="value"
        :formatter="formatter"
        name="test"
        label="Currency formatter"
        type="number"
      />
    `,
    data() {
      return {
        value: 123,
      };
    },
    methods: {
      formatter(value) {
        if (value) {
          return `$ ${value}`;
        }

        return '';
      },
    },
    watch: {
      value(value) {
        action('input')(value);
      },
    },
  }), { percy: { skip: true } });
