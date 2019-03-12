/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import HdPager from 'hd-blocks/components/HdPager.vue';

storiesOf('HdPager', module)
  .add('10 pages, 7 max visible', () => ({
    components: { HdPager },
    template: `
      <HdPager
        v-model="page"
        :count="10"
      />
    `,
    data() {
      return {
        page: 0,
      };
    },
  }))
  .add('5 pages, 7 max visible', () => ({
    components: { HdPager },
    template: `
      <HdPager
        v-model="page"
        :count="5"
      />
    `,
    data() {
      return {
        page: 0,
      };
    },
  }))
  .add('10 pages, 4 max visible', () => ({
    components: { HdPager },
    template: `
      <HdPager
        v-model="page"
        :count="10"
        :max-visible="4"
      />
    `,
    data() {
      return {
        page: 0,
      };
    },
  }))
  .add('3 pages, 3 max visible', () => ({
    components: { HdPager },
    template: `
      <HdPager
        v-model="page"
        :count="3"
        :max-visible="3"
      />
    `,
    data() {
      return {
        page: 0,
      };
    },
  }));
