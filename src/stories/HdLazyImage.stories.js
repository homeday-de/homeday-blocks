import HdLazyImage from 'homeday-blocks/src/components/HdLazyImage.vue';

export default {
  title: 'Components/Images/HdLazyImage',
  parameters: {
    percy: { skip: true },
  },
};

export const Default = {
  render: () => ({
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
  }),

  name: 'default',
};

export const AsBackground = {
  render: () => ({
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
  }),

  name: 'as background',
};
