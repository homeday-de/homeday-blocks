<template>
  <div class="gallery-tiles">
    <section class="gallery-tiles__container">
      <div
        v-for="(photo, i) in items.slice(0, limit)"
        :key="photo.image"
        class="gallery-tile"
        :class="{ 'gallery-tile--img': ! background }"
        tabindex="0"
        @keydown.enter.space.prevent="$emit('itemClick', i)"
        @click="$emit('itemClick', i)">
        <HdLazyImage
          :src="photo.image"
          :srcset="photo.imageSrcSet"
          :src-small="photo.thumbnail"
          :background="background"
          class="gallery-tile__image"
        />
      </div>
    </section>
    <button
      class="btn gallery-tile__more-photos"
      @click="$emit('itemClick', 0)"
    >{{ t.GALLERY_TILES.MORE_PHOTOS }}</button>
  </div>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'hd-blocks/lang';
import HdLazyImage from 'hd-blocks/components/HdLazyImage.vue';

export default {
  name: 'HdGalleryTiles',
  components: {
    HdLazyImage,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      default: 5,
    },
    lang: {
      type: String,
      default: 'de',
    },
    texts: {
      type: Object,
      default: () => ({}),
    },
    background: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    t() {
      return merge(getMessages(this.lang), this.texts);
    },
  },
};
</script>

<style lang="scss" scoped>
.gallery-tiles {
  position: relative;
  height: 100%;

  &__container {
    display: -ms-grid;
    display: grid;
    grid-gap: $inset-s;
    -ms-grid-columns: 1fr 1fr 1fr;
    -ms-grid-rows: 1fr 1fr;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    height: 100%;

    @media (min-width: $break-desktop) {
      -ms-grid-columns: 1fr 1fr 1fr 1fr;
      grid-template-columns: repeat(4, 1fr);
    }

    &:hover .gallery-tile:not(:hover)::after {
      opacity: .4;
    }
  }

}

.gallery-tile {
  $_tile: &;

  position: relative;
  overflow: hidden;
  cursor: pointer;

  &--img {
    display: flex;
    align-items: center;

    #{$_tile}__image {
      object-fit: cover;
    }
  }

  @include only-ie {
    margin: $inset-xs;
  }

  &:nth-child(1) {
    -ms-grid-column: 1;
    -ms-grid-row: 1;
    -ms-grid-column-span: 2;
    -ms-grid-row-span: 2;
    grid-column: 1 / 3;
    grid-row: 1 / 3;

    // first of 3 elements
    &:nth-last-child(3) {
      @media (min-width: $break-desktop) and (max-width: $break-desktop-wide) {
        -ms-grid-column-span: 3;
        grid-column: 1 / 4;
      }

      @media (min-width: $break-desktop-wide) {
        -ms-grid-column-span: 2;
        grid-column: 1 / 3;
      }
    }

    // first of 2 elements
    &:nth-last-child(2) {
      @media (min-width: $break-desktop) {
        -ms-grid-column-span: 3;
        grid-column: 1 / 4;
      }
    }
  }

  // To support IE11 :(
  &:nth-child(2) {
    -ms-grid-column: 3;

    // second of 3 elements
    &:nth-last-child(2) {
      -ms-grid-row: 1;

      @media (min-width: $break-desktop) {
        -ms-grid-column: 4;
        }

      @media (min-width: $break-desktop-wide) {
        -ms-grid-column: 3;
        -ms-grid-row-span: 2;
        grid-row: 1 / 3;
      }
    }

    // second of 2 elements
    &:last-child {
      -ms-grid-row-span: 2;
      grid-row: 1 / 3;

      @media (min-width: $break-desktop) {
        -ms-grid-column: 4;
      }
    }
  }

  &:nth-child(3) {
    -ms-grid-column: 4;

    // third of 3 elements
    &:last-child {
      -ms-grid-column: 3;
      -ms-grid-row: 2;

      @media (min-width: $break-desktop) {
        -ms-grid-column: 4;
      }

      @media (min-width: $break-desktop-wide) {
        -ms-grid-row: 1;
        -ms-grid-row-span: 2;
        grid-row: 1 / 3;
      }
    }

  }

  &:nth-child(4) {
    display: none;
    -ms-grid-column: 3;
    -ms-grid-row: 2;

    @media (min-width: $break-desktop) {
      display: block;
    }
  }

  &:nth-child(5) {
    display: none;
    -ms-grid-column: 4;
    -ms-grid-row: 2;

    @media (min-width: $break-desktop) {
      display: block;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: $heather;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: $cello;
    opacity: 0;
    transition: opacity .2s;
  }

  &__image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: transform .3s ease-in-out;

    #{$_tile}:hover & {
      transform: scale(1.05);
    }
  }

  &__more-photos {
    position: absolute;
    bottom: $stack-m;
    right: $inline-m;
    background-color: white;
    padding: $inset-s;
    @include font('text-xsmall');
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    box-shadow:
      0px 1px 3px rgba(0, 0, 0, 0.24),
      0px 0px 2px rgba(0, 0, 0, 0.12);
    cursor: pointer;

    @media (min-width: $break-tablet) {
      right: $inline-l;
    }
    @media (min-width: $break-desktop) {
      display: none;
    }
  }
}
</style>
