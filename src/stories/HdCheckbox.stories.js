import HdCheckbox from 'homeday-blocks/src/components/form/HdCheckbox.vue';

export default {
  title: 'Components/Selection Controls/HdCheckbox',
  component: HdCheckbox,
  args: {
    name: 'test',
    label: 'Terms and Conditions',
    innerLabel: 'Accept',
    lang: 'de',
    required: false,
    disabled: false,
    indeterminate: false,
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the checkbox input.',
    },
    label: {
      control: 'text',
      description: 'The label displayed next to the checkbox.',
    },
    innerLabel: {
      control: 'text',
      description: 'The label displayed inside the checkbox when checked.',
    },
    lang: {
      control: 'text',
      description: 'Language code for localization.',
    },
    required: {
      control: 'boolean',
      description: 'Indicates if the checkbox is required.',
    },
    disabled: {
      control: 'boolean',
      description: 'Indicates if the checkbox is disabled.',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indicates if the checkbox is in an indeterminate state.',
    },
  },
};

export const Default = {
  render: (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { HdCheckbox },
    data: () => ({
      isChecked: false,
    }),
    template: `
    <HdCheckbox
      v-model="isChecked"
      :name="name"
      :label="label"
      :innerLabel="innerLabel"
      :required="required"
      lang="de"
      :disabled="disabled"
      :indeterminate="indeterminate"
    />
    `,
  }),
};
