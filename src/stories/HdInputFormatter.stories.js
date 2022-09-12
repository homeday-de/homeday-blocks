/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import HdInputFormatter from 'homeday-blocks/src/components/form/HdInputFormatter.vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';

storiesOf('Components/Form/HdInputFormatter', module)
  .addParameters({ percy: { skip: true } })
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
  }))
  .add('with validation', () => ({
    components: { HdInputFormatter },
    template: `
      <div class="text-xsmall">
        <p>Try a value lower than 1.000.000</p><br>
        <HdInputFormatter
          v-model="value"
          :formatter="formatter"
          name="test"
          label="Currency formatter"
          type="number"
          :custom-rules="[rule]"
        />
        <p>As you can see, the validation is done on the original value, and not the formatted one
        (which contain some dots htat make parsing hard)</p>
      </div>
    `,
    data() {
      return {
        value: 50,
        rule: {
          validate(value) {
            return value > 1000000;
          },
          errorMessage: 'The value should be > 1.000.000',
        },
      };
    },
    methods: {
      formatter(value) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
      },
    },
  }));
