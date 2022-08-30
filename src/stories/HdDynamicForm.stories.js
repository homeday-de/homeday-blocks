/* eslint-disable import/no-extraneous-dependencies, no-console */
import { storiesOf } from '@storybook/vue';
import { formatNestedData } from 'homeday-blocks/src/services/utils';
import HdDynamicForm from 'homeday-blocks/src/components/form/HdDynamicForm.vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import CONFIG from './mocks/forms';

storiesOf('Components/Form/HdDynamicForm', module)
  .addDecorator(FormWrapper)
  .add('profile', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" @submit="onSubmit" @blur="onBlur" @focus="onFocus"/>',
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
        console.log(
          'Nested data',
          formatNestedData(data),
        );
      },
      onBlur(item) {
        console.log('blur', item);
      },
      onFocus(item) {
        console.log('focus', item);
      },
    },
  }))
  .add('signup', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" @submit="onSubmit" @blur="onBlur" @focus="onFocus"/>',
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
        console.log(
          'Nested data',
          formatNestedData(data),
        );
      },
      onBlur(item) {
        console.log('blur', item);
      },
      onFocus(item) {
        console.log('focus', item);
      },
    },
  }))
  .add('login', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" @submit="onSubmit" @blur="onBlur" @focus="onFocus"/>',
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
        console.log(
          'Nested data',
          formatNestedData(data),
        );
      },
      onBlur(item) {
        console.log('blur', item);
      },
      onFocus(item) {
        console.log('focus', item);
      },
    },
  }))
  .add('specified language', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" lang="en" @submit="onSubmit" @blur="onBlur" @focus="onFocus"/>',
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
        console.log(
          'Nested data',
          formatNestedData(data),
        );
      },
      onBlur(item) {
        console.log('blur', item);
      },
      onFocus(item) {
        console.log('focus', item);
      },
    },
  }));
