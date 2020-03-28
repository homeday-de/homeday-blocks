/* eslint-disable import/no-extraneous-dependencies, no-console */
import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import {
  HdEditSwitch,
  HdInput,
} from 'homeday-blocks';

storiesOf('Components|HdEditSwitch', module)
  .addDecorator(FormWrapper)
  .add('Concrete example 🎛', () => ({
    components: { HdEditSwitch, HdInput },
    template: `
    <HdEditSwitch
      :editing="editing"
      :editing-allowed="isEditable"
      :loading="loading"
      @edit="enableEditing"
      @cancel="onCancel"
      @save="onSave"
    >
      <template slot="edit">
        <HdInput
          ref="firstName"
          v-model="editedFirstName"
          :required="true"
          name="firstName"
          label="First Name"/>
        <HdInput
          ref="lastName"
          v-model="editedLastName"
          :required="true"
          name="lastName"
          label="Last Name"/>
      </template>
      <template slot="view">
        <p><span style="margin-right: 16px; font-weight: bold">First Name:</span>{{ firstName }}</p>
        <p><span style="margin-right: 16px; font-weight: bold">Last Name:</span>{{ lastName }}</p>
      </template>
    </HdEditSwitch>
    `,
    props: {
      isEditable: {
        type: Boolean,
        default: boolean('isEditable', true),
      },
    },
    data() {
      return {
        firstName: 'Chuck',
        lastName: 'Norris',
        editedFirstName: '',
        editedLastName: '',
        editing: false,
        loading: false,
      };
    },
    created() {
      this.editedFirstName = this.firstName;
      this.editedLastName = this.lastName;
    },
    methods: {
      onSave() {
        const firstNameIsValid = this.$refs.firstName.validate();
        const lastNameIsValid = this.$refs.lastName.validate();
        this.loading = true;
        if (firstNameIsValid && lastNameIsValid) {
          setTimeout(this.onSaveSuccess, 2000);
        }
      },
      onCancel() {
        this.editing = false;
        this.editedFirstName = this.firstName;
        this.editedLastName = this.lastName;
      },
      onSaveSuccess() {
        this.firstName = this.editedFirstName;
        this.lastName = this.editedLastName;
        this.editing = false;
        this.loading = false;
      },
      enableEditing() {
        this.editing = true;
      },
    },
  }));
