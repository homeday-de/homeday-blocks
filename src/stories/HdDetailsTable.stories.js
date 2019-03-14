/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';

import HdDetailsTable from 'hd-blocks/components/details-table/HdDetailsTable.vue';
import HdDetailsTableRow from 'hd-blocks/components/details-table/HdDetailsTableRow.vue';

storiesOf('HdDetailsTable', module)
  .add('default', () => ({
    components: {
      HdDetailsTable,
      HdDetailsTableRow,
    },
    props: {
      withDivider: {
        type: Boolean,
        default: boolean('With Divider', true),
      },
    },
    template: `
      <div style="max-width: 800px; margin: auto;">
        <HdDetailsTable :with-divider="withDivider">
          <HdDetailsTableRow label="First Name">
            Chuck
          </HdDetailsTableRow>
          <HdDetailsTableRow label="Last Name">
            Norris
          </HdDetailsTableRow>
          <HdDetailsTableRow label="Age">
            79
          </HdDetailsTableRow>
        </HdDetailsTable>
      </div>
    `,
  }));
