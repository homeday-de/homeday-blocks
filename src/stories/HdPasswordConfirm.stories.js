/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { number, boolean, text } from '@storybook/addon-knobs';
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
    () => ({
      components: { HdPasswordConfirm },
      props: {
        min: {
          type: Number,
          default: number('min', 5),
        },
      },
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
    { percy: { skip: true } }
  )
  .add(
    'with strength bar style 🎛',
    () => ({
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
      props: {
        withStrength: {
          type: Boolean,
          default: boolean('withStrength', true),
        },
      },
      watch: {},
    }),
    { percy: { skip: true } }
  )
  .add(
    'without strength 🎛',
    () => ({
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
      props: {
        withStrength: {
          type: Boolean,
          default: boolean('withStrength', false),
        },
      },
    }),
    { percy: { skip: true } }
  )
  .add('with icon 🎛', () => ({
    components: { HdPasswordConfirm },
    template: `
    <hd-password-confirm
      :icon="icon"
    />
    `,
    props: {
      icon: {
        type: String,
        default: text('icon', icon),
      },
    },
  }));
