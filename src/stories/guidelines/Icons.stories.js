/* eslint-disable import/no-extraneous-dependencies */
import { component as VueCodeHighlight } from 'vue-code-highlight';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import * as smallIcons from 'homeday-assets';
import * as bigIcons from 'homeday-assets/L';
import * as mediumIcons from 'homeday-assets/M';
import * as bicolorIcons from 'homeday-assets/M-old';

export default {
  title: 'Guidelines/Icons & Illustrations',
  parameters: {
    docs: { toc: { headingSelector: 'h3' } },
    options: {
      showPanel: false,
      isToolshown: false,
    },
    percy: {
      skip: true,
    },
  },
};

export const Small = {
  render: () => ({
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
  }),

  name: 'Small',
};

export const Medium = {
  render: () => ({
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
  }),

  name: 'Medium',
};

export const Large = {
  render: () => ({
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
  }),

  name: 'Large',
};

export const MediumDeprecated = {
  render: () => ({
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
  }),

  name: 'Medium (deprecated)',
};
