import HdButton from 'homeday-blocks/src/components/buttons/HdButton.vue';
import HdDetailsTable from 'homeday-blocks/src/components/details-table/HdDetailsTable.vue';
import HdDetailsTableRow from 'homeday-blocks/src/components/details-table/HdDetailsTableRow.vue';

export default {
  title: 'Components/HdDetailsTable',
  component: HdDetailsTable,
  argTypes: {
    withDivider: {
      control: 'boolean',
      description: 'Shows a divider underneath the table.',
    },
    reference: {
      control: 'string',
      description:
        'Used as a selector for parent components when using an attribute is not possible',
    },
  },
  args: {
    withDivider: false,
    reference: 'test',
  },
};

const Template = (args, { argTypes }) => ({
  components: {
    HdButton,
    HdDetailsTable,
    HdDetailsTableRow,
  },
  props: Object.keys(argTypes),
  template: `
    <div style="max-width: 800px; margin: auto;">
    <HdDetailsTable :with-divider="withDivider">
      <template #before><h3>American martial artist</h3></template>

      <HdDetailsTableRow
        label="First Name"
      >
        Chuck
      </HdDetailsTableRow>
      <HdDetailsTableRow
        label="Last Name"
      >
        Norris
      </HdDetailsTableRow>
      <HdDetailsTableRow
        label="Age"
      >
        79
      </HdDetailsTableRow>

      <template #after><HdButton>Follow</HdButton></template>
    </HdDetailsTable>
    </div>
  `,
});

export const Default = Template.bind({});
