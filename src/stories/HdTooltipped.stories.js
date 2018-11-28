/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import HdTooltipped from '../components/tooltip/HdTooltipped.vue';
import HdInput from '../components/form/HdInput.vue';
import FormWrapper from '@/storiesWrappers/FormWrapper';

storiesOf('Tooltipped', module)
  .addDecorator(FormWrapper)
  .add('default', () => ({
    components: { HdTooltipped, HdInput },
    template: `
    <div>
      <hd-tooltipped value="This is a text input" :component="HdInput" :props="{label: 'Hover over these components'}" />
      <hd-tooltipped value="This is another text input 🤓" :component="HdInput" :props="{label: 'HdInput is just an example'}" />
    </div>
    `,
    data() {
      return { HdInput };
    },
  }))
  .add('left', () => ({
    components: { HdTooltipped, HdInput },
    template: '<hd-tooltipped value="Hello from the other side" direction="left" :component="HdInput" :props="{label: \'You can pass props to the component 😉\', \'value\': \'valuuuuue\'}" />',
    data() {
      return { HdInput };
    },
  }));
