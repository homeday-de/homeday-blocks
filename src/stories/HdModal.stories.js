/* eslint-disable import/no-extraneous-dependencies */
import { HdModal } from 'homeday-blocks';
import { checkCircle as checkCircleIcon } from 'homeday-assets/M';
import { bank } from 'homeday-assets';

const actionList = [{
  name: 'saveData',
  modifier: 'tertiary',
  text: 'Save Data',
  isInDarkBackground: false,
  disabled: false,
  iconSrc: bank,
}, {
  name: 'refreshPage',
  modifier: 'primary',
  text: 'Refresh Page',
  isInDarkBackground: false,
  disabled: false,
}];

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
    actions: {
      control: 'object',
      defaultValue: actionList,
    },
  },
  args: {
    withIcon: false,
    isWide: false,
    showCloseIcon: true,
    actions: actionList,
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
        :actions="actions"
        @action="clickedAction"
      >
        <template slot="title">This is the modal title.</template>
        <p slot="body">This is the <b>modal</b> body.</p>
      </hd-modal>
    </div>
  `,
  data() {
    return {
      isOpen: false,
      data() {
        return {
          actions: actionList,
        };
      },
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
    clickedAction(actionName) {
      console.log(`the user clicked "${actionName}" action`);

      if (actionName === 'saveData') {
        console.log('the data is saving...');
      } else if (actionName === 'refreshPage') {
        console.log('page is refreshing');
      }
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
