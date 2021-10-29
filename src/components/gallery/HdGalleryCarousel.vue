<template>
  <div
    class="gallery-carousel"
    :class="{
      'gallery-carousel--with-pager-inside': pagerInside,
    }"
  >
    <div
      class="gallery-carousel__wrap"
      tabindex="0"
      @keydown.self="maybeSelectItem"
    >
      <flickity
        ref="flickity"
        :options="flickityOptions"
      >
        <div
          class="gallery-carousel__item"
          v-for="(item, i) in items"
          :key="i"
          :class="{
            'is-active': shouldShowActiveState(i),
          } "
        >
          <div :style="sizerStyles" />

          <!-- the item.thumbnail field is used as default value for the item image -->
          <!-- IE11 uses this value only because do not support the picture element -->
          <picture class="gallery-carousel__picture">
            <source v-for="(source, media) in item.thumbnailPictureSources"
                    :key="media"
                    :media="`(${media})`" :srcset="source"
            >
            <img :src="item.thumbnail" :alt="item.caption" :srcset="item.thumbnailSrcSet" :style="{objectFit}">
          </picture>
        </div>
      </flickity>
      <div class="gallery-carousel__pager">
        <HdPager
          v-if="pagerItemsCount"
          :count="pagerItemsCount"
          :white="pagerInside"
          v-model="currentIndex"
        />
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import Flickity from 'vue-flickity';
import onResize from 'homeday-blocks/src/services/on-resize';
import HdPager from 'homeday-blocks/src/components/HdPager.vue';

export default {
  name: 'HdGalleryCarousel',
  components: {
    Flickity,
    HdPager,
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
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
    objectFit: {
      type: String,
      default: 'cover',
    },
  },
  data() {
    return {
      flickityOptions: {
        prevNextButtons: false,
        pageDots: false,
        groupCells: true,
        contain: true,
        accessibility: false,
      },
      currentIndex: 0,
      pagerItemsCount: 0,
      valueChanged: false,
    };
  },
  computed: {
    sizerStyles() {
      return {
        paddingTop: `${100 / this.aspectRatio}%`,
      };
    },
  },
  watch: {
    // We need to handle a case where a user clicks on the pager
    currentIndex(currentIndex) {
      if (currentIndex === this.$refs.flickity.selectedIndex()) {
        return;
      }

      this.$refs.flickity.select(currentIndex);
    },
    value() {
      this.valueChanged = true;
      this.slideCellIntoView();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.updatePagerItemsCount();
      this.$refs.flickity.on('change', this.updateCurrentIndex);
      this.$refs.flickity.on('staticClick', this.onStaticClick);
    });
    this.addResizeEvents();
  },
  beforeDestroy() {
    this.removeResizeEvents();
    this.$refs.flickity.off('change', this.updateCurrentIndex);
    this.$refs.flickity.off('staticClick', this.onStaticClick);
  },
  methods: {
    updatePagerItemsCount() {
      this.pagerItemsCount = this.$refs.flickity.slides().length;
    },
    delayedUpdatePagerItemsCount() {
      this.$nextTick(() => {
        this.updatePagerItemsCount();
        this.updateCurrentIndex();
      });
    },
    updateCurrentIndex(itemIndex) {
      this.currentIndex = itemIndex;

      const slides = this.$refs.flickity.slides();
      const cells = this.$refs.flickity.cells();

      // If we are showing one item per slide, we update the index on slide change
      if (slides.length === cells.length) {
        this.$emit('input', itemIndex);
      }
    },
    onStaticClick(event, pointer, cellElement, cellIndex) {
      if (typeof cellIndex === 'undefined') {
        return;
      }

      this.$emit('itemClick', cellIndex);
      this.triggerSelectedItem(cellIndex);
    },
    triggerSelectedItem(cellIndex) {
      this.valueChanged = true;
      this.$emit('input', cellIndex);
    },
    shouldShowActiveState(index) {
      if (!this.valueChanged) {
        return false;
      }

      return index === this.value;
    },
    addResizeEvents() {
      onResize.onDebounced(this.delayedUpdatePagerItemsCount);
    },
    removeResizeEvents() {
      onResize.offDebounced(this.delayedUpdatePagerItemsCount);
    },
    maybeSelectItem(e) {
      if (this.disableKeyEvents) {
        return;
      }

      if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
        const currentIndex = this.value;

        if (currentIndex === this.$refs.flickity.cells().length - 1) {
          this.triggerSelectedItem(0);
          return;
        }

        this.triggerSelectedItem(currentIndex + 1);
      } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
        const currentIndex = this.value;

        if (currentIndex === 0) {
          this.triggerSelectedItem(this.$refs.flickity.cells().length - 1);
          return;
        }

        this.triggerSelectedItem(currentIndex - 1);
      }
    },
    slideCellIntoView() {
      const slidesCount = this.$refs.flickity.slides().length;
      const cellsCount = this.$refs.flickity.cells().length;
      const cellsPerSlide = Math.round(cellsCount / slidesCount);
      const targetSlide = Math.floor(this.value / cellsPerSlide);

      this.$refs.flickity.select(targetSlide);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "homeday-blocks/src/styles/mixins.scss";

.gallery-carousel {
  $_root: &;
  position: relative;

  &__wrap {
    overflow: hidden;

    @media (min-width: $break-tablet) {
      padding: $sp-m 0;
    }

    .flickity-viewport {
      overflow: visible;
    }
  }

  &__pager {
    @media (min-width: $break-tablet) {
      margin-top: $sp-m;
    }

    #{$_root}--with-pager-inside & {
      position: absolute;
      bottom: 0px;
      width: 100%;
      background: linear-gradient(to top, rgba($quaternary-color, .45), rgba($quaternary-color, 0));

      @media (min-width: $break-tablet) {
        display: none;
      }
    }
  }

  &__item {
    position: relative;
    width: 100%;
    margin-right: $sp-xs;
    cursor: pointer;
    border-radius: 2px;
    overflow: hidden;
    transition: box-shadow $time-s ease-in-out;
    background-color: $secondary-bg;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: $break-tablet) {
      width: calc(100% / 5);
      margin-right: $sp-m;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

      &:hover,
      &:focus,
      &.is-active {
        box-shadow: 0 5px 7px -3px rgba(0, 0, 0, 0.5);
        @media (min-width: $break-tablet) {
          box-shadow: 0 6px 11px -3px rgba(0, 0, 0, 0.45);
        }
      }
    }

    @media (min-width: $break-desktop) {
      width: calc(100% / 7);
      margin-right: $sp-m;
    }
  }

  &__picture {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
