/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import HdLazyImage from 'hd-blocks/components/HdLazyImage.vue';
import ITEMS from './mocks/GALLERY_ITEMS';

storiesOf('HdLazyImage', module)
  .addParameters({ percy: { skip: true } })
  .add('default', () => ({
    components: { HdLazyImage },
    template: `
      <div>
        <HdLazyImage
          :src="src"
          :src-small="srcSmall"
          style="display: block; width: 500px; height: 500px;"
        />
        <button @click="change">Change</button>
      </div>
    `,
    data() {
      return {
        src: 'https://picsum.photos/id/237/2000/2000',
        srcSmall: 'https://picsum.photos/id/237/100/100',
      };
    },
    methods: {
      change() {
        const id = Math.round(Math.random() * 1000);
        this.src = `https://picsum.photos/id/${id}/2000/2000`;
        this.srcSmall = `https://picsum.photos/id/${id}/100/100`;
      },
    },
  }))
  .add('With sources for picture element ', () => ({
    components: { HdLazyImage },
    template: `
      <div>
        <HdLazyImage
          :src="src"
          :srcset="srcset"
          :src-small="srcSmall"
          :alt="alt"
          :pictureSources="pictureSources"
        />
      </div>
    `,
    data() {
      return {
        src: ITEMS[3].image,
        srcset: ITEMS[3].imageSrcSet,
        srcSmall: ITEMS[3].thumbnail,
        alt: ITEMS[3].caption,
        pictureSources: ITEMS[3].pictureSources,
      };
    },
  }))
  .add('as background', () => ({
    components: { HdLazyImage },
    template: `
      <div>
        <HdLazyImage
          :src="src"
          :src-small="srcSmall"
          :background="true"
          style="width: 500px; height: 500px; background-size: contain;"
        />
        <button @click="change">Change</button>
      </div>
    `,
    data() {
      return {
        src: 'https://picsum.photos/id/237/2000/2000',
        srcSmall: 'https://picsum.photos/id/237/100/100',
      };
    },
    methods: {
      change() {
        const id = Math.round(Math.random() * 1000);
        this.src = `https://picsum.photos/id/${id}/2000/2000`;
        this.srcSmall = `https://picsum.photos/id/${id}/100/100`;
      },
    },
  }));
