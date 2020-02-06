/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';

import HdDetailsTable from 'homeday-blocks/src/components/details-table/HdDetailsTable.vue';
import HdDetailsTableRow from 'homeday-blocks/src/components/details-table/HdDetailsTableRow.vue';

storiesOf('HdDetailsTable', module)
  .add('default 🎛', () => ({
    components: {
      HdDetailsTable,
      HdDetailsTableRow,
    },
    props: {
      withDivider: {
        type: Boolean,
        default: boolean('With Divider', true),
      },
      forceSingleColumn: {
        type: Boolean,
        default: boolean('Single Column', false),
      },
    },
    template: `
      <div style="max-width: 800px; margin: auto;">
        <HdDetailsTable :with-divider="withDivider">
          <HdDetailsTableRow
            :force-single-column="forceSingleColumn"
            label="First Name"
          >
            Chuck
          </HdDetailsTableRow>
          <HdDetailsTableRow
            :force-single-column="forceSingleColumn"
            label="Last Name"
          >
            Norris
          </HdDetailsTableRow>
          <HdDetailsTableRow
            :force-single-column="forceSingleColumn"
            label="Age"
          >
            79
          </HdDetailsTableRow>
        </HdDetailsTable>
      </div>
    `,
  }));
