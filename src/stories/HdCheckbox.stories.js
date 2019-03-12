/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import HdCheckbox from 'hd-blocks/components/form/HdCheckbox.vue';

storiesOf('Form/HdCheckbox', module)
  .add('required', () => ({
    components: { HdCheckbox },
    template: '<hd-checkbox v-model="isChecked" :required="true" label="Label..." />',
    data() {
      return {
        isChecked: false,
      };
    },
  }))
  .add('checked', () => ({
    components: { HdCheckbox },
    template: '<hd-checkbox v-model="isChecked" :checked="true" label="Label..." />',
    data() {
      return {
        isChecked: false,
      };
    },
  }));
