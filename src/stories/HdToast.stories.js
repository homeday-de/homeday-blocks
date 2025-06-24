/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import HdToast from 'homeday-blocks/src/components/HdToast.vue';

storiesOf('Components/Indicators/HdToast', module)
  .addParameters({
    args: {
      text: 'Random text',
    },
    argTypes: {
      text: {
        name: 'Toast text',
        control: { type: 'text' },
      },
    },
    percy: { skip: true },
  })
  .add('Primary only 🎛', (args) => ({
    components: { HdToast },
    props: Object.keys(args),
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
  }))
  .add('Secondary only 🎛', (args) => ({
    components: { HdToast },
    props: Object.keys(args),
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
  }))
  .add('Complete 🎛', (args) => ({
    components: { HdToast },
    props: Object.keys(args),
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
  }));
