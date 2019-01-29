/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdInput from 'hd-blocks/components/form/HdInput.vue';
import FormWrapper from 'hd-blocks/storiesWrappers/FormWrapper';

storiesOf('Form/HdInput', module)
  .addDecorator(FormWrapper)
  .add('required', () => ({
    components: { HdInput },
    template: '<hd-input @dataChange="onDataChange" :required="true" label="Label" placeholder="Placeholder..." />',
    methods: { onDataChange: action('dataChange') },
  }))
  .add('prefilled', () => ({
    components: { HdInput },
    template: '<hd-input @dataChange="onDataChange" value="Your default value goes here" label="Label..." placeholder="Placeholder..." />',
    methods: { onDataChange: action('dataChange') },
  }))
  .add('password', () => ({
    components: { HdInput },
    template: '<hd-input @dataChange="onDataChange" type="password" :required="true" label="Password" />',
    methods: { onDataChange: action('dataChange') },
  }))
  .add('email', () => ({
    components: { HdInput },
    template: '<hd-input @dataChange="onDataChange" type="email" label="Email" placeholder="Enter your email address" />',
    methods: { onDataChange: action('dataChange') },
  }));
