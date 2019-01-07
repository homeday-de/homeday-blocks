/* eslint-disable import/no-extraneous-dependencies, no-console */
import { storiesOf } from '@storybook/vue';

import HdDynamicForm from 'hd-blocks-src/components/form/HdDynamicForm.vue';
import FormWrapper from 'hd-blocks-src/storiesWrappers/FormWrapper';
import { formatFormData } from 'hd-blocks-src/services/utils';
import CONFIG from './mocks/forms';

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
      onSubmit(formData) {
        console.log('formData', formData);
        console.log('Formatted formData (nesting enabled)', formatFormData(formData, { nestingEnabled: true }));
      },
    },
  }))
  .add('signup', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" @submit="submit"/>',
    data() {
      return {
        config: CONFIG.SIGNUP,
      };
    },
    methods: {
      submit(formData) {
        console.log('formData', formData);
        console.log('Formatted formData (nesting enabled)', formatFormData(formData, { nestingEnabled: true }));
      },
    },
  }))
  .add('login', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" @submit="submit"/>',
    data() {
      return {
        config: CONFIG.LOGIN,
      };
    },
    methods: {
      submit(formData) {
        console.log('formData', formData);
        console.log('Formatted formData (nesting enabled)', formatFormData(formData, { nestingEnabled: true }));
      },
    },
  }))
  .add('specified language', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" lang="en" @submit="submit"/>',
    data() {
      return {
        config: CONFIG.LOGIN_EN,
      };
    },
    methods: {
      submit(formData) {
        console.log('formData', formData);
        console.log('Formatted formData (nesting enabled)', formatFormData(formData, { nestingEnabled: true }));
      },
    },
  }));
