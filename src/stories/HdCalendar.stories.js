import { generateDateCycles } from 'homeday-blocks/src/services/date';
import HdCalendar from 'homeday-blocks/src/components/HdCalendar.vue';

export default {
  title: 'Components/HdCalendar',
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

const Template = (args, { argTypes }) => ({
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

export const Default = Template.bind({});

export const WithDisabledIndexes = Template.bind({});
WithDisabledIndexes.args = {
  disabledIndexes: [1, 6, 2, 5],
};
