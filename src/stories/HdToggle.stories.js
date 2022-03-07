/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import {
  text,
  boolean,
  number,
} from '@storybook/addon-knobs';
import HdToggle from 'homeday-blocks/src/components/HdToggle.vue';

const stories = storiesOf('Components/HdToggle', module);

stories.add('Default', () => ({
  components: { HdToggle },
  data() {
    return {
      toggleOpen: false,
    };
  },
  methods: {
    toggle(state) {
      this.toggleOpen = state;
    },
  },
  template: `
    <div style="max-width:300px;">
      <HdToggle
        :open="toggleOpen"
        title="HdToggle Title"
        @toggle="toggle"
      >
        <b>This is the HdToggle body.</b>
      </HdToggle>
    </div>
  `,
}));

stories
  .add('Playground 🎛', () => ({
    components: { HdToggle },
    props: {
      title: {
        type: String,
        default: text('title', 'HdToggle Title'),
      },
      open: {
        type: Boolean,
        default: boolean('open', false),
      },
      canBeToggled: {
        type: Boolean,
        default: boolean('canBeToggled', true),
      },
      transitionDuration: {
        type: Number,
        default: number('transitionDuration', 300),
      },
    },
    data() {
      return {
        toggleOpen: false,
      };
    },
    methods: {
      toggle(state) {
        this.toggleOpen = state;
      },
    },
    template: `
      <div style="max-width:300px;">
        <HdToggle
          @toggle="toggle"
          :title="title"
          :open="open"
          :canBeToggled="canBeToggled"
          :transitionDuration="transitionDuration"
        >
          <b>This is the HdToggle body.</b>
        </HdToggle>
      </div>
    `,
  }), { percy: { skip: true } });
