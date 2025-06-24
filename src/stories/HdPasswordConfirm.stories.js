/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import HdPasswordConfirm from 'homeday-blocks/src/components/form/HdPasswordConfirm.vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import icon from './assets/ic_lock.svg';

storiesOf('Components/Forms/HdPasswordConfirm', module)
  .addDecorator(FormWrapper)
  .add('simple', () => ({
    components: { HdPasswordConfirm },
    template: `
      <hd-password-confirm/>
    `,
    methods: { onDataChange: action('dataChange') },
  }))
  .add(
    'with validity check 🎛',
    (args) => ({
      components: { HdPasswordConfirm },
      props: Object.keys(args),
      template: `
      <div>
        <hd-password-confirm
          ref="password"
          v-model="password"
          :min="min"
        />
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
          password: '',
          valid: false,
        };
      },
    }),
    {
      args: {
        min: 5,
      },
      argTypes: {
        min: {
          name: 'Minimum Length',
          control: { type: 'number' },
        },
      },
      percy: { skip: true },
    }
  )
  .add(
    'with strength bar style 🎛',
    (args) => ({
      components: { HdPasswordConfirm },
      template: `
    <hd-password-confirm
      @dataChange="onDataChange"
      :min="6"
      :strengthBarStyle="true"
      :withStrength="withStrength"
    />
    `,
      methods: { onDataChange: action('dataChange') },
      props: Object.keys(args),
      watch: {},
    }),
    {
      args: {
        withStrength: true,
      },
      argTypes: {
        withStrength: {
          name: 'withStrength',
          control: { type: 'boolean' },
        },
      },
      percy: { skip: true },
    }
  )
  .add(
    'without strength 🎛',
    (args) => ({
      components: { HdPasswordConfirm },
      template: `
    <hd-password-confirm
      @dataChange="onDataChange"
      :min="6"
      :strengthUI="false"
      :withStrength="withStrength"
    />
    `,
      methods: { onDataChange: action('dataChange') },
      props: Object.keys(args),
    }),
    {
      args: {
        withStrength: false,
      },
      argTypes: {
        withStrength: {
          name: 'withStrength',
          control: { type: 'boolean' },
        },
      },
      percy: { skip: true },
    }
  )
  .add(
    'with icon 🎛',
    (args) => ({
      components: { HdPasswordConfirm },
      template: `
    <hd-password-confirm
      :icon="icon"
    />
    `,
      props: Object.keys(args),
    }),
    {
      args: {
        icon,
      },
      argTypes: {
        icon: {
          name: 'Icon',
          control: { type: 'text' },
        },
      },
    }
  );
