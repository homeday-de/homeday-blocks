import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import HdTooltipped from 'homeday-blocks/src/components/tooltip/HdTooltipped.vue';
import HdInput from 'homeday-blocks/src/components/form/HdInput.vue';

export default {
  title: 'Components/Content/Tooltipped',
  decorators: [FormWrapper],
  parameters: {
    percy: { skip: true },
  },
};

export const Default = {
  render: () => ({
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
  }),

  name: 'default',
};

export const Left = {
  render: () => ({
    components: { HdTooltipped, HdInput },
    template:
      '<hd-tooltipped value="Hello from the other side" direction="left" :component="HdInput" :props="{label: \'You can pass props to the component 😉\', \'value\': \'valuuuuue\', name: \'test\'}" />',
    data() {
      return { HdInput };
    },
  }),

  name: 'left',
};
