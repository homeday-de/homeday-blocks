<template>
  <div
    :class="{
      hasSingleItem,
    }"
    class="gallery"
  >
    <figure
      v-if="hasImages"
      class="gallery__figure"
    >
      <figcaption
        v-if="showCaption"
        class="gallery__caption">{{ currentItemCaption || '&#8203;' }}</figcaption>
      <div class="gallery__main">
        <HdGalleryMedia
          :item="currentItem"
          :aspect-ratio="aspectRatio"
        />
        <div
          v-if="items.length > 1"
          class="gallery__controls"
        >
          <button
            :class="{
              'gallery__controls__prev': true,
              'isDisabled': isFirstItem,
            }"
            type="button"
            @click="goPrev"
          />
          <button
            :class="{
              'gallery__controls__next': true,
              'isDisabled': isLastItem,
            }"
            type="button"
            @click="goNext"
          />
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
      class="gallery__carousel"
      @itemClick="onCarouselItemClick"
    />
  </div>
</template>

<script>
import HdGalleryCarousel from 'hd-blocks/components/gallery/HdGalleryCarousel.vue';
import HdGalleryMedia from 'hd-blocks/components/gallery/HdGalleryMedia.vue';
import HdGalleryPlaceholder from 'hd-blocks/components/gallery/HdGalleryPlaceholder.vue';

export default {
  name: 'HdGallery',
  components: {
    HdGalleryCarousel,
    HdGalleryMedia,
    HdGalleryPlaceholder,
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
      // eslint-disable-next-line global-require
      default: require('hd-blocks/assets/icons/ic_photos.svg'),
    },
    placeholderText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentItemIndex: this.startIndex,
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
  },
};
</script>

<style lang="scss">
@import 'hd-blocks/styles/mixins.scss';

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
    margin-bottom: $stack-s;
  }

  &__main {
    position: relative;
    display: none;

    @media (min-width: $break-tablet) {
      display: block;
    }

    &__info {
      position: absolute;
      right: $inline-xs;
      bottom: $stack-xs;
      padding-right: $inline-s;
      padding-left: $inline-s;
      background-color: rgba(0, 0, 0, 0.8);
      @include font('text-xsmall');
      font-weight: 600;
      color: white;
      border-radius: 2px;
    }
  }

  &__controls {
    display: none;

    @media (min-width: $break-tablet) {
      display: block;
    }

    &__prev,
    &__next {
      display: flex;
      width: 36px;
      height: 36px;
      padding: 0;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-30%, -50%);
      align-items: center;
      justify-content: center;
      appearance: none;
      background-color: $white;
      border-radius: 50%;
      border: 1px solid $ebb2;
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

      &::before {
        content: '';
        display: block;
        height: 24px;
        width: 24px;
        background-image: url('~hd-blocks/assets/icons/ic_arrow.svg');
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        transform: rotateY(180deg);
      }
    }

    &__next {
      left: auto;
      right: 0;
      transform: translate(30%, -50%);

      @media (min-width: $break-desktop) {
        transform: translate(50%, -50%);
      }

      &::before {
        transform: none;
      }
    }
  }

  &__info {
    position: absolute;
    right: $inline-xs;
    bottom: $stack-xs;
    padding-right: $inline-s;
    padding-left: $inline-s;
    background-color: rgba(0, 0, 0, 0.8);
    @include font('text-xsmall');
    font-weight: 600;
    color: white;
    border-radius: 2px;
  }

  &__carousel {
    #{$_root}.hasSingleItem & {
      @media (min-width: $break-tablet) {
        display: none;
      }
    }
  }
}
</style>
