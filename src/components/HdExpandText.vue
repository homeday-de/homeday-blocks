<template>
  <div
    :class="{
      'expand-text': true,
      'isExpanded': isExpanded,
    }"
  >
    <div
      ref="wrapper"
      :style="{
        maxHeight: `${wrapperHeight}px`,
      }"
      class="expand-text__wrapper"
    >
      <slot/>
      <p
        ref="sample"
        class="expand-text__wrapper__sample"
      >&nbsp;</p>
    </div>
    <button
      v-if="isToggleVisible"
      class="expand-text__toggle"
      type="button"
      @click="toggleExpanded"
    >
      {{ toggleText }}
      <div class="expand-text__toggle__icons"/>
    </button>
  </div>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'hd-blocks/lang';
import { isMobile } from 'hd-blocks/services/breakpoints';
import onResize from 'hd-blocks/services/on-resize';

const getApproximatedLineHeight = () => {
  if (isMobile()) {
    return 28;
  }

  return 32;
};

export default {
  name: 'HdExpandText',
  props: {
    lines: {
      type: Number,
      default: 10,
    },
    linesMobile: {
      type: Number,
      default: 0,
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
      default: () => {},
    },
  },
  data() {
    return {
      isExpanded: false,
      isToggleVisible: true,
      wrapperHeight: 0,
      fullHeight: 0,
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
    calculateFullHeight() {
      if (!this.$refs.wrapper) {
        return;
      }

      this.fullHeight = this.getScrollHeight(this.$refs.wrapper);
    },
    resizeWrapper() {
      this.calculateFullHeight();
      const linesMobile = this.linesMobile
        ? this.linesMobile
        : this.lines;
      const lines = isMobile()
        ? linesMobile
        : this.lines;

      // Check if component is already mounted, if not, we approximate
      // the height
      const lineHeight = this.$refs.sample
        ? this.getScrollHeight(this.$refs.sample)
        : getApproximatedLineHeight();
      const linesHeight = (lineHeight * lines) + this.marginTop;

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
@import 'hd-blocks/styles/mixins.scss';

.expand-text {
  $_root: &;
  $_icon-size: 16px;

  &__wrapper {
    position: relative;
    overflow: hidden;
    transition: max-height ($time-s * 2) ease-in-out;

    &__sample {
      position: absolute;
      top: 0;
      pointer-events: none;
      z-index: -1;
    }
  }

  &__toggle {
    $_root_toggle: &;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0;
    margin-right: $inline-m;
    font-size: 18px;
    line-height: 28px;
    font-family: inherit;
    background-color: transparent;
    border: 0;
    box-shadow: none;
    color: $cello;
    cursor: pointer;
    outline: 0;
    transition: color $time-s ease-in-out;

    &:hover,
    &:focus {
      color: $vivid-blue;
    }

    @media (min-width: $break-tablet) {
      font-size: 21px;
      line-height: 32px;
    }

    &::before {
      content: '';
      position: absolute;
      bottom: $stack-xs;
      left: 0;
      width: calc(100% - #{$inline-xs + $_icon-size});
      height: 1px;
      background-color: $vivid-blue;
    }

    &__icons {
      position: relative;
      width: $_icon-size;
      height: $_icon-size;
      margin-left: $inline-xs;
      transition: transform ($time-s * 2) ease-in-out;

      #{$_root}.isExpanded & {
        transform: rotateZ(180deg);
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        background-image: url('../assets/icons/ic_chevron-down.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        transition: opacity $time-s ease-in-out;

        #{$_root_toggle}:hover &,
        #{$_root_toggle}:focus & {
          opacity: 0;
        }
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        background-image: url('../assets/icons/ic_chevron-down--active.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        transition: opacity $time-s ease-in-out;
        opacity: 0;

        #{$_root_toggle}:hover &,
        #{$_root_toggle}:focus & {
          opacity: 1;
        }
      }
    }
  }
}
</style>
