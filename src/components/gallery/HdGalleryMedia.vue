<template>
  <div class="gallery-media">
    <div class="gallery-media__object">
      <div
        :style="sizerStyles"
        class="gallery-media__object__sizer"/>

      <picture v-if="usePictureElement"
        class="gallery-media__object__picture"
      >
        <source v-for="(source, media) in item.pictureSources"
          :key="media"
          :media="`(${media})`" :srcset="source"
        >
        <img ref="imageHolder" :src="item.image" :alt="item.caption" :srcset="item.imageSrcSet"/>
      </picture>
      <img v-else ref="imageHolder" :src="item.image" :alt="item.caption" :srcset="item.imageSrcSet" />

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
    usePictureElement() {
      return this.item.pictureSources && this.item.pictureSources !== {};
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
      imagesLoaded(this.$refs.imageHolder, () => {
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
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $wild-sand;

    &__thumbnail,
    &__picture {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    &__picture {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__thumbnail {
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      @media (min-width: $break-tablet) {
        background-size: cover;
      }
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }

    &__thumbnail {
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
