/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { HdToast } from 'homeday-blocks';

storiesOf('Components|HdToast', module)
  .addParameters({ percy: { skip: true } })
  .add('Primary only 🎛', () => ({
    components: { HdToast },
    data: () => ({
      text: text('Toast text', 'Random text'),
    }),
    template: `
      <div>
        <hd-toast primaryLabel="Primary" @primaryClick="primaryClick" ref="toast">{{text}}</hd-toast>
        <button @click="$refs.toast.$emit('open')" class="btn btn--primary">Show Toast!</button>
      </div>
    `,
    methods: {
      primaryClick: action('primaryClick'),
    },
  }), {
    knobs: {
      escapeHTML: false,
    },
  })
  .add('Secondary only 🎛', () => ({
    components: { HdToast },
    data: () => ({
      text: text('Toast text', 'Random text'),
    }),
    template: `
      <div>
        <hd-toast @close="onClose" @secondaryClick="secondaryClick" secondaryLabel="Secondary" ref="toast">{{text}}</hd-toast>
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
  })
  .add('Complete 🎛', () => ({
    components: { HdToast },
    data: () => ({
      text: text('Toast text', 'Random text'),
    }),
    template: `
      <div>
        <hd-toast primaryLabel="Primary" @close="onClose" @primaryClick="primaryClick" @secondaryClick="secondaryClick" secondaryLabel="Secondary" ref="toast">{{text}}</hd-toast>
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
