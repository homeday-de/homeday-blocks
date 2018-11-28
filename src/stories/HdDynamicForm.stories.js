/* eslint-disable import/no-extraneous-dependencies, no-console */
import { storiesOf } from '@storybook/vue';

import HdDynamicForm from '@/components/form/HdDynamicForm.vue';
import FormWrapper from '@/storiesWrappers/FormWrapper';
import CONFIG from './mocks/forms';
import { formatFormData } from '@/services/utils';

storiesOf('HdDynamicForm', module)
  .addDecorator(FormWrapper)
  .add('profile', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form slot="content" :items="config" submitLabel="Submit Label" @submit="onSubmit"/>',
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
    template: '<hd-dynamic-form slot="content" :items="config" submitLabel="Submit Label" @submit="submit"/>',
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
    template: '<hd-dynamic-form slot="content" :items="config" submitLabel="Submit Label" @submit="submit"/>',
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
  }));
