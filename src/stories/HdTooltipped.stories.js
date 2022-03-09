/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import HdTooltipped from 'homeday-blocks/src/components/tooltip/HdTooltipped.vue';
import HdInput from 'homeday-blocks/src/components/form/HdInput.vue';

storiesOf('Components/Tooltipped', module)
  .addParameters({ percy: { skip: true } })
  .addDecorator(FormWrapper)
  .add('default', () => ({
    components: { HdTooltipped, HdInput },
    template: `
    <div>
      <hd-tooltipped value="This is a text input" :component="HdInput" :props="{label: 'Hover over these components', name: 'test1'}" />
      <hd-tooltipped value="This is another text input 🤓" :component="HdInput" :props="{label: 'HdInput is just an example', name: 'test2'}" />
    </div>
    `,
    data() {
      return { HdInput };
    },
  }))
  .add('left', () => ({
    components: { HdTooltipped, HdInput },
    template: '<hd-tooltipped value="Hello from the other side" direction="left" :component="HdInput" :props="{label: \'You can pass props to the component 😉\', \'value\': \'valuuuuue\', name: \'test\'}" />',
    data() {
      return { HdInput };
    },
  }));
