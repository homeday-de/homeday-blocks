/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import HdPasswordConfirm from 'homeday-blocks/src/components/form/HdPasswordConfirm.vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import icon from './assets/ic_lock.svg';

export default {
  title: 'Components/Forms/HdPasswordConfirm',
  decorators: [FormWrapper],
  parameters: {
    percy: { skip: true },
  },
};

export const Simple = {
  render: () => ({
    components: { HdPasswordConfirm },
    template: `
        <hd-password-confirm/>
      `,
    methods: { onDataChange: action('dataChange') },
  }),

  name: 'simple',
};

export const WithValidityCheck = {
  render: (_args, { argTypes }) => ({
    components: { HdPasswordConfirm },
    props: Object.keys(argTypes),
    template: `
    <div>
      <hd-password-confirm
        ref="password"
        v-model="password"
        :min="min"
      />
      <button class="btn btn--primary" @click="check">Check Validity</button>
      <p style="margin-top: 8px">Is valid: {{ valid }}</p>
    </div>
  `,
    methods: {
      check() {
        this.valid = this.$refs.password.validate();
      },
    },
    data() {
      return {
        password: '',
        valid: false,
      };
    },
  }),
  args: {
    min: 5,
  },
  argTypes: {
    min: {
      name: 'Minimum Length',
      control: { type: 'number' },
    },
  },

  name: 'with validity check 🎛',
};

export const WithStrengthBarStyle = {
  render: (_args, { argTypes }) => ({
    components: { HdPasswordConfirm },
    template: `
  <hd-password-confirm
    @dataChange="onDataChange"
    :min="6"
    :strengthBarStyle="true"
    :withStrength="withStrength"
  />
  `,
    methods: { onDataChange: action('dataChange') },
    props: Object.keys(argTypes),
    watch: {},
  }),
  args: {
    withStrength: true,
  },
  argTypes: {
    withStrength: {
      name: 'withStrength',
      control: { type: 'boolean' },
    },
  },

  name: 'with strength bar style 🎛',
};

export const WithoutStrength = {
  render: (_args, { argTypes }) => ({
    components: { HdPasswordConfirm },
    template: `
  <hd-password-confirm
    @dataChange="onDataChange"
    :min="6"
    :strengthUI="false"
    :withStrength="withStrength"
  />
  `,
    methods: { onDataChange: action('dataChange') },
    props: Object.keys(argTypes),
  }),
  args: {
    withStrength: false,
  },
  argTypes: {
    withStrength: {
      name: 'withStrength',
      control: { type: 'boolean' },
    },
  },

  name: 'without strength 🎛',
};

export const WithIcon = {
  render: (_args, { argTypes }) => ({
    components: { HdPasswordConfirm },
    template: `
  <hd-password-confirm
    :icon="icon"
  />
  `,
    props: Object.keys(argTypes),
  }),
  args: {
    icon,
  },
  argTypes: {
    icon: {
      name: 'Icon',
      control: { type: 'text' },
    },
  },

  name: 'with icon 🎛',
};
