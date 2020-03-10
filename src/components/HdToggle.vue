<template>
  <div
    :class="{
      'hd-toggle--is-open': open,
      'hd-toggle--is-using-mouse': isUsingMouse,
    }"
    class="hd-toggle"
    @keydown="setUsingMouse(false)"
    @mousedown="setUsingMouse(true)"
  >
    <button
      :disabled="!canBeToggled"
      class="hd-toggle__control"
      type="button"
      @click="toggleOpen"
    >
      {{ title }}
    </button>
    <div
      ref="body"
      :style="{
        maxHeight: `${maxHeight}px`,
        transitionDuration: `${transitionDuration}ms`,
      }"
      class="hd-toggle__body"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { OnResizeService } from 'homeday-blocks';

export default {
  name: 'HdToggle',
  props: {
    title: {
      type: String,
      default: '',
    },
    canBeToggled: {
      type: Boolean,
      default: true,
    },
    open: {
      type: Boolean,
      default: true,
    },
    transitionDuration: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      // bodyHeight is a string only initially, will be set to a Number
      // as soon as it is mounted
      bodyHeight: '100%',
      isUsingMouse: false,
      internalFocusRemoved: false,
    };
  },
  computed: {
    maxHeight() {
      if (this.open) {
        return this.bodyHeight;
      }

      return 0;
    },
  },
  watch: {
    open: {
      handler(open) {
        this.ensureBodyScrolledToTop();

        this.$nextTick(() => {
          if (open) {
            this.enableInternalFocus();
          } else {
            this.disableInternalFocus();
          }
        });
      },
      immediate: true,
    },
  },
  mounted() {
    this.$nextTick(this.calculateBodyHeight);
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
    toggleOpen() {
      if (this.canBeToggled === false) {
        return;
      }

      this.$emit('toggle', !this.open);
    },
    calculateBodyHeight() {
      if (!this.$refs.body) {
        return;
      }

      this.bodyHeight = this.getScrollHeight(this.$refs.body);
    },
    ensureBodyScrolledToTop() {
      if (!this.$refs.body) {
        return;
      }

      this.$refs.body.scrollTop = 0;
    },
    disableInternalFocus() {
      if (!this.$refs.body) {
        return;
      }

      const $innerFocusableElements = this.$refs.body.querySelectorAll(
        'a, button, [tabindex]',
      );

      if (!$innerFocusableElements.length) {
        return;
      }

      Array.from($innerFocusableElements).forEach((el) => {
        const currentTabIndex = el.getAttribute('tabindex');

        if (currentTabIndex !== null) {
          el.setAttribute('data-hd-tabindex-backup', currentTabIndex);
        }

        el.setAttribute('tabindex', '-1');
      });

      this.internalFocusRemoved = true;
    },
    enableInternalFocus() {
      if (!this.$refs.body || this.internalFocusRemoved === false) {
        return;
      }

      const $innerFocusableElements = this.$refs.body.querySelectorAll(
        'a, button, [tabindex]',
      );

      if (!$innerFocusableElements.length) {
        return;
      }

      Array.from($innerFocusableElements).forEach((el) => {
        const oldTabIndex = el.getAttribute('data-hd-tabindex-backup');

        if (oldTabIndex !== null) {
          el.setAttribute('tabindex', oldTabIndex);
          el.removeAttribute('data-hd-tabindex-backup');
        } else {
          el.removeAttribute('tabindex');
        }
      });
    },
    addResizeEvents() {
      OnResizeService.onDebounced(this.calculateBodyHeight);
    },
    removeResizeEvents() {
      OnResizeService.offDebounced(this.calculateBodyHeight);
    },
    setUsingMouse(usingMouse) {
      this.isUsingMouse = usingMouse;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

$_controlIconSize: 32px;

.hd-toggle {
  $_root: &;

  &__control {
    display: block;
    position: relative;
    width: 100%;
    min-height: $_controlIconSize;
    padding: 0 $_controlIconSize 0 0;
    margin: 0;
    border: 0;
    background-color: transparent;
    box-shadow: none;
    @include font('subtitle');
    text-align: left;
    transition: outline $time-s ease-in-out;

    @media (min-width: $break-tablet) {
      @include font('title');
    }

    &:not([disabled]) {
      cursor: pointer;

      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: $_controlIconSize;
        height: $_controlIconSize;
        background-image: url('~@/assets/icons/ic_chevron-down.svg');
        background-position: center;
        background-repeat: no-repeat;
        transition: transform ($time-s * 2) ease-in-out;

        #{$_root}--is-open & {
          transform: rotate(180deg);
        }
      }
    }

    #{$_root}--is-using-mouse & {
      outline: 0;
    }
  }

  &__body {
    overflow: hidden;
    transition-property: max-height;
    transition-timing-function: linear;
  }
}
</style>
