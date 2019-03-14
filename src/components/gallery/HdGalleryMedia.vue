<template>
  <div
    :class="{
      'gallery-media': true,
      'gallery-media--no-shadows': !shadow,
    }"
  >
    <figure class="gallery-media__object">
      <div class="gallery-media__object__wrapper">
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
        <div class="gallery-media__object__overlay"/>
        <div
          v-if="itemCaption || item.caption"
          class="gallery-media__object__caption-overlay"
        />
      </div>
      <figcaption
        v-if="itemCaption || item.caption"
        class="gallery-media__object__caption"
      >
        {{ itemCaption || item.caption }}
      </figcaption>
    </figure>
  </div>
</template>

<script>
import imagesLoaded from 'imagesloaded';

export default {
  name: 'HdGalleryMedia',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    itemCaption: {
      type: String,
      default: '',
    },
    aspectRatio: {
      type: Number,
      default: 16 / 9,
    },
    shadow: {
      type: Boolean,
      default: true,
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

<style lang="scss" scoped>
@import 'hd-blocks/styles/mixins.scss';

.gallery-media {
  $_root: &;

  margin-bottom: $stack-s;

  &__object {
    position: relative;

    &__wrapper {
      position: relative;
      overflow: hidden;
      border-radius: 2px;
    }

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

      #{$_root}--no-shadows & {
        background-color: transparent;
      }
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

    &__caption {
      position: absolute;
      min-height: 48px;
      padding: $inset-s;
      top: 0;
      right: 0;
      left: 0;
      font-size: 14px;
      line-height: 18px;
      color: $white;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.4) 45.21%,
        rgba(0, 0, 0, 0) 100%
      );
      z-index: 7;

      #{$_root}--no-shadows & {
        position: static;
        min-height: 0;
        padding-left: 0;
        background: none;
        color: $cello;

        @media (min-width: $break-tablet) {
          position: absolute;
          min-height: 48px;
          padding-left: $inset-s;
        }
      }

      @media (min-width: $break-tablet) {
        font-size: 18px;
        line-height: 24px;
      }

      @media (min-width: $break-desktop) {
        padding: $inset-m;
      }
    }

    &__overlay {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      box-shadow: inset 0px 0px 32px rgba(0, 0, 0, 0.3);
      z-index: 6;

      #{$_root}--no-shadows & {
        box-shadow: none;
      }
    }
  }
}
</style>
