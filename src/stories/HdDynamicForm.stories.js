/* eslint-disable import/no-extraneous-dependencies, no-console */
import { storiesOf } from '@storybook/vue';
import {
  HdDynamicForm,
  UtilsService,
} from 'homeday-blocks';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import CONFIG from './mocks/forms';

const { formatNestedData } = UtilsService;

storiesOf('Form/HdDynamicForm', module)
  .addDecorator(FormWrapper)
  .add('profile', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" @submit="onSubmit"/>',
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
    },
  }))
  .add('signup', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" @submit="onSubmit"/>',
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
    },
  }))
  .add('login', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" @submit="onSubmit"/>',
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
    },
  }))
  .add('specified language', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" lang="en" @submit="onSubmit"/>',
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
    },
  }));
