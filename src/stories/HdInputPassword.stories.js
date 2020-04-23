/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import { HdInputPassword } from 'homeday-blocks';

storiesOf('Components|Form/HdInputPassword', module)
  .addDecorator(FormWrapper)
  .add('simple', () => ({
    components: { HdInputPassword },
    template: `
      <HdInputPassword
        v-model="value"
        :required="true"
        name="test"
        label="Ihr Passwort"
      />
    `,
    data() {
      return {
        value: '',
      };
    },
    watch: {
      value(value) {
        action('input')(value);
      },
    },
  }))
  .add('with hibp check 🎛', () => ({
    components: { HdInputPassword },
    template: `
      <div>
        <HdInputPassword
          name="hibp"
          ref="password"
          v-model="password"
        />
        <button class="btn btn--primary" @click="check">Check Pwnd</button>
        <p style="margin-top: 8px">Is pwnd: {{ valid }}</p>
      </div>
    `,
    methods: {
      async check() {
        this.valid = await this.$refs.password.hasPasswordBeenPwnd();
      },
    },
    data() {
      return {
        password: '',
        valid: false,
      };
    },
  }), { percy: { skip: true } });
