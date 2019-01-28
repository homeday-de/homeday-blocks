/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdCheckbox from 'hd-blocks-components/form/HdCheckbox.vue';

storiesOf('Form/HdCheckbox', module)
  .add('required', () => ({
    components: { HdCheckbox },
    template: '<hd-checkbox @dataChange="onDataChange" :required="true" label="Label..." />',
    methods: { onDataChange: action('dataChange') },
  }))
  .add('checked', () => ({
    components: { HdCheckbox },
    template: '<hd-checkbox @dataChange="onDataChange" :checked="true" label="Label..." />',
    methods: { onDataChange: action('dataChange') },
  }));
