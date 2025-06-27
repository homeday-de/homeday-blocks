/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import HdToast from 'homeday-blocks/src/components/HdToast.vue';

export default {
  title: 'Components/Indicators/HdToast',
  args: {
    text: 'Random text',
  },
  argTypes: {
    text: {
      name: 'Toast text',
      control: { type: 'text' },
    },
  },
  parameters: {
    percy: { skip: true },
  },
};

export const PrimaryOnly = {
  render: (_args, { argTypes }) => ({
    components: { HdToast },
    props: Object.keys(argTypes),
    template: `
        <div>
          <hd-toast
            primaryLabel="Primary"
            @primaryClick="primaryClick"
            ref="toast">
            <span v-html="text"></span>
          </hd-toast>
          <button @click="$refs.toast.$emit('open')" class="btn btn--primary">Show Toast!</button>
          <button @click="$refs.toast.$emit('close')" class="btn btn--tertiary">Hide Toast!</button>
        </div>
      `,
    methods: {
      primaryClick: action('primaryClick'),
    },
  }),

  name: 'Primary only 🎛',
};

export const SecondaryOnly = {
  render: (_args, { argTypes }) => ({
    components: { HdToast },
    props: Object.keys(argTypes),
    template: `
        <div>
          <hd-toast
            @afterClose="onClose"
            @secondaryClick="secondaryClick"
            secondaryLabel="Secondary"
            ref="toast">
            <span v-html="text"></span>
          </hd-toast>
          <button @click="$refs.toast.$emit('open')" class="btn btn--primary">Show Toast!</button>
          <button @click="$refs.toast.$emit('close')" class="btn btn--tertiary">Hide Toast!</button>
        </div>
      `,
    methods: {
      onClose: action('closed'),
      primaryClick: action('primaryClick'),
      secondaryClick: action('secondaryClick'),
    },
  }),

  name: 'Secondary only 🎛',
};

export const Complete = {
  render: (_args, { argTypes }) => ({
    components: { HdToast },
    props: Object.keys(argTypes),
    template: `
        <div>
          <hd-toast
            ref="toast"
            primaryLabel="Primary"
            secondaryLabel="Secondary"
            @primaryClick="primaryClick"
            @secondaryClick="secondaryClick"
            @afterClose="onClose">
            <span v-html="text"></span>
          </hd-toast>
          <button @click="$refs.toast.$emit('open')" class="btn btn--primary">Show Toast!</button>
          <button @click="$refs.toast.$emit('close')" class="btn btn--tertiary">Hide Toast!</button>
        </div>
      `,
    methods: {
      onClose: action('closed'),
      primaryClick: action('primaryClick'),
      secondaryClick: action('secondaryClick'),
    },
  }),

  name: 'Complete 🎛',
};
