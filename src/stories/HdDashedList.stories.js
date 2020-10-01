import { HdDashedList } from 'homeday-blocks';
import ITEMS from './mocks/DASHED_LIST_ITEMS';

export default {
  title: 'Components/HdDashedList',
  component: HdDashedList,
  argTypes: {
    items: {
      control: 'object',
    },
    expandedLabel: {
      control: 'boolean',
    },
  },
  args: {
    items: ITEMS,
    expandedLabel: false,
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdDashedList },
  template: `
    <HdDashedList
      :items="items"
      :expandedLabel="expandedLabel"
    />
  `,
});

export const Default = Template.bind({});
