/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';

import HdPrimaryButton from 'hd-blocks/components/buttons/HdPrimaryButton.vue';

storiesOf('HdPrimaryButton', module)
  .add('Playground 🎛', () => ({
    components: { HdPrimaryButton },
    props: {
      label: {
        type: String,
        default: text('Label', 'Register'),
      },
      disabled: {
        type: Boolean,
        default: boolean('Disabled', true),
      },
    },
    template: `
      <HdPrimaryButton
        :label=label
        :disabled=disabled
      />
    `,
  }));
