import { generateDateCycles } from 'homeday-blocks/src/services/date';
import HdCalendar from 'homeday-blocks/src/components/HdCalendar.vue';

export default {
  title: 'Components/Selection Controls/HdCalendar',
  component: HdCalendar,
  argTypes: {
    dateSelected: {
      action: 'dateSelected',
    },
  },
  args: {
    dates: generateDateCycles(2, 2, 2),
    disabledIndexes: [],
  },
  parameters: { percy: { skip: true } },
};

const Template = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdCalendar },
  template: `
    <HdCalendar
      :dates="dates"
      :disabled-indexes="disabledIndexes"
      @dateSelected="dateSelected"
    />
  `,
});

export const Default = {
  render: Template,
};

export const WithDisabledIndexes = {
  render: Template,

  args: {
    disabledIndexes: [1, 6, 2, 5],
  },
};
