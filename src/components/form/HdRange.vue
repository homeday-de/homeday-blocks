<template>
  <div
    :class="fieldClasses"
    class="range field"
  >
    <input type="range"
      ref="input"
      v-model="currentValue"
      :id="name"
      :name="name"
      :required="required"
      :disabled="disabled"
      :min="minValue"
      :max="maxValue"
      :step="rangeStep"
      @input="updateRangeDecoration"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    >
    <div class="range__thumb" ref="thumb">
      <div class="range__thumb__bullet">
      </div>
    </div>
    <div class="range__decoration">
      <div class="range__progress" ref="progress">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HdRange',
  props: {
    name: {
      type: String,
      default: 'range',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 100,
    },
    rangeStep: {
      type: Number,
      default: 1,
    },
    isLegacy: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isActive: null,
      currentValue: this.value,
    };
  },
  computed: {
    fieldClasses() {
      return {
        'field--active': this.isActive,
        'field--disabled': this.disabled,
      };
    },
  },
  watch: {
    minValue() {
      this.updateRangeDecoration();
    },
    maxValue() {
      this.updateRangeDecoration();
    },
    rangeStep() {
      this.updateRangeDecoration();
    },
    value() {
      this.currentValue = this.value;
      this.updateRangeDecoration();
    },
  },
  mounted() {
    this.progress = this.$refs.progress;
    this.progress.style.width = '1px';

    this.thumb = this.$refs.thumb;

    this.updateRangeDecoration();
  },
  methods: {
    normalizeAndEmit() {
      if (this.currentValue > this.maxValue) {
        this.currentValue = this.maxValue;
      } else if (this.currentValue < this.minValue) {
        this.currentValue = this.minValue;
      }

      this.currentValue = this.currentValue - (this.currentValue % this.rangeStep);

      this.$emit('input', parseFloat(this.currentValue));
    },
    updateRangeDecoration() {
      this.normalizeAndEmit();

      // the percentage of the value, between max and min. I.e. : 15 is the 50% between 10 and 20
      const valuePercentage = this.currentValue / ((this.$props.maxValue - this.$props.minValue) / 100);
      const valuePercentageInputWidthPixels = this.$refs.input.offsetWidth * valuePercentage / 100;

      this.progress.style.transform = `scaleX(${valuePercentageInputWidthPixels})`;

      const thumbWidthOffset = this.thumb.offsetWidth * valuePercentage / 100;
      this.thumb.style.transform = `translateX(${valuePercentageInputWidthPixels - thumbWidthOffset}px)`;
    },
    handleFocus() {
      this.isActive = true;
    },
    handleBlur() {
      this.isActive = false;
    },
    handleChange() {
      if (!this.isLegacy) {
        return;
      }

      this.updateRangeDecoration();
    },
  },
};
</script>

<style scoped lang="scss">
  $shadow: 0 2px 4px 0 rgba(0,0,0,0.25);
  $range-thumb-size: $inset-l;
  $range-thumb-inner-bullet-size : $range-thumb-size / 2;
  $range-thumb-height: $inset-l;
  $range-bar-height: 6px;
  $range-thumb-border: 2px;
  $activeColor: $vivid-blue;
  $disabledColor: $heather;

  .range {
    $range: &;
    flex-basis: 100%;
    margin: 0 auto $stack-m auto;
    height: $stack-l;
    position: relative;

    @media (min-width: $break-desktop) {
      margin-top: $stack-s;
    }

    &:focus{
      outline: none;
    }

    input[type=range] {
      $ipr: &;
      -moz-appearance: none;
      -webkit-appearance: none;
      background: transparent;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      margin: 0;
      padding: 0;
      height: $range-thumb-size;

      &:focus{
        outline: none;
      }

      // range invisible
      @mixin thumb-style {
        -webkit-appearance: none;
        background: none;
        border: none;
        height: $inset-l;
        width: $inset-l;
        display: block;
        -moz-appearance: none;
        cursor: grab;
      }

      @mixin track-style {
        background: transparent;
        border-color: transparent;
        border: 0;
        color: transparent;
        cursor: pointer;

      }

      &::-webkit-slider-thumb {
        @include thumb-style;
      }

      &::-moz-range-thumb{
        @include thumb-style;
      }

      &::-ms-thumb{
        @include thumb-style;
      }

      &::-webkit-slider-runnable-track {
        @include track-style;
      }

      &::-moz-range-track{
        @include track-style;
      }

      &::-ms-track,
      &::-ms-fill-lower,
      &::-ms-fill-upper {
        @include track-style;
      }
    }

    &__decoration {
      position: absolute;
      top: 50%;
      margin-top: - 3px;
      width: 100%;
      height: $range-bar-height;
      border-radius: $range-bar-height;
      background: $disabledColor;
      z-index: 0;
      overflow: hidden;

      &:focus{
        box-shadow: none;
      }
    }

    $range-thumb-tot-size: $range-thumb-size + $range-thumb-border + $range-thumb-border;
    &__thumb {
      display: block;
      cursor: grab;
      box-shadow: $shadow;
      border: $range-thumb-border solid $activeColor;
      background: $disabledColor;
      height: $range-thumb-tot-size;
      width: $range-thumb-tot-size;
      border-radius: $range-thumb-size;
      position: absolute;
      background: $white;
      left: 0;
      top: 50%;
      margin-top: - $range-thumb-tot-size / 2;
      margin-left: 0;
      z-index: 1;

      .field--disabled & {
        border-color: $disabledColor;
        pointer-events: none;
      }

      display: flex;
      align-items: center;
      justify-content: center;

      &__bullet{
        background: $disabledColor;
        position: absolute;
        height: $range-thumb-size;
        width: $range-thumb-size;
        max-height: $range-thumb-inner-bullet-size;
        max-width: $range-thumb-inner-bullet-size;

        border-radius: $inset-m;
        transition: transform .1s ease-in-out;
        transform-origin: center center;


        #{$range}:not(.field--disabled):hover &{
          background-color: $activeColor;
          transform: scale(1.25);
        }

        @include only-ie{
          top: 50%;
          left: 50%;
          margin-left: - $range-thumb-inner-bullet-size / 2;
          margin-top: - $range-thumb-inner-bullet-size / 2;
        }
      }
    }

    &__progress {
      background-color: $activeColor;
      height: 100%;
      transform-origin: 0 center;

      .field--disabled & {
        background-color: $disabledColor;
      }
    }

  }
</style>
