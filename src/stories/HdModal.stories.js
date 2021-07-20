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
    isCloseButtonVisible: {
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
    isCloseButtonVisible: true,
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
        :is-close-button-visible="isCloseButtonVisible"
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
    clickedAction(button) {
      console.log(`the user clicked "${button.name}" action`);

      if (button.name === 'saveData') {
        console.log('the data is saving...');
      } else if (button.name === 'refreshPage') {
        console.log('page is refreshing');
      }
    },
  },
});

const TemplateWithCustomFooter = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdModal },
  template: `
    <div>
      <button @click="showModal">show modal</button>
      <hd-modal
        v-if="isOpen"
        @close="hideModal"
        :icon-src="modalIcon"
        :lang="'de'"
        :is-close-button-visible="isCloseButtonVisible"
      >
        <template slot="title">This is the modal title.</template>
        <p slot="body">This is the <b>modal</b> body.</p>
        <template slot="footer">This is the modal with <b> custom footer</b>.</template>
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

const TemplateWithCleanSheet = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdModal },
  template: `
    <div>
      <button @click="showModal">show modal</button>
      <hd-modal
        v-if="isOpen"
        is-clean-sheet="true"
      >
        <template slot="root">
          <div :style="{ position: 'relative', 'z-index': 9999, background: '#fafafa', padding: '10px' }">
            <p>This is a modal with <b> custom root element</b>.</p>
            <br />
            <button class="button" @click="hideModal">Custom Hide Button</button>
          </div>
        </template>
      </hd-modal>
    </div>
  `,
  data() {
    return {
      isOpen: false,
    };
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
  isCloseButtonVisible: false,
};

export const WithCleanSheet = TemplateWithCleanSheet.bind({});

export const WithCustomFooter = TemplateWithCustomFooter.bind({});
