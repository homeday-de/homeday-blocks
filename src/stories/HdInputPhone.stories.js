/* eslint-disable import/no-extraneous-dependencies */
import { HdInputPhone } from 'homeday-blocks';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';

storiesOf('Components/Form/HdInputPhone', module)
  .addDecorator(FormWrapper)
  .add('simple', () => ({
    components: { HdInputPhone },
    template: `
      <HdInputPhone
        v-model="value"
        name="test"
        label="Telefonnumer"
        :preferredCountries="['DE', 'AT', 'BE']"
      />
    `,
    data() {
      return {
        value: '',
      };
    },
    watch: {
      value(value) {
        action('input')(value);
      },
    },
  }));
