/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import HdInputPhone from 'homeday-blocks/src/components/form/HdInputPhone.vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';

export default {
  title: 'Components/Forms/HdInputPhone',
  decorators: [FormWrapper],
  parameters: {
    options: { enableShortcuts: false },
  },
};

export const Simple = {
  render: () => ({
    components: { HdInputPhone },
    template: `
        <HdInputPhone
          v-model="value"
          name="test"
          lang="de"
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
  }),

  name: 'simple',
};
