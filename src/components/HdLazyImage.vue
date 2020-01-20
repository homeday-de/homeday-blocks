<template>
  <div
    v-if="background"
    ref="imageHolder"
    :class="{ isLoaded: imageLoaded }"
    class="lazy-image"
  />
  <img
    v-else
    ref="imageHolder"
    :class="{ isLoaded: imageLoaded }"
    class="lazy-image">
</template>

<script>
export default {
  name: 'HdLazyImage',
  props: {
    src: {
      type: String,
      default: '',
    },
    srcSmall: {
      type: String,
      default: '',
    },
    background: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imageLoaded: false,
    };
  },
  watch: {
    src() {
      this.maybeLazyLoad();
    },
  },
  mounted() {
    this.maybeLazyLoad();
  },
  methods: {
    maybeLazyLoad() {
      this.setImageUrl('');

      if (!this.srcSmall) {
        this.setImageUrl(this.src);
        this.imageLoaded = true;
        return;
      }

      this.imageLoaded = false;
      this.setImageUrl(this.srcSmall);

      const image = new Image();

      image.onload = () => {
        this.imageLoaded = true;
        this.setImageUrl(this.src);
      };

      image.src = this.src;
    },
    setImageUrl(url) {
      if (!this.$refs.imageHolder) {
        return;
      }

      if (this.background) {
        this.$refs.imageHolder.style.backgroundImage = `url('${url}')`;
      } else {
        this.$refs.imageHolder.src = url;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'hd-blocks/styles/mixins.scss';

.lazy-image {
  width: 100%;
  filter: blur(4px);

  &.isLoaded {
    filter: blur(0);
  }
}
</style>
