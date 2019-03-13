/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import HdCheckbox from 'hd-blocks/components/form/HdCheckbox.vue';

storiesOf('Form/HdCheckbox', module)
  .add('required', () => ({
    components: { HdCheckbox },
    template: `
      <HdCheckbox
        v-model="isChecked"
        :required="true"
        name="test"
        label="T&C"
        inner-label="I agree"
      />
    `,
    data() {
      return {
        isChecked: false,
      };
    },
  }))
  .add('checked', () => ({
    components: { HdCheckbox },
    template: `
      <HdCheckbox
        v-model="isChecked"
        name="test"
        label="T&C"
        inner-label="I agree"
      />
    `,
    data() {
      return {
        isChecked: true,
      };
    },
  }));
