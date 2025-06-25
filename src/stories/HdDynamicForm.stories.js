import { formatNestedData } from 'homeday-blocks/src/services/utils';
import HdDynamicForm from 'homeday-blocks/src/components/form/HdDynamicForm.vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import CONFIG from './mocks/forms';

export default {
  title: 'Components/Forms/HdDynamicForm',
  decorators: [FormWrapper],
};

export const Profile = {
  render: () => ({
    components: { HdDynamicForm },
    template:
      '<hd-dynamic-form :items="config" submitLabel="Submit Label" @submit="onSubmit" @blur="onBlur" @focus="onFocus"/>',
    data() {
      return {
        config: CONFIG.PROFILE,
      };
    },
    methods: {
      onSubmit({ data, isValid, invalidFields }) {
        console.log('invalidFields', invalidFields);
        console.log('isValid', isValid);
        console.log('data', data);
        console.log('Nested data', formatNestedData(data));
      },
      onBlur(item) {
        console.log('blur', item);
      },
      onFocus(item) {
        console.log('focus', item);
      },
    },
  }),

  name: 'profile',
};

export const Signup = {
  render: () => ({
    components: { HdDynamicForm },
    template:
      '<hd-dynamic-form :items="config" submitLabel="Submit Label" @submit="onSubmit" @blur="onBlur" @focus="onFocus"/>',
    data() {
      return {
        config: CONFIG.SIGNUP,
      };
    },
    methods: {
      onSubmit({ data, isValid, invalidFields }) {
        console.log('invalidFields', invalidFields);
        console.log('isValid', isValid);
        console.log('data', data);
        console.log('Nested data', formatNestedData(data));
      },
      onBlur(item) {
        console.log('blur', item);
      },
      onFocus(item) {
        console.log('focus', item);
      },
    },
  }),

  name: 'signup',
};

export const Login = {
  render: () => ({
    components: { HdDynamicForm },
    template:
      '<hd-dynamic-form :items="config" submitLabel="Submit Label" @submit="onSubmit" @blur="onBlur" @focus="onFocus"/>',
    data() {
      return {
        config: CONFIG.LOGIN,
      };
    },
    methods: {
      onSubmit({ data, isValid, invalidFields }) {
        console.log('invalidFields', invalidFields);
        console.log('isValid', isValid);
        console.log('data', data);
        console.log('Nested data', formatNestedData(data));
      },
      onBlur(item) {
        console.log('blur', item);
      },
      onFocus(item) {
        console.log('focus', item);
      },
    },
  }),

  name: 'login',
};

export const SpecifiedLanguage = {
  render: () => ({
    components: { HdDynamicForm },
    template:
      '<hd-dynamic-form :items="config" submitLabel="Submit Label" lang="en" @submit="onSubmit" @blur="onBlur" @focus="onFocus"/>',
    data() {
      return {
        config: CONFIG.LOGIN_EN,
      };
    },
    methods: {
      onSubmit({ data, isValid, invalidFields }) {
        console.log('invalidFields', invalidFields);
        console.log('isValid', isValid);
        console.log('data', data);
        console.log('Nested data', formatNestedData(data));
      },
      onBlur(item) {
        console.log('blur', item);
      },
      onFocus(item) {
        console.log('focus', item);
      },
    },
  }),

  name: 'specified language',
};
