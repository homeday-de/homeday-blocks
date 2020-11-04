import Elevation from './Elevation.vue';

export default {
  title: 'Tokens/Elevation',
  component: Elevation,
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
  components: { Elevation },
  template: '<Elevation />',
});
