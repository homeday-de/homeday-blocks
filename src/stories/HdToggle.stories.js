/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { text, boolean, number } from '@storybook/addon-knobs';
import { edit as editIcon, delete as deleteIcon } from 'homeday-assets';
import HdToggle from 'homeday-blocks/src/components/HdToggle.vue';

const stories = storiesOf('Components/Content/HdToggle', module);

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

stories.add('With an action', () => ({
  components: { HdToggle },
  data() {
    return {
      toggleOpen: false,
      actions: [
        {
          name: 'edit',
          label: 'bearbeiten',
          icon: editIcon,
        },
      ],
    };
  },
  methods: {
    toggle(state) {
      this.toggleOpen = state;
    },
    edit() {
      console.log('edit');
    },
  },
  template: `
    <div style="max-width:300px;">
      <HdToggle
        :open="toggleOpen"
        :actions="actions"
        title="HdToggle Title"
        @toggle="toggle"
        @edit="edit"
      >
        <b>This is the HdToggle body.</b>
      </HdToggle>
    </div>
  `,
}));

stories.add('With multiple actions', () => ({
  components: { HdToggle },
  data() {
    return {
      toggleOpen: false,
      actions: [
        {
          name: 'edit',
          label: 'bearbeiten',
          icon: editIcon,
        },
        {
          name: 'remove',
          label: 'löschen',
          icon: deleteIcon,
        },
      ],
    };
  },
  methods: {
    toggle(state) {
      this.toggleOpen = state;
    },
    edit() {
      console.log('edit');
    },
    remove() {
      console.log('remove');
    },
  },
  template: `
    <div style="max-width:300px;">
      <HdToggle
        :open="toggleOpen"
        :actions="actions"
        title="HdToggle Title"
        @toggle="toggle"
        @edit="edit"
        @remove="remove"
      >
        <b>This is the HdToggle body.</b>
      </HdToggle>
    </div>
  `,
}));

stories.add(
  'Playground 🎛',
  () => ({
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
  }),
  { percy: { skip: true } }
);
