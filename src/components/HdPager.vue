<template>
  <div
    v-if="count > 1"
    :class="{
      'pager': true,
      'isRippleEffectActive': hasRippleEffect,
      'isUsingMouse': isUsingMouse,
    }"
    @keydown="setUsingMouse(false)"
    @mousedown="setUsingMouse(true)"
  >
    <nav
      :style="{
        height: `${dotSize}px`,
        width: `${maxVisible * dotSize}px`,
      }"
      class="pager__items"
      tabindex="0"
      @keydown.self="maybeSelectItem"
      @blur="setUsingMouse(false)"
    >
      <ul
        :style="{
          transform: `translateX(${trackOffset}px)`,
        }"
        class="pager__items__track"
      >
        <div
          :style="{
            'flex-basis': `${outOfRangeItemsOffset}px`,
          }"
          class="pager__items__offset"
        />
        <li
          v-for="item in items"
          :key="item.value"
          :class="{
            'pager__items__item': true,
            [`pager__items__item--size-${item.size}`]: true,
            isActive: item.active,
          }"
          :style="{
            height: `${dotSize}px`,
            width: `${dotSize}px`,
          }"
          :aria-current="item.active ? 'true' : 'false'"
          @click="triggerRippleEffect(); $emit('input', item.value)"
        >
          <span class="pager__items__item__text">
            {{ item.value + 1 }}
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { getArrayOfSize } from 'hd-blocks/services/utils';

const DOT_SIZE = 40;
let rippleTimeout;

