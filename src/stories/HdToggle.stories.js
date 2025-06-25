import { edit as editIcon, delete as deleteIcon } from 'homeday-assets';
import HdToggle from 'homeday-blocks/src/components/HdToggle.vue';

export default {
  title: 'Components/Content/HdToggle',
};

export const Default = () => ({
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
});

export const WithAnAction = {
  render: () => ({
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
  }),

  name: 'With an action',
};

export const WithMultipleActions = {
  render: () => ({
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
  }),

  name: 'With multiple actions',
};

export const Playground = {
  render: (_args, { argTypes }) => ({
    components: { HdToggle },
    props: Object.keys(argTypes),
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
  args: {
    title: 'HdToggle Title',
    open: false,
    canBeToggled: true,
    transitionDuration: 300,
  },
  argTypes: {
    title: {
      name: 'Title',
      control: { type: 'text' },
    },
    open: {
      name: 'Open',
      control: { type: 'boolean' },
    },
    canBeToggled: {
      name: 'Can be toggled',
      control: { type: 'boolean' },
    },
    transitionDuration: {
      name: 'Transition Duration (ms)',
      control: { type: 'number' },
    },
  },
  parameters: {
    percy: { skip: true },
  },

  name: 'Playground 🎛',
};
