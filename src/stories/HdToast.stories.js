/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import HdToast from 'components/HdToast.vue';

storiesOf('HdToast', module)
  .add('required', () => ({
    components: { HdToast },
    data: () => ({
      text: text('Toast text', 'textfafafsasf'),
    }),
    template: `
      <div>
        <hd-toast :text=text primaryLabel="Primary" @close="onClose" @primaryClick="primaryClick" @secondaryClick="secondaryClick" secondaryLabel="Secondary" ref="toast">{{text}}</hd-toast>
        <button @click="$refs.toast.$emit('open')" class="btn btn--primary">Show Toast!</button>
      </div>
    `,
    methods: {
      onClose: action('closed'),
      primaryClick: action('primaryClick'),
      secondaryClick: action('secondaryClick'),
    },
  }), {
    knobs: {
      escapeHTML: false,
    },
  });
