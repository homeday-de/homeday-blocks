/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdInput from '../components/form/HdInput.vue';

storiesOf('HdInput', module)
  .add('required', () => ({
    components: { HdInput },
    template: '<hd-input @dataChange="onDataChange" required="true" label="Label" placeholder="Placeholder..." />',
    methods: { dataChange: action('onDataChange') },
  }))
  .add('prefilled', () => ({
    components: { HdInput },
    template: '<hd-input @dataChange="onDataChange" value="Your default value goes here" label="Label..." placeholder="Placeholder..." />',
    methods: { dataChange: action('onDataChange') },
  }))
  .add('password', () => ({
    components: { HdInput },
    template: '<hd-input @dataChange="onDataChange" type="password" required="true" label="Password" />',
    methods: { dataChange: action('onDataChange') },
  }))
  .add('email', () => ({
    components: { HdInput },
    template: '<hd-input @dataChange="onDataChange" type="email" label="Email" placeholder="Enter your email address" />',
    methods: { dataChange: action('onDataChange') },
  }));
