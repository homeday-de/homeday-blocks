import HdForm from 'homeday-blocks/src/components/form/HdForm.vue';
import HdInput from 'homeday-blocks/src/components/form/HdInput.vue';
import HdCheckbox from 'homeday-blocks/src/components/form/HdCheckbox.vue';
import HdInputFormatter from 'homeday-blocks/src/components/form/HdInputFormatter.vue';

export default {
  title: 'Components/Form/HdForm',
  component: HdForm,
  argTypes: {
    scrollToInvalidField: {
      control: 'boolean',
      description:
        'If set to true and the form is invalid, the window will scroll to the first invalid field when the form is submitted',
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
    HdInputFormatter,
    HdCheckbox,
  },
  props: Object.keys(argTypes),
  template: `
    <HdForm
      @submit="onSubmit"
      @change="onFormChange"
      v-bind="$props"
    >
      <h2><b>Personal data:</b></h2>
      <HdInput label="First name" name="firstName" v-model="firstName" />
      <HdInputFormatter label="Age*" name="age" v-model="age" :formatter="(a) => a+' years old'" required />
      <HdInput label="Last name*" name="lastName" v-model="lastName" required />
      <br>
      <h2><b>Address:</b></h2>
      <p>Unlike HdDynamicForm, HdForm uses slots, which allows us to customize our form the way we want.</p>
      <div style="display: flex">
        <HdInput style="width: 70%; margin-right: 16px" label="Street*" name="address.street" v-model="address.street" required />
        <HdInput style="flex: 1" label="House Nr.*" name="address.houseNumber" v-model="address.houseNumber" required />
      </div>
      <HdInput style="width: 70%" label="City*" name="address.city" v-model="address.city" required />
      <br><br>
      <HdCheckbox inner-label="I'm not a bot*" name="isNotRobot" v-model="isNotRobot" required />
      <button>Submit</button>
      <br>
      Submitted data (check the Actions tab bellow for the full payload):
      <pre style="background-color: #f5f5f5; border-radius: 5px">{{ submittedDataString }}</pre>
    </HdForm>
  `,
  data() {
    return {
      isNotRobot: false,
      firstName: '',
      lastName: '',
      age: 45,
      address: {},
      submittedDataString: '',
      hasFormChanged: null,
    };
  },
  methods: {
    onSubmit(params) {
      this.submittedDataString = JSON.stringify(params.formData, null, 4);
      // eslint-disable-next-line no-param-reassign
      params.invalidFields = params.invalidFields.map((field) => ({
        name: field.name,
        '...':
          'the other Vue component attributes were suppressed as Storybook struggles to stringify objects with circular references',
      }));
      console.log('submitted', params);
    },
    onFormChange(val) {
      this.hasFormChanged = val;
      console.log('changed', val);
    },
  },
});

export const Default = Template.bind({});
