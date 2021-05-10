/* eslint-disable import/no-extraneous-dependencies */
import { HdModal } from 'homeday-blocks';
import { checkCircle as checkCircleIcon } from 'homeday-assets/M';

export default {
  title: 'Components/HdModal',
  component: HdModal,
  argTypes: {
    withIcon: {
      control: 'boolean',
    },
    isWide: {
      control: 'boolean',
    },
    showCloseIcon: {
      control: 'boolean',
    },
  },
  args: {
    withIcon: false,
    isWide: false,
    showCloseIcon: true,
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdModal },
  template: `
    <div>
      <button @click="showModal">show modal</button>
      <hd-modal
        v-if="isOpen"
        @close="hideModal"
        :icon-src="modalIcon"
        :is-wide="isWide"
        :lang="'de'"
        :show-close-icon="showCloseIcon"
      >
        <template slot="title">This is the modal title.</template>
        <p slot="body">This is the <b>modal</b> body.</p>
        <template slot="actions">
          <button> action one </button>
          <button> action two </button>
          <button> action three </button>
        </template>
      </hd-modal>
    </div>
  `,
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    modalIcon() {
      return this.withIcon ? checkCircleIcon : '';
    },
  },
  methods: {
    showModal() {
      this.isOpen = true;
    },
    hideModal() {
      console.log('Closing modal');
      this.isOpen = false;
    },
  },
});

export const Default = Template.bind({});

export const WithIcon = Template.bind({});
WithIcon.args = {
  withIcon: true,
};

export const WideButtons = Template.bind({});
WideButtons.args = {
  isWide: true,
};

export const WithoutCloseButton = Template.bind({});
WithoutCloseButton.args = {
  showCloseIcon: false,
};