export default {
  name: 'HdPager',
  props: {
    value: {
      type: Number,
      default: 0,
      validate(value) {
        return value >= 0;
      },
    },
    count: {
      type: Number,
      default: 1,
      validate(count) {
        return count >= 1;
      },
    },
    maxVisible: {
      type: Number,
      default: 7,
      validate(maxVisible) {
        return maxVisible > 3;
      },
    },
  },
  data() {
    return {
      dotSize: DOT_SIZE,
      hasRippleEffect: false,
      trackOffset: this.count > this.maxVisible
        ? DOT_SIZE
        : 0,
      isUsingMouse: false,
    };
  },
  computed: {
    outOfRangeItemsOffset() {
      return getArrayOfSize(this.count).reduce((acc, current) => {
        const paddingCount = this.maxVisible - 1;
        const position = current;

        if (position < (this.value + (paddingCount * -1))) {
          return acc + 1;
        }

        return acc;
      }, 0) * DOT_SIZE;
    },
    items() {
      return getArrayOfSize(this.count).reduce((acc, current) => {
        const paddingCount = this.maxVisible - 1;
        const position = current;

        if (position < (this.value + (paddingCount * -1))
        || position > this.value + this.maxVisible + paddingCount) {
          // This item is out of range
          return acc;
        }

        const newItem = {
          value: current,
          position,
          offset: position * DOT_SIZE,
          size: this.getSize(position),
          active: current === this.value,
        };

        return [...acc, newItem];
      }, []);
    },
  },
  watch: {
    value() {
      this.$nextTick(() => {
        this.calculateTrackOffset();
      });
    },
    maxVisible() {
      this.$nextTick(() => {
        this.calculateTrackOffset();
      });
    },
    count() {
      this.$nextTick(() => {
        this.calculateTrackOffset();
      });
    },
  },
  methods: {
    getSize(position) {
      if (this.count <= this.maxVisible) {
        return 'regular';
      }

      if (this.maxVisible === 3) {
        return 'small';
      }

      const offset = position * DOT_SIZE;
      const isFirstVisible = (offset + this.trackOffset) === 0;
      const isLastVisible = (offset + this.trackOffset)
        - ((this.maxVisible - 1) * DOT_SIZE) === 0;

      if (isFirstVisible || isLastVisible) {
        return 'tiny';
      }

      if (this.maxVisible < 7) {
        return 'regular';
      }

      const isImmediatelyAfterFirstVisible = (offset + this.trackOffset) === DOT_SIZE;
      const isImmediatelyBeforeLastVisible = (offset + this.trackOffset)
        - ((this.maxVisible - 1) * DOT_SIZE) === DOT_SIZE * -1;

      if (this.isOutOfBoundsLeft(position) || this.isOutOfBoundsRight(position)) {
        return 'tiny';
      }

      if (isImmediatelyAfterFirstVisible || isImmediatelyBeforeLastVisible) {
        return 'small';
      }

      return 'regular';
    },
    isOutOfBoundsLeft(position) {
      const offset = position * DOT_SIZE;

      return offset + this.trackOffset < 0;
    },
    isOutOfBoundsRight(position) {
      const offset = position * DOT_SIZE;

      return (offset + this.trackOffset) - ((this.maxVisible - 1) * DOT_SIZE) > 0;
    },
    triggerRippleEffect() {
      this.hasRippleEffect = false;
      this.$nextTick(() => {
        this.hasRippleEffect = true;
        clearTimeout(rippleTimeout);
        rippleTimeout = setTimeout(() => {
          this.hasRippleEffect = false;
        }, 550);
      });
    },
    calculateTrackOffset() {
      if (this.count < this.maxVisible) {
        this.trackOffset = 0;
        return;
      }

      const currentOffset = this.trackOffset;
      const valueOffset = this.value * DOT_SIZE;
      const isFirstVisible = (valueOffset + currentOffset) === 0;
      const isLastVisible = (valueOffset + currentOffset)
        - ((this.maxVisible - 1) * DOT_SIZE) === 0;

      if (isFirstVisible) {
        this.trackOffset += DOT_SIZE;
        return;
      }

      if (isLastVisible) {
        this.trackOffset -= DOT_SIZE;
      }

      if (valueOffset + currentOffset < 0) {
        this.trackOffset = (valueOffset * -1) + DOT_SIZE;
      }

      if ((valueOffset + currentOffset) - ((this.maxVisible - 1) * DOT_SIZE) > 0) {
        this.trackOffset = Math.max(
          (valueOffset - ((this.maxVisible - 2) * DOT_SIZE)) * -1,
          ((this.count * DOT_SIZE) - ((this.maxVisible - 1) * DOT_SIZE)) * -1,
        );
      }
    },
    maybeSelectItem(e) {
      if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
        const currentIndex = this.value;

        if (currentIndex === this.count - 1) {
          this.$emit('input', 0);
          return;
        }

        this.$emit('input', currentIndex + 1);
      } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
        const currentIndex = this.value;

        if (currentIndex === 0) {
          this.$emit('input', this.count - 1);
          return;
        }

        this.$emit('input', currentIndex - 1);
      }
    },
    setUsingMouse(usingMouse) {
      this.isUsingMouse = usingMouse;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'hd-blocks/styles/inputs.scss';

@keyframes pager-ripple {
  0% {
    opacity: 1;
  }

  20% {
    transform: translate(-50%, -50%) scale((20 / 8));
  }

  100% {
    opacity: 0;
  }
}

.pager {
  $_root: &;

  display: flex;
  justify-content: center;

  &__items {
    display: flex;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transition: outline 0.1s ease-in-out;

    #{$_root}.isUsingMouse & {
      outline: 0;
    }

    &__track {
      display: flex;
      align-items: center;
      flex: 0 1 auto;
      max-width: 100%;
      transition: transform ($time-s * 2) ease-in-out;
    }

    &__offset {
      flex-shrink: 0;
    }

    &__item {
      position: relative;
      flex-grow: 0;
      flex-shrink: 0;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;

      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        content: '';
        background-color: $heather;
        border-radius: 50%;
        transition:
          height $time-s ease-in-out,
          width $time-s ease-in-out;
        z-index: 2;
      }

      &.isActive::before {
        background-color: $vivid-blue;
      }

      &--size-regular::before {
        width: 8px;
        height: 8px;
      }

      &--size-small::before {
        width: 6px;
        height: 6px;
      }

      &--size-tiny::before {
        width: 4px;
        height: 4px;
      }

      &--size-regular.isActive::before,
      &--size-small.isActive::before,
      &--size-tiny.isActive::before,
      &--size-regular:hover::before,
      &--size-small:hover::before,
      &--size-tiny:hover::before {
        width: 12px;
        height: 12px;
        background-color: $vivid-blue;
      }

      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        transform: translate(-50%, -50%);
        display: block;
        content: '';
        background-color: rgba($vivid-blue, 0.3);
        border-radius: 50%;
        opacity: 0;
      }

      &.isActive::after,
      #{$_root}.isRippleEffectActive &.isActive::after {
        animation: 500ms pager-ripple ease-in-out;
      }

      &__text {
        border: 0;
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
        word-wrap: normal !important;
      }
    }
  }
}
</style>
