/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import HdTable from 'hd-blocks-src/components/HdTable.vue';
import HdInput from 'hd-blocks-src/components/form/HdInput.vue';
import TableWrapper from 'hd-blocks-src/storiesWrappers/TableWrapper';
import MOVIES_TABLE from 'hd-blocks-src/stories/mocks/tables/movies';

storiesOf('HdTable', module)
  .addDecorator(TableWrapper)
  .add('default', () => ({
    components: { HdTable },
    template: '<hd-table :header="header" :body="body"></hd-table>',
    data() {
      return {
        ...MOVIES_TABLE,
      };
    },
  }))
  .add('fixed', () => ({
    components: { HdTable },
    template: '<hd-table :header="header" :body="body" :fixed="true"></hd-table>',
    data() {
      return {
        ...MOVIES_TABLE,
      };
    },
  }))
  .add('left-aligned', () => ({
    components: { HdTable },
    template: '<hd-table :header="header" :body="body" align="left"></hd-table>',
    data() {
      return {
        ...MOVIES_TABLE,
      };
    },
  }))
  .add('no-wrap (fixed, left-aligned)', () => ({
    components: { HdTable },
    template: '<hd-table :header="header" :body="body" align="left" :fixed="true" :no-wrap="true"></hd-table>',
    data() {
      return {
        ...MOVIES_TABLE,
      };
    },
  }))
  .add('with components', () => ({
    components: { HdTable, HdInput },
    template: '<hd-table :header="header" :body="body"></hd-table>',
    data() {
      return {
        header: MOVIES_TABLE.header,
        body: MOVIES_TABLE.body.map(({
          title, year, rating, stars,
        }) => ({
          title,
          theNameDoesntMatter: {
            component: HdInput,
            props: {
              value: year,
              required: true,
            },
          },
          rating,
          stars,
        })),
      };
    },
  }));
