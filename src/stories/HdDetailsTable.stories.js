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
      description: 'Used as a selector for parent components when using an attribute is not possible',
    },
  },
  args: {
    withDivider: false,
    reference: 'test',
  },
};

const Template = (args, { argTypes }) => ({
  components: {
    HdDetailsTable,
    HdDetailsTableRow,
  },
  props: Object.keys(argTypes),
  template: `
    <div style="max-width: 800px; margin: auto;">
    <HdDetailsTable :with-divider="withDivider">
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
    </HdDetailsTable>
    </div>
  `,
});

export const Default = Template.bind({});
