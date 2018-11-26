/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import Button from '../components/Button.vue';

storiesOf('Button', module)
  .add('with label', () => ({
    components: { Button },
    template: '<Button @click="action" label="Testerino" />',
    methods: { action: action('clicked') },
  }));
