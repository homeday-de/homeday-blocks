/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import HdInputPassword from 'homeday-blocks/src/components/form/HdInputPassword.vue';

export default {
  title: 'Components/Forms/HdInputPassword',
  decorators: [FormWrapper],
};

export const Simple = {
  render: () => ({
    components: { HdInputPassword },
    template: `
        <HdInputPassword
          v-model="value"
          :required="true"
          name="test"
          label="Ihr Passwort"
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
  }),

  name: 'simple',
};
