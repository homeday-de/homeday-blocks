<template>
  <component :is="component" :to="to" class="gallery-media">
    <div class="gallery-media__object">
      <div :style="sizerStyles" />

      <!-- the item.image field is used as default value for the item image -->
      <!-- IE11 uses this value only because do not support the picture element -->
      <picture v-if="!item.video" class="gallery-media__object-picture">
        <source
          v-for="(source, media) in item.pictureSources"
          :key="media"
          :media="`(${media})`"
          :srcset="source"
        />
        <img
          ref="imageHolder"
          :src="item.image"
          :alt="item.caption"
          :srcset="item.imageSrcSet"
          @load="hideThumbnail"
          loading="lazy"
        />
      </picture>

      <iframe
        v-else
        class="gallery-media__object-video"
        :src="item.video"
        frameborder="0"
        @load="hideThumbnail"
      />

      <div
        v-if="hasThumbnail"
        class="gallery-media__object-thumbnail"
        :class="{ isVisible: showThumbnail }"
        :style="{ 'background-image': `url('${item.thumbnail}')` }"
      />
    </div>
  </component>
</template>

<script>
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
    to: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      showThumbnail: true,
    };
  },
  computed: {
    component() {
      return this.to ? 'router-link' : 'div';
    },
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
    item(oldValue, newValue) {
      if (oldValue.image !== newValue.image) {
        this.showThumbnail = true;
      }
    },
  },
  methods: {
    hideThumbnail() {
      this.showThumbnail = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.gallery-media {
  $_root: &;

  &__object {
    position: relative;
    overflow: hidden;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $secondary-bg;
    cursor: pointer;

    &-thumbnail,
    &-picture,
    &-video {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
    }

    &-picture,
    &-video {
      z-index: 2;
    }

    &-video {
      width: 100%;
      height: 100%;
    }

    &-picture {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-thumbnail {
      opacity: 0;
      transition: opacity ($time-s * 2) ease-in-out;
      filter: blur(3px);
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;

      @media (min-width: $break-tablet) {
        background-size: cover;
      }

      &.isVisible {
        opacity: 1;
        transition: none;
      }
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
