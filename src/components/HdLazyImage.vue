<template>
  <div
    v-if="background"
    ref="imageHolder"
    :class="{ isLoaded: imageLoaded }"
    class="lazy-image"
  />

  <!-- the src field is used as default value for the item image -->
  <!-- IE11 uses this value only because do not support the picture element -->
  <picture v-else>
      <source v-for="(source, media) in pictureSources"
        :key="media"
        :media="`(${media})`" :srcset="source"
      >
    <img ref="imageHolder" class="lazy-image" :class="{ isLoaded: imageLoaded }" :alt="alt">
  </picture>
</template>

<script>
export default {
  name: 'HdLazyImage',
  props: {
    src: {
      type: String,
      default: '',
    },
    srcset: {
      type: String,
      default: '',
    },
    srcSmall: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: null,
    },
    background: {
      type: Boolean,
      default: false,
    },
    pictureSources: {
      type: Array,
      default: null,
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
        this.setImageSrcset();
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
    setImageSrcset() {
      if (!this.srcset) {
        return;
      }

      this.$refs.imageHolder.srcset = this.srcset;
    },
  },
};
</script>

<style lang="scss" scoped>
.lazy-image {
  width: 100%;
  filter: blur(4px);

  &.isLoaded {
    filter: blur(0);
  }
}
</style>
