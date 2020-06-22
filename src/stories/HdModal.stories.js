/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { HdModal } from 'homeday-blocks';

const stories = storiesOf('Components|HdModal', module);

stories.add('Default', () => ({
  components: { HdModal },
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    showModal() {
      this.modalOpen = true;
    },
    hideModal() {
      this.modalOpen = false;
    },
  },
  template: `
    <div>
      <button @click="showModal">show modal</button>
      <HdModal
        v-if="modalOpen"
        @close="hideModal"
      >
        <div slot="header">This is the modal header.</div>
        <div slot="content">This is the modal content.</div>
       </HdModal>
    </div>
  `,
}));

stories.add('Light', () => ({
  components: { HdModal },
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    showModal() {
      this.modalOpen = true;
    },
    hideModal() {
      this.modalOpen = false;
    },
  },
  template: `
    <div>
      <button @click="showModal">show modal</button>
      <HdModal
        v-if="modalOpen"
        @close="hideModal"
        closeIconColor="light"
        overlayColor="light"
      >
        <div
        slot="header"
        style="background:#2988ff;"
        >This is the modal header.
        </div>
        <div
        slot="content"
        >This is the modal content.
        </div>
       </HdModal>
    </div>
  `,
}));

stories.add('With Actions', () => ({
  components: { HdModal },
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    showModal() {
      this.modalOpen = true;
    },
    hideModal() {
      this.modalOpen = false;
    },
    save() {
      this.hideModal();
      // eslint-disable-next-line no-alert
      alert('saved!');
    },
  },
  template: `
    <div>
      <button @click="showModal">show modal</button>
      <HdModal
        v-if="modalOpen"
        @close="hideModal"
        :actions="[
          {
            label: 'Cancel',
            callback: hideModal,
          },
          {
            label: 'Save',
            callback: save,
            type: 'primary',
          },
        ]"
      >
        <div slot="header">This is the modal header.</div>
        <div slot="content">This is the modal content.</div>
       </HdModal>
    </div>
  `,
}));
