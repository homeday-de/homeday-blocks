import Spacing from './Spacing.vue';

export default {
  title: 'Tokens/Spacing',
  component: Spacing,
  parameters: {
    options: {
      showPanel: false,
      isToolshown: false,
    },
    percy: {
      skip: true,
    },
    docs: { page: null },
  },
};

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Spacing },
  template: '<Spacing />',
});
