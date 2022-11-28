<template>
  <div
    v-if="count > 1"
    :class="customClasses"
    @keydown="setUsingMouse(false)"
    @mousedown="setUsingMouse(true)"
  >
    <nav
      :style="customNavStyles"
      class="pager__items"
      tabindex="0"
      @keydown.stop.self="maybeSelectItem"
      @blur="setUsingMouse(false)"
    >
      <ul
        :style="{
          transform: `translateX(${trackOffset}px)`,
        }"
        class="pager__items__track"
      >
        <div
          v-if="modifier === 'wide'"
          :style="{
            'flex-basis': `${outOfRangeItemsOffset}px`,
          }"
          class="pager__items__offset"
        />
        <li
          v-for="item in items"
          :key="item.value"
          :class="customListClass(item)"
          :style="customListStyle"
          :aria-current="item.active ? 'true' : 'false'"
          @click="selectPage(item)"
        >
          <span class="pager__items__item__text">
            {{ item.value + 1 }}
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { getArrayOfSize } from 'homeday-blocks/src/services/utils';

export enum HdPagerSizeEnum {
  REGULAR = 'regular',
  SMALL = 'small',
  TINY = 'tiny',
}

export enum HdPagerModifierEnum {
  WIDE = 'wide',
  CONDENSED = 'condensed',
}

export interface HdPagerProps {
  value: number;
  count: number;
  maxVisible: number;
  white: boolean;
  modifier: HdPagerModifierEnum;
  disabled: boolean;
}

export interface HdPagerItem {
  value: number;
  position: number;
  offset: number;
  size: string;
  active: boolean;
}

const DOT_SIZE = 40;
let rippleTimeout: ReturnType<typeof setTimeout>;

