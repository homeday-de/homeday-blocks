<template>
  <div class="gallery-media">
    <div class="gallery-media__object">
      <div
        :style="sizerStyles"
        class="gallery-media__object__sizer"/>
      <div
        v-if="item.image"
        ref="backgroundHolder"
        :style="{
          'background-image': `url('${item.image}')`,
        }"
        class="gallery-media__object__background"
      />
      <div
        v-if="hasThumbnail"
        :class="{
          'gallery-media__object__thumbnail': true,
          'isVisible': showThumbnail,
        }"
        :style="{
          'background-image': `url('${item.thumbnail}')`,
        }"
      />
    </div>
  </div>
</template>

<script>
import imagesLoaded from 'imagesloaded';

export default {
  name: 'HdGalleryMedia',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    aspectRatio: {
      type: Number,
      default: 16 / 9,
    },
  },
  data() {
    return {
      showThumbnail: true,
    };
  },
  computed: {
    hasThumbnail() {
      return typeof this.item.thumbnail === 'string' && this.item.thumbnail;
    },
    sizerStyles() {
      return {
        paddingTop: `${100 / this.aspectRatio}%`,
      };
    },
  },
  watch: {
    item() {
      this.$nextTick(() => {
        this.hideThumbnailOnBgLoad();
        this.showThumbnail = true;
      });
    },
  },
  mounted() {
    this.hideThumbnailOnBgLoad();
  },
  methods: {
    imageLoadListener() {
      this.showThumbnail = false;
    },
    hideThumbnailOnBgLoad() {
      imagesLoaded(this.$refs.backgroundHolder, { background: true }, () => {
        this.showThumbnail = false;
      });
    },
  },
};
</script>

<style lang="scss">
@import 'hd-blocks/styles/mixins.scss';

.gallery-media {
  $_root: &;

  &__object {
    position: relative;
    overflow: hidden;
    border-radius: 2px;

    &__background {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: $wild-sand;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }

    &__thumbnail {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      opacity: 0;
      transition: opacity ($time-s * 2) ease-in-out;
      filter: blur(4px);

      &.isVisible {
        opacity: 1;
        transition: none;
      }
    }
  }
}
</style>
