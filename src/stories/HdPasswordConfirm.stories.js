/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { number, boolean } from '@storybook/addon-knobs';

import HdPasswordConfirm from 'hd-blocks-components/form/HdPasswordConfirm.vue';
import FormWrapper from 'hd-blocks-src/storiesWrappers/FormWrapper';

storiesOf('Form/HdPasswordConfirm', module)
  .addDecorator(FormWrapper)
  .add('simple', () => ({
    components: { HdPasswordConfirm },
    template: '<hd-password-confirm @dataChange="onDataChange"/>',
    methods: { onDataChange: action('dataChange') },
  }))
  .add('min characters (10)', () => ({
    components: { HdPasswordConfirm },
    template: '<hd-password-confirm @dataChange="onDataChange" :min="min"/>',
    methods: { onDataChange: action('dataChange') },
    data() {
      return {
        min: number('min', 6),
      };
    },
  }))
  .add('with strength UI', () => ({
    components: { HdPasswordConfirm },
    template: '<hd-password-confirm @dataChange="onDataChange" :min="6" :strengthUI="true"/>',
    methods: { onDataChange: action('dataChange') },
    data() {
      return {
        withStrength: boolean('withStrength', false),
      };
    },
  }))
  .add('without strength', () => ({
    components: { HdPasswordConfirm },
    template: '<hd-password-confirm @dataChange="onDataChange" :withStrength="false"/>',
    methods: { onDataChange: action('dataChange') },
    data() {
      return {
        withStrength: boolean('withStrength', false),
      };
    },
  }));
