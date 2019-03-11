/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { number, boolean } from '@storybook/addon-knobs';

import HdPasswordConfirm from 'hd-blocks/components/form/HdPasswordConfirm.vue';
import FormWrapper from 'hd-blocks/storiesWrappers/FormWrapper';

storiesOf('Form/HdPasswordConfirm', module)
  .addDecorator(FormWrapper)
  .add('simple', () => ({
    components: { HdPasswordConfirm },
    template: '<hd-password-confirm @dataChange="onDataChange"/>',
    methods: { onDataChange: action('dataChange') },
  }))
  .add('with validity check', () => ({
    components: { HdPasswordConfirm },
    template: `
    <div style="text-align: center">
      <hd-password-confirm ref="password" v-model="password" :min="min"/>
      <button class="btn btn--primary" @click="check">Check Validity</button>
      <p style="margin-top: 8px">Is valid: {{ valid }}</p>
    </div>
    `,
    methods: {
      check() {
        this.valid = this.$refs.password.validate();
      },
    },
    data() {
      return {
        min: number('min', 10),
        password: '',
        valid: false,
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
