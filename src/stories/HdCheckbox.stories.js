/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdCheckbox from '../components/form/HdCheckbox.vue';

storiesOf('HdCheckbox', module)
  .add('required', () => ({
    components: { HdCheckbox },
    template: '<hd-checkbox @dataChange="onDataChange" required="true" label="Label..." />',
    methods: { onDataChange: action('dataChange') },
  }))
  .add('selected', () => ({
    components: { HdCheckbox },
    template: '<hd-checkbox @dataChange="onDataChange" checked="true" label="Label..." />',
    methods: { onDataChange: action('dataChange') },
  }));
