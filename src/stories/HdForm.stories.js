import {
  HdForm,
  HdInput,
  HdCheckbox,
} from 'homeday-blocks';

export default {
  title: 'Components/Form/HdForm',
  component: HdForm,
  argTypes: {
    scrollToInvalidField: {
      control: 'boolean',
      description: 'If set to true and the form as an invalid field, the window will scroll to the latter when the form is submitted',
    },
  },
  args: {
    scrollToInvalidField: false,
  },
};

const Template = (args, { argTypes }) => ({
  components: {
    HdForm,
    HdInput,
    HdCheckbox,
  },
  props: Object.keys(argTypes),
  template: `
    <HdForm
      @submit="onSubmit"
      v-bind="$props"
    >
      <HdInput label="First name" name="firstName" v-model="firstName" />
      <HdInput label="Last name*" name="lastName" v-model="lastName" required />
      <HdCheckbox inner-label="I'm not a bot*" name="checked" v-model="checked" required />
      <button>Submit</button>
    </HdForm>
  `,
  data() {
    return {
      checked: false,
      firstName: '',
      lastName: '',
    };
  },
  methods: {
    onSubmit(params) {
      // eslint-disable-next-line no-param-reassign
      params.invalidFields = params.invalidFields.map(field => ({
        name: field.name,
        '...': 'the other Vue component attributes were suppressed as Storybook struggles to stringify objects with circular references',
      }));
      console.log('submitted', params);
    },
  },
});

export const Default = Template.bind({});
