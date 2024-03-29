<template>
  <div
    :class="{
      'expand-text': true,
      isExpanded: isExpanded,
    }"
  >
    <div
      ref="wrapper"
      :style="{
        maxHeight: `${wrapperHeight}px`,
      }"
      class="expand-text__wrapper"
    >
      <slot />
      <p ref="sample" class="expand-text__wrapper__sample">&nbsp;</p>
    </div>
    <button
      v-if="isToggleVisible"
      class="expand-text__toggle"
      type="button"
      @click="toggleExpanded"
    >
      {{ toggleText }}
      <HdIcon :src="chevronIcon" transform="rotate(90)" class="expand-text__toggle__icon" />
    </button>
  </div>
</template>

<script>
import merge from 'lodash/merge';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { getMessages } from 'homeday-blocks/src/lang';
import { mediaMatches } from 'homeday-blocks/src/services/breakpoints';
import onResize from 'homeday-blocks/src/services/on-resize';
import { chevron as chevronIcon } from 'homeday-assets';

export default {
  name: 'HdExpandText',
  components: {
    HdIcon,
  },
  props: {
    // Can be an object with keys set to breakpoints and values the desired
    // lines count
    lines: {
      type: [Number, Object],
      default: 10,
    },
    // If a paragraph has a top margin, it should be specified here
    marginTop: {
      type: Number,
      default: 0,
    },
    // If a paragraph has a bottom margin, it should be specified here
    marginBottom: {
      type: Number,
      default: 0,
    },
    lang: {
      type: String,
      default: 'de',
    },
    texts: {
      type: Object,
      default: () => ({}),
    },
    // Used to approximate the line height before the first mount
    approximateLineHeight: {
      type: Number,
      default: 32,
    },
    // Used if lines is an object and no breakpoint is matched
    linesFallback: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      isExpanded: false,
      isToggleVisible: true,
      wrapperHeight: 0,
      fullHeight: 0,
      chevronIcon,
    };
  },
  computed: {
    t() {
      return merge(getMessages(this.lang), this.texts);
    },
    toggleText() {
      return this.isExpanded
        ? this.t.EXPAND_TEXT.TOGGLE.SHOW_LESS
        : this.t.EXPAND_TEXT.TOGGLE.SHOW_MORE;
    },
  },
  watch: {
    isExpanded: {
      handler() {
        this.resizeWrapper();
      },
      immediate: true,
    },
    lines() {
      this.resizeWrapper();
    },
    linesMobile() {
      this.resizeWrapper();
    },
  },
  mounted() {
    this.$nextTick(this.resizeWrapper);
    this.addResizeEvents();
  },
  beforeDestroy() {
    this.removeResizeEvents();
  },
  methods: {
    // Encapsulated in a method to be able to mock it in the tests
    getScrollHeight(el) {
      return el.scrollHeight;
    },
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
    },
    getLinesCount() {
      if (typeof this.lines === 'number') {
        return this.lines;
      }

      let linesCount = this.linesFallback;

      Object.keys(this.lines).forEach((breakpoint) => {
        if (!mediaMatches(breakpoint)) {
          return;
        }

        linesCount = this.lines[breakpoint];
      });

      return linesCount;
    },
    calculateFullHeight() {
      if (!this.$refs.wrapper) {
        return;
      }

      this.fullHeight = this.getScrollHeight(this.$refs.wrapper);
    },
    resizeWrapper() {
      this.calculateFullHeight();
      const lines = this.getLinesCount();

      // Check if component is already mounted, if not, we approximate
      // the height
      const lineHeight = this.$refs.sample
        ? this.getScrollHeight(this.$refs.sample)
        : this.approximateLineHeight;
      const linesHeight = lineHeight * lines + this.marginTop;

      if (linesHeight + this.marginBottom >= this.fullHeight) {
        this.isToggleVisible = false;
      } else {
        this.isToggleVisible = true;
      }

      if (this.isExpanded && this.$refs.sample) {
        this.wrapperHeight = this.fullHeight;
        return;
      }

      if (linesHeight + this.marginBottom === this.fullHeight) {
        this.wrapperHeight = this.fullHeight + this.marginBottom;
        return;
      }

      this.wrapperHeight = linesHeight;
    },
    addResizeEvents() {
      onResize.onThrottled(this.resizeWrapper);
    },
    removeResizeEvents() {
      onResize.offThrottled(this.resizeWrapper);
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.expand-text {
  $_root: &;
  $_icon-size: 24px;

  &__wrapper {
    position: relative;
    overflow: hidden;
    transition: max-height ($time-s * 2) ease-in-out;

    &__sample {
      position: absolute;
      top: 0;
      pointer-events: none;
      z-index: -1;
      visibility: hidden;

      &::before {
        content: '\2800';
      }
    }
  }

  &__toggle {
    $_root_toggle: &;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0;
    margin-right: $sp-m;
    font-size: 18px;
    line-height: 28px;
    font-family: inherit;
    background-color: transparent;
    border: 0;
    box-shadow: none;
    color: $primary-color;
    cursor: pointer;
    outline: 0;
    transition: color $time-s ease-in-out;

    &:hover,
    &:focus {
      color: getShade($secondary-color, 110);
    }

    @media (min-width: $break-tablet) {
      font-size: 21px;
      line-height: 32px;
    }

    &::before {
      content: '';
      position: absolute;
      bottom: $sp-xs;
      left: 0;
      width: calc(100% - #{$sp-xs + $_icon-size});
      height: 1px;
      background-color: getShade($secondary-color, 110);
    }

    &__icon {
      position: relative;
      width: $_icon-size;
      height: $_icon-size;
      margin-left: $sp-xs;
      transition: transform ($time-s * 2) ease-in-out;

      path {
        fill: currentColor;
      }

      #{$_root}.isExpanded & {
        transform: rotateZ(270deg);
      }
    }
  }
}
</style>
