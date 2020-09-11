import Welcome from './Welcome.vue';

export default {
  title: 'Introduction/Welcome',
  component: Welcome,
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
  components: { Welcome },
  template: '<Welcome />',
});
