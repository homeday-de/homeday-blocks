/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import HdTable from '@/components/HdTable.vue';
import HdInput from '@/components/form/HdInput.vue';
import TableWrapper from '@/storiesWrappers/TableWrapper';
import moviesTable from '@/stories/mocks/tables/movies';

storiesOf('HdTable', module)
  .addDecorator(TableWrapper)
  .add('default', () => ({
    components: { HdTable },
    template: '<hd-table :header="header" :body="body"></hd-table>',
    data() {
      return {
        ...moviesTable,
      };
    },
  }))
  .add('fixed', () => ({
    components: { HdTable },
    template: '<hd-table :header="header" :body="body" fixed="true"></hd-table>',
    data() {
      return {
        ...moviesTable,
      };
    },
  }))
  .add('left-aligned', () => ({
    components: { HdTable },
    template: '<hd-table :header="header" :body="body" align="left"></hd-table>',
    data() {
      return {
        ...moviesTable,
      };
    },
  }))
  .add('no-wrap (fixed, left-aligned)', () => ({
    components: { HdTable },
    template: '<hd-table :header="header" :body="body" align="left" fixed="true" no-wrap="true"></hd-table>',
    data() {
      return {
        ...moviesTable,
      };
    },
  }))
  .add('with components', () => ({
    components: { HdTable, HdInput },
    template: '<hd-table :header="header" :body="body"></hd-table>',
    data() {
      return {
        header: moviesTable.header,
        body: moviesTable.body.map(({
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
