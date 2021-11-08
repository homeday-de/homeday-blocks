<template>
  <div
    class="gallery"
    :class="{
      'gallery--has-single-item': hasSingleItem,
    }"
  >
    <figure
      v-if="hasImages"
      class="gallery__figure"
    >
      <figcaption
        v-if="showCaption"
        class="gallery__caption">{{ currentItemCaption || '&#8203;' }}</figcaption>
      <div class="gallery__main">
        <div
          class="gallery__image"
          @click="onCurrentItemClick"
        >
          <HdGalleryMedia
            :item="currentItem"
            :aspect-ratio="aspectRatio"
          />
        </div>
        <div
          v-if="items.length > 1"
          class="gallery__controls"
        >
          <button
            class="gallery__controls-prev"
            :class="{
              'isDisabled': isFirstItem,
            }"
            type="button"
            @click="goPrev"
          >
            <HdIcon
              :src="chevronIcon"
              transform="rotate(180)"
            />
          </button>
          <button
            class="gallery__controls-next"
            :class="{
              'isDisabled': isLastItem,
            }"
            type="button"
            @click="goNext"
          >
            <HdIcon :src="chevronIcon" />
          </button>
        </div>
        <p class="gallery__info">{{ `${currentItemIndex + 1}/${items.length}` }}</p>
      </div>
    </figure>
    <HdGalleryPlaceholder
      v-else
      :aspect-ratio="aspectRatio"
      :icon="placeholderIcon"
      :text="placeholderText"
    />
    <slot name="middle"/>
    <HdGalleryCarousel
      v-if="hasImages"
      :items="items"
      v-model="currentItemIndex"
      :pager-inside="pagerInside"
      :aspect-ratio="aspectRatio"
      :disable-key-events="disableKeyEvents"
      :object-fit="carouselObjectFit"
      class="gallery__carousel"
      @itemClick="onCarouselItemClick"
    />
  </div>
</template>

<script>
import HdGalleryCarousel from 'homeday-blocks/src/components/gallery/HdGalleryCarousel.vue';
import HdGalleryMedia from 'homeday-blocks/src/components/gallery/HdGalleryMedia.vue';
import HdGalleryPlaceholder from 'homeday-blocks/src/components/gallery/HdGalleryPlaceholder.vue';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { chevron as chevronIcon } from 'homeday-assets';
import { pictures as picturesIcon } from 'homeday-assets/L';

export default {
  name: 'HdGallery',
  components: {
    HdGalleryCarousel,
    HdGalleryMedia,
    HdGalleryPlaceholder,
    HdIcon,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    pagerInside: {
      type: Boolean,
      default: false,
    },
    aspectRatio: {
      type: Number,
      default: 16 / 9,
    },
    disableKeyEvents: {
      type: Boolean,
      default: false,
    },
    startIndex: {
      type: Number,
      default: 0,
    },
    showCaption: {
      type: Boolean,
      default: true,
    },
    placeholderIcon: {
      type: String,
      default: picturesIcon,
    },
    placeholderText: {
      type: String,
      default: '',
    },
    carouselObjectFit: {
      type: String,
      default: 'cover',
      validator: (value) => ['cover', 'contain', 'fill', 'scale-down', 'none'].includes(value),
    },
  },
  data() {
    return {
      currentItemIndex: this.startIndex,
      chevronIcon,
    };
  },
  computed: {
    currentItem() {
      return this.items[this.currentItemIndex] || this.items[0];
    },
    currentItemCaption() {
      return this.currentItem.caption;
    },
    hasImages() {
      return this.items.length > 0;
    },
    hasSingleItem() {
      return this.items.length === 1;
    },
    isFirstItem() {
      return this.currentItemIndex === 0;
    },
    isLastItem() {
      return this.currentItemIndex === this.items.length - 1;
    },
  },
  watch: {
    currentItem(currentItem, oldCurrentItem) {
      if (currentItem.image === oldCurrentItem.image) {
        return;
      }

      this.$emit('input', currentItem);
    },
  },
  methods: {
    goPrev() {
      if (this.isFirstItem) {
        return;
      }

      this.currentItemIndex -= 1;
    },
    goNext() {
      if (this.isLastItem) {
        return;
      }

      this.currentItemIndex += 1;
    },
    onCarouselItemClick(itemIndex) {
      this.$emit('carouselItemClick', itemIndex);
    },
    onCurrentItemClick() {
      this.$emit('currentItemClick', this.currentItemIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.gallery {
  $_root: &;
  position: relative;
  pointer-events: none;

  > * {
    pointer-events: all;
  }

  &__figure {
    pointer-events: none;

    > * {
      pointer-events: all;
    }
  }

  &__caption {
    margin-bottom: $sp-s;
  }

  &__main {
    position: relative;
    display: none;

    @media (min-width: $break-tablet) {
      display: block;
    }

    &__info {
      position: absolute;
      right: $sp-xs;
      bottom: $sp-xs;
      padding-right: $sp-s;
      padding-left: $sp-s;
      background-color: rgba(0, 0, 0, 0.8);
      @include font('text-xsmall');
      font-weight: 600;
      color: $white;
      border-radius: 2px;
    }
  }

  &__controls {
    display: none;

    @media (min-width: $break-tablet) {
      display: block;
    }

    &-prev,
    &-next {
      display: flex;
      width: 36px;
      height: 36px;
      padding: 0;
      z-index: 3;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-30%, -50%);
      align-items: center;
      justify-content: center;
      appearance: none;
      background-color: $white;
      border-radius: 50%;
      border: 1px solid getShade($quaternary-color, 50);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      cursor: pointer;
      transition: opacity $time-s ease-in-out;

      @media (min-width: $break-desktop) {
        transform: translate(-50%, -50%);
      }

      &.isDisabled {
        opacity: 0;
        pointer-events: none;
      }
    }

    &-next {
      left: auto;
      right: 0;
      transform: translate(30%, -50%);

      @media (min-width: $break-desktop) {
        transform: translate(50%, -50%);
      }
    }
  }

  &__info {
    position: absolute;
    right: $sp-xs;
    bottom: $sp-xs;
    padding-right: $sp-s;
    padding-left: $sp-s;
    background-color: rgba(0, 0, 0, 0.8);
    @include font('text-xsmall');
    font-weight: 600;
    color: $white;
    border-radius: 2px;
  }

  &__carousel {
    #{$_root}--has-single-item & {
      @media (min-width: $break-tablet) {
        display: none;
      }
    }
  }
}
</style>
