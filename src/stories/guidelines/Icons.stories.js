/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { component as VueCodeHighlight } from 'vue-code-highlight';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import * as smallIcons from 'homeday-assets';
import * as bigIcons from 'homeday-assets/L';
import * as mediumIcons from 'homeday-assets/M';
import * as bicolorIcons from 'homeday-assets/M-old';

storiesOf('Guidelines/Icons & Illustrations', module)
  .addParameters({
    options: {
      showPanel: false,
      isToolshown: false,
    },
    percy: {
      skip: true,
    },
  })
  .add('Small', () => ({
    components: {
      HdIcon,
      VueCodeHighlight,
    },
    data() {
      return {
        icons: Object.entries(smallIcons),
      };
    },
    template: `
      <div>
        <vue-code-highlight>{{
          'import { mail } from "homeday-assets";'
        }}</vue-code-highlight>
        <section style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;">
          <div
            v-for="([name, icon]) in icons"
            style="padding: 16px 8px; display: flex; flex-direction: column; align-items: center; justify-content: center;"
          >
          <HdIcon
            :src="icon"
          />
          <p style="font-size: 14px">{{ name }}</p>
          </div>
        </section>
      </div>
    `,
  }))
  .add('Medium', () => ({
    components: {
      HdIcon,
      VueCodeHighlight,
    },
    data() {
      return {
        icons: Object.entries(mediumIcons),
      };
    },
    template: `
      <div>
        <vue-code-highlight>{{
          'import { elevator } from "homeday-assets/M";'
        }}</vue-code-highlight>
        <section style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;">
          <div
            v-for="([name, icon]) in icons"
            style="padding: 16px 8px; display: flex; flex-direction: column; align-items: center; justify-content: center;"
          >
          <HdIcon
            :src="icon"
          />
          <p style="font-size: 14px">{{ name }}</p>
          </div>
        </section>
      </div>
    `,
  }))
  .add('Large', () => ({
    components: {
      HdIcon,
      VueCodeHighlight,
    },
    data() {
      return {
        icons: Object.entries(bigIcons),
      };
    },
    template: `
      <div>
        <vue-code-highlight>{{
          'import { mail } from "homeday-assets/L";'
        }}</vue-code-highlight>
        <section style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;">
          <div
            v-for="([name, icon]) in icons"
            style="padding: 16px 8px; display: flex; flex-direction: column; align-items: center; justify-content: center;"
          >
          <HdIcon
            :src="icon"
          />
          <p style="font-size: 14px">{{ name }}</p>
          </div>
        </section>
      </div>
    `,
  }))
  .add('Medium (deprecated)', () => ({
    components: {
      HdIcon,
      VueCodeHighlight,
    },
    data() {
      return {
        icons: Object.entries(bicolorIcons),
      };
    },
    template: `
      <div>
        <vue-code-highlight>{{
          'import { elevator } from "homeday-assets/M-old";'
        }}</vue-code-highlight>
        <section style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;">
          <div
            v-for="([name, icon]) in icons"
            style="padding: 16px 8px; display: flex; flex-direction: column; align-items: center; justify-content: center;"
          >
          <HdIcon
            :src="icon"
          />
          <p style="font-size: 14px">{{ name }}</p>
          </div>
        </section>
      </div>
    `,
  }));
