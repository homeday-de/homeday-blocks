/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdTabsMenu from 'homeday-blocks/src/components/HdTabsMenu.vue';
import ITEMS from './mocks/MENU_ITEMS';

storiesOf('HdTabsMenu', module)
  .add('default', () => ({
    components: { HdTabsMenu },
    template: `
      <div style="max-width: 800px; margin: auto;">
        <HdTabsMenu
          v-model="value"
          :items="items"
        />
      </div>
    `,
    data() {
      return {
        value: '',
        items: ITEMS,
      };
    },
    watch: {
      value(value) {
        action('input')(value);
      },
    },
  }));