export default Vue.extend({
  name: 'HdPager',
  props: {
    value: {
      type: Number as PropType<HdPagerProps['value']>,
      default: 0,
      validator(value: number) {
        return value >= 0;
      },
    },
    count: {
      type: Number as PropType<HdPagerProps['count']>,
      default: 1,
      validator(count: number) {
        return count >= 1;
      },
    },
    maxVisible: {
      type: Number as PropType<HdPagerProps['maxVisible']>,
      default: 7,
      validator(maxVisible: number) {
        return maxVisible > 3;
      },
    },
    white: {
      type: Boolean as PropType<HdPagerProps['white']>,
      default: false,
    },
    modifier: {
      type: String as PropType<HdPagerProps['modifier']>,
      required: false,
      default: HdPagerModifierEnum.WIDE,
    },
    disabled: {
      type: Boolean as PropType<HdPagerProps['disabled']>,
      required: false,
      default: false,
    },
  },
  data(): {
    dotSize: number;
    hasRippleEffect: boolean;
    trackOffset: number;
    isUsingMouse: boolean;
  } {
    return {
      dotSize: DOT_SIZE,
      hasRippleEffect: false,
      trackOffset: this.count > this.maxVisible ? DOT_SIZE : 0,
      isUsingMouse: false,
    };
  },
  computed: {
    customNavStyles(): { [key: string]: string } {
      return this.modifier === HdPagerModifierEnum.WIDE
        ? {
            height: `${this.dotSize}px`,
            width: `${this.maxVisible * this.dotSize}px`,
          }
        : {};
    },
    customClasses(): { [key: string]: boolean } {
      return {
        pager: true,
        [`pager--${this.modifier}`]: true,
        [`pager--disabled`]: this.disabled,
        isRippleEffectActive: this.hasRippleEffect,
        isUsingMouse: this.isUsingMouse,
        isWhite: this.white,
      };
    },
    customListStyle(): { [key: string]: string } {
      if (this.modifier === HdPagerModifierEnum.CONDENSED) return {};
      return {
        height: `${this.dotSize}px`,
        width: `${this.dotSize}px`,
      };
    },
    outOfRangeItemsOffset(): number {
      return (
        getArrayOfSize(this.count).reduce((acc: number, current: number) => {
          const paddingCount = (this.maxVisible as number) - 1;
          const position = current;
          if (position < (this.value as number) + paddingCount * -1) {
            return acc + 1;
          }
          return acc;
        }, 0) * DOT_SIZE
      );
    },
    items(): HdPagerItem[] {
      return getArrayOfSize(this.count).reduce((acc: HdPagerItem[], current: number) => {
        const paddingCount = (this.maxVisible as number) - 1;
        const position = current;
        if (
          position < (this.value as number) + paddingCount * -1 ||
          position > (this.value as number) + (this.maxVisible as number) + paddingCount
        ) {
          // This item is out of range
          return acc;
        }
        const newItem: HdPagerItem = {
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
    value(): void {
      this.$nextTick(() => {
        this.calculateTrackOffset();
      });
    },
    maxVisible(): void {
      this.$nextTick(() => {
        this.calculateTrackOffset();
      });
    },
    count(): void {
      this.$nextTick(() => {
        this.calculateTrackOffset();
      });
    },
  },
  methods: {
    selectPage(item: HdPagerItem): void {
      if (this.disabled) return;
      this.triggerRippleEffect();
      this.$emit('input', item.value);
    },
    getSize(position: number): HdPagerSizeEnum {
      if (this.count <= this.maxVisible || this.modifier === HdPagerModifierEnum.CONDENSED) {
        return HdPagerSizeEnum.REGULAR;
      }
      if (this.maxVisible === 3) {
        return HdPagerSizeEnum.SMALL;
      }
      const offset = position * DOT_SIZE;
      const isFirstVisible = offset + this.trackOffset === 0;
      const isLastVisible = offset + this.trackOffset - (this.maxVisible - 1) * DOT_SIZE === 0;
      if (isFirstVisible || isLastVisible) {
        return HdPagerSizeEnum.TINY;
      }
      if (this.maxVisible < 7) {
        return HdPagerSizeEnum.REGULAR;
      }
      const isImmediatelyAfterFirstVisible = offset + this.trackOffset === DOT_SIZE;
      const isImmediatelyBeforeLastVisible =
        offset + this.trackOffset - (this.maxVisible - 1) * DOT_SIZE === DOT_SIZE * -1;
      if (this.isOutOfBoundsLeft(position) || this.isOutOfBoundsRight(position)) {
        return HdPagerSizeEnum.TINY;
      }
      if (isImmediatelyAfterFirstVisible || isImmediatelyBeforeLastVisible) {
        return HdPagerSizeEnum.SMALL;
      }
      return HdPagerSizeEnum.REGULAR;
    },
    isOutOfBoundsLeft(position: number): boolean {
      const offset = position * DOT_SIZE;
      return offset + this.trackOffset < 0;
    },
    isOutOfBoundsRight(position: number): boolean {
      const offset = position * DOT_SIZE;
      return offset + this.trackOffset - (this.maxVisible - 1) * DOT_SIZE > 0;
    },
    triggerRippleEffect(): void {
      this.hasRippleEffect = false;
      this.$nextTick(() => {
        this.hasRippleEffect = true;
        clearTimeout(rippleTimeout);
        rippleTimeout = setTimeout(() => {
          this.hasRippleEffect = false;
        }, 550);
      });
    },
    calculateTrackOffset(): void {
      if (this.count < this.maxVisible) {
        this.trackOffset = 0;
        return;
      }
      const currentOffset = this.trackOffset;
      const valueOffset = this.value * DOT_SIZE;
      const isFirstVisible = valueOffset + currentOffset === 0;
      const isLastVisible = valueOffset + currentOffset - (this.maxVisible - 1) * DOT_SIZE === 0;
      if (isFirstVisible) {
        this.trackOffset += DOT_SIZE;
        return;
      }
      if (isLastVisible) {
        this.trackOffset -= DOT_SIZE;
      }
      if (valueOffset + currentOffset < 0) {
        this.trackOffset = valueOffset * -1 + DOT_SIZE;
      }
      if (valueOffset + currentOffset - (this.maxVisible - 1) * DOT_SIZE > 0) {
        this.trackOffset = Math.max(
          (valueOffset - (this.maxVisible - 2) * DOT_SIZE) * -1,
          (this.count * DOT_SIZE - (this.maxVisible - 1) * DOT_SIZE) * -1
        );
      }
    },
    maybeSelectItem(e: KeyboardEvent): void {
      if (this.disabled) return;
      const keyNames = {
        left: ['ArrowLeft', 'Left'],
        right: ['ArrowRight', 'Right'],
        up: ['ArrowUp', 'Up'],
        down: ['ArrowDown', 'Down'],
      };
      if ([...keyNames.down, ...keyNames.right].includes(e.key)) {
        const currentIndex = this.value;
        if (currentIndex === this.count - 1) {
          this.$emit('input', 0);
          return;
        }
        this.$emit('input', currentIndex + 1);
      } else if ([...keyNames.up, ...keyNames.left].includes(e.key)) {
        const currentIndex = this.value;
        if (currentIndex === 0) {
          this.$emit('input', this.count - 1);
          return;
        }
        this.$emit('input', currentIndex - 1);
      }
    },
    setUsingMouse(usingMouse: boolean): void {
      this.isUsingMouse = usingMouse;
    },
    customListClass(item: HdPagerItem) {
      return {
        pager__items__item: true,
        [`pager__items__item--size-${item.size}`]: true,
        isActive: item.active,
      };
    },
  },
});
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

@keyframes pager-ripple {
  0% {
    opacity: 1;
  }
  20% {
    transform: translate(-50%, -50%) scale(calc(20 / 8));
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

      .pager--condensed & {
        transform: translateY(-50%);
        overflow: hidden;
        margin: 0 auto;
        padding-inline-start: 0;
      }
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

      #{$_root}--disabled & {
        cursor: default;
      }

      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        content: '';
        background-color: getShade($quaternary-color, 60);
        border-radius: 50%;
        transition: height $time-s ease-in-out, width $time-s ease-in-out;
        z-index: 2;

        .pager--wide & {
          transform: translate(-50%, -50%);
        }
        .pager--wide.isWhite & {
          transform: translate(-50%, -50%);
          background-color: $primary-bg;
        }
        .pager--condensed & {
          background-color: getShade($quaternary-color, 60);
          left: 0;
        }
      }
      #{$_root}--wide &.isActive::before {
        background-color: getShade($secondary-color, 110);
      }
      #{$_root}--condensed &.isActive::before {
        background-color: getShade($neutral-gray, 90);
        width: 20px;
        border-radius: 15px;
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
      #{$_root}--wide &--size-regular.isActive::before,
      #{$_root}--wide &--size-small.isActive::before,
      #{$_root}--wide &--size-tiny.isActive::before,
      #{$_root}--wide &--size-regular:hover::before,
      #{$_root}--wide &--size-small:hover::before,
      #{$_root}--wide &--size-tiny:hover::before {
        width: 12px;
        height: 12px;
        background-color: getShade($secondary-color, 110);
      }
      #{$_root}--wide &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        transform: translate(-50%, -50%);
        display: block;
        content: '';
        background-color: getShade($secondary-color, 80);
        border-radius: 50%;
        opacity: 0;
      }
      .pager--wide.isWhite &::after {
        background-color: rgba($white, 0.3);
      }
      &.isActive::after,
      #{$_root}--wide.isRippleEffectActive &.isActive::after {
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

  &--condensed {
    .pager__items {
      height: 50px;

      &__item {
        width: 12px;
        margin-right: $sp-xs + $sp-s;
        transition: 0.3s ease width;
        float: left;

        &:last-child {
          margin-right: 0;
        }

        &.isActive {
          width: 24px;
        }
      }
    }
  }
}
</style>
