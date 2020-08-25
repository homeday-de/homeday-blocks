---
to: src/stories/<%= name %>.stories.js
---
import { <%= name %> } from 'homeday-blocks';

export default {
  title: 'Components/<%= name %>',
  component: <%= name %>,
  parameters: {}, // specify parameters (e.g percy config)
  argTypes: {}, // specify prop arguments
  args: {}, // specify prop values (don't forget to add the boolean props here with a default value, otherwise the app will crash)
  parameters: {
    docs: {
      source: { // specify your component source code (for documentation)
        code: `
<<%= name %> />
        `,
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { <%= name %> },
  template: `
    <<%= name %> />
  `,
});

export const Default = Template.bind({});
Default.storyName = 'If you want to override the story name';
Default.decorators = [];
Default.parameters = {};
Default.args = {};
