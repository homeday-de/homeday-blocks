/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';
import HdPager from 'homeday-blocks/src/components/HdPager.vue';

storiesOf('Components/HdPager', module).add('default 🎛', () => ({
  components: { HdPager },
  props: {
    count: {
      type: Number,
      default: number('Count', 10),
    },
    maxVisible: {
      type: Number,
      default: number('Max Visible', 7, {
        range: true,
        min: 3,
        max: 20,
        step: 1,
      }),
    },
  },
  template: `
      <HdPager
        v-model="page"
        :count="count"
        :max-visible="maxVisible"
      />
    `,
  data() {
    return {
      page: 0,
    };
  },
  watch: {
    page(page) {
      action('input')(page);
    },
  },
}));
