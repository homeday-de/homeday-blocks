import HdTagsList from 'homeday-blocks/src/components/HdTagsList.vue';
import TYPES from 'homeday-blocks/src/components/HdTagTypes';
import ITEMS from './mocks/FORM_ITEMS';

export default {
  title: 'Components/Content/HdTagsList',
  component: HdTagsList,
  argTypes: {
    modifier: {
      control: { type: 'select', options: Object.values(TYPES) },
    },
  },
  args: {
    modifier: TYPES.PRIMARY,
    items: ITEMS.map(({ label }) => label),
  },
};

export const DEFAULT = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdTagsList },
  template: '<hd-tags-list v-bind="$props" />',
});
