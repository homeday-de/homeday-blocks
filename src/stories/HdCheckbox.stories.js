import { HdCheckbox } from 'homeday-blocks';

export default {
  title: 'Components/Form/HdCheckbox',
  component: HdCheckbox,
  args: {
    name: 'test',
    label: 'Terms and Conditions',
    innerLabel: 'Accept',
  },
};

export const Default = (args, { argTypes }) => ({
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
});
