<template>
  <div
    :class="{
      'gallery-carousel': true,
      'gallery-carousel--with-pager': pagerItemsCount > 1,
      'isUsingMouse': isUsingMouse,
    }"
    @keydown="setUsingMouse(false)"
    @mousedown="setUsingMouse(true)"
  >
    <div class="gallery-carousel__wrap">
      <div
        class="gallery-carousel__wrap__inner"
        tabindex="0"
        @keydown.self="maybeSelectItem"
        @blur.self="setUsingMouse(false)"
      >
        <flickity
          ref="flickity"
          :options="flickityOptions"
        >
          <div
            v-for="(item, i) in items"
            :key="i"
            :class="{
              'gallery-carousel__item': true,
              'isActive': shouldShowActiveState(i),
            } "
          >
            <div
              :style="sizerStyles"
              class="gallery-carousel__item__sizer"
            />
            <div
              :style="{
                'background-image': `url('${item.thumbnail}')`,
              }"
              class="gallery-carousel__item__background"
            />
          </div>
        </flickity>
        <div class="gallery-carousel__pager">
          <HdPager
            v-if="pagerItemsCount"
            :count="pagerItemsCount"
            v-model="currentIndex"
          />
        </div>
      </div>
    </div>
    <div
      v-if="pagerItemsCount > 1"
      class="gallery-carousel__controls"
    >
      <button
        :class="{
          'gallery-carousel__controls__prev': true,
          'isDisabled': isFirstPage,
        }"
        type="button"
        @click="goPrev"
      />
      <button
        :class="{
          'gallery-carousel__controls__next': true,
          'isDisabled': isLastPage,
        }"
        type="button"
        @click="goNext"
      />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import Flickity from 'vue-flickity';
import onResize from 'hd-blocks/services/on-resize';
import HdPager from 'hd-blocks/components/HdPager.vue';

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
    aspectRatio: {
      type: Number,
      default: 16 / 9,
    },
  },
  data() {
    return {
      flickityOptions: {
        prevNextButtons: false,
        pageDots: false,
        groupCells: true,
        cellAlign: 'left',
        accessibility: false,
      },
      currentIndex: 0,
      pagerItemsCount: 0,
      valueChanged: false,
      isUsingMouse: false,
    };
  },
  computed: {
    isFirstPage() {
      if (this.currentIndex === 0) {
        return true;
      }

      return false;
    },
    isLastPage() {
      if (this.currentIndex === this.pagerItemsCount - 1) {
        return true;
      }

      return false;
    },
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
    updateCurrentIndex() {
      this.currentIndex = this.$refs.flickity.selectedIndex();
    },
    onStaticClick(event, pointer, cellElement, cellIndex) {
      if (typeof cellIndex === 'undefined') {
        return;
      }

      this.triggerSelectedItem(cellIndex);
    },
    triggerSelectedItem(cellIndex) {
      this.valueChanged = true;
      this.$emit('input', cellIndex);
    },

    goPrev() {
      if (this.isFirstPage) {
        return;
      }

      this.currentIndex -= 1;
    },
    goNext() {
      if (this.isLastPage) {
        return;
      }

      this.currentIndex += 1;
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
    setUsingMouse(usingMouse) {
      this.isUsingMouse = usingMouse;
    },
  },
};
</script>

<style lang="scss">
@import 'hd-blocks/styles/mixins.scss';

.gallery-carousel {
  $_root: &;
  position: relative;

  .gallery-media + & {
    margin-top: $stack-m;
  }

  &__wrap {
    width: calc(100% + #{$inline-m * 2});
    margin-left: ($inline-m * -1);
    padding-top: $stack-s;
    padding-bottom: $stack-m;
    overflow: hidden;

    @media (min-width: $break-tablet) {
      width: calc(100% + #{$inline-s * 2});
      margin-left: ($inline-s * -1);
      padding-top: $stack-m;
    }

    &__inner {
      margin-left: $inline-m;
      width: calc(100% - #{$inline-m * 2});
      transition: outline 0.1s ease-in-out;

      #{$_root}.isUsingMouse & {
        outline: 0;
      }

      @media (min-width: $break-tablet) {
        width: calc(100% - #{$inline-s * 2});
        margin-left: $inline-s;
      }
    }
  }

  .flickity-viewport {
    overflow: visible;
  }

  &__pager {
    margin-top: $stack-m;
  }

  &__item {
    position: relative;
    width: 152px;
    margin-right: $inline-s;
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    overflow: hidden;
    transition: box-shadow $time-s ease-in-out;

    &:hover,
    &:focus,
    &.isActive {
      box-shadow: 0 6px 11px -3px rgba(0, 0, 0, 0.45);
    }

    @media (min-width: $break-tablet) {
      width: calc((100% / 3) - 10px);
      margin-right: 15px;
    }

    @media (min-width: $break-desktop) {
      width: calc((100% / 4) - 12px);
      margin-right: 16px;
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
      background-size: cover;
    }
  }

  &__controls {
    display: none;

    @media (min-width: $break-desktop) {
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

      @media (min-width: $break-desktop-wide) {
        transform: translate(-50%, -50%);
      }

      #{$_root}--with-pager & {
        top: calc(50% - 28px);
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
        background-image: url('../../assets/icons/ic_arrow.svg');
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

      @media (min-width: $break-desktop-wide) {
        transform: translate(50%, -50%);
      }

      &::before {
        transform: none;
      }
    }
  }
}
</style>
