/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import HdInputPassword from 'hd-blocks/components/form/HdInputPassword.vue';
import FormWrapper from 'hd-blocks/storiesWrappers/FormWrapper';

storiesOf('Form/HdInputPassword', module)
  .addDecorator(FormWrapper)
  .add('simple', () => ({
    components: { HdInputPassword },
    template: `
      <HdInputPassword
        :required="true"
        name="test"
        label="Ihr Passwort"
      />
    `,
  }));
