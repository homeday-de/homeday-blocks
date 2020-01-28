<template>
  <div
    :class="fieldClasses"
    class="range field"
  >
    <input type="range"
      v-model.number="computedValue"
      :id="name"
      :name="name"
      :required="required"
      :disabled="disabled"
      :min="min"
      :max="max"
      :step="step"
      @focus="focusHandler"
      @blur="blurHandler"
    >
    <div
      ref="track"
      :style="{
        background: trackBackground,
      }"
      class="range__track"
    >
      <div
        ref="progress"
        :style="{
          background: progressBackground,
        }"
        class="range__progress"
      />
    </div>
    <ul v-if="displayStepBullets" class="range__steps">
      <li
        v-for="stepNumber in stepsAmount"
        :key="stepNumber"
        class="range__step"
        @click="onStepClick(stepNumber)"
      >
        <p
          v-if="labels[stepNumber - 1]"
          class="range__step-label"
          v-text="labels[stepNumber - 1]"
        />
      </li>
    </ul>
    <div class="range__thumb" ref="thumb">
      <div
        v-if="displayTooltip"
        class="range__tooltip"
      >
        {{ tooltipValue || value }}
      </div>
      <div class="range__thumb__inner" ref="thumbInner">
        <div class="range__thumb__bullet" />
      </div>
    </div>
  </div>
</template>

<script>
import onResize from 'hd-blocks/services/on-resize';

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
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: 0,
    },
    labels: {
      type: Array,
      default: () => [],
    },
    displayStepBullets: {
      type: Boolean,
      default: false,
    },
    displayTooltip: {
      type: Boolean,
      default: false,
    },
    tooltipValue: {
      type: [String, Number],
      default: '',
    },
    trackBackground: {
      type: String,
      default: 'fallback to the styles',
    },
    progressBackground: {
      type: String,
      default: 'fallback to the styles',
    },
  },
  data() {
    return {
      isActive: null,
      trackWidth: 0,
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.value;
      },
      set(value) {
        if (value !== this.computedValue) {
          this.$emit('input', value);
        }
      },
    },
    fieldClasses() {
      return {
        'field--active': this.isActive,
        'field--disabled': this.disabled,
        hasTooltip: this.displayTooltip,
      };
    },
    stepsAmount() {
      return Math.ceil(1 + (this.max - this.min) / this.step);
    },
  },
  watch: {
    min() {
      this.updateUI();
    },
    max() {
      this.updateUI();
    },
    step() {
      this.updateUI();
    },
    value() {
      this.adjustValue();
      this.updateUI();
    },
  },
  mounted() {
    this.adjustValue();

    this.trackWidth = this.$refs.track.offsetWidth;
    this.updateUI();
    onResize.onDebounced(this.onResize);
  },
  beforeDestroy() {
    onResize.offDebounced(this.onResize);
  },
  methods: {
    adjustValue() {
      let adjustedValue = this.value;

      adjustedValue -= adjustedValue % this.step;
      adjustedValue = Math.min(adjustedValue, this.max);
      adjustedValue = Math.max(adjustedValue, this.min);

      this.computedValue = adjustedValue;
    },
    updateUI() {
      // the percentage of the value, between max and min. I.e. : 15 is the 0.5 between 10 and 20
      const valuePercentage = (this.computedValue - this.min) / (this.max - this.min);
      const valuePercentageInputWidthPixels = this.trackWidth * valuePercentage;

      this.$refs.progress.style.transform = `scaleX(${valuePercentage})`;
      this.$refs.thumb.style.transform = `translateX(${valuePercentageInputWidthPixels}px)`;
    },
    onStepClick(stepNumber) {
      this.computedValue = (this.max - this.min) * (stepNumber / this.stepsAmount);
    },
    onResize() {
      this.trackWidth = this.$refs.track.offsetWidth;
      this.updateUI();
    },
    focusHandler() {
      this.isActive = true;
    },
    blurHandler() {
      this.isActive = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import 'hd-blocks/styles/mixins.scss';

.range {
  $range: &;
  height: $stack-l;
  position: relative;
  display: flex;
  align-items: center;

  &:focus {
    outline: none;
  }

  &.hasTooltip {
    margin-top: $stack-xl;
  }

  input[type=range] {
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

    &:focus {
      outline: none;
    }

    // range invisible
    @mixin thumb-style {
      -webkit-appearance: none;
      background: none;
      border: none;
      height: $range-thumb-tot-size;
      width: $range-thumb-tot-size;
      display: block;
      -moz-appearance: none;
      cursor: grab;

      height: 1px;
      width: 1px;
      transform: scale(strip-unit($range-thumb-tot-size));
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

    &::-moz-range-thumb {
      @include thumb-style;
    }

    &::-ms-thumb {
      @include thumb-style;
    }

    &::-webkit-slider-runnable-track {
      @include track-style;
    }

    &::-moz-range-track {
      @include track-style;
    }

    &::-ms-track,
    &::-ms-fill-lower,
    &::-ms-fill-upper {
      @include track-style;
    }
  }

  &__track {
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

  &__steps {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__step {
    height: 1px;
    width: 1px;
    cursor: pointer;

    &:after {
      content: "";
      display: block;
      margin-left: - $steps-size / 2;
      margin-top: - $steps-size / 2;
      height: $steps-size - ($steps-border-size * 2);
      width: $steps-size - ($steps-border-size * 2);
      border-radius: $steps-size / 2;
      background: #FFFFFF;
      border: $steps-border-size solid $nevada;
      border-radius: 50%;
    }
  }

  &__step-label {
    position: absolute;
    top: #{$stack-l + $stack-s};
    transform: translateX(-50%);
    @include font('text-xsmall');
    color: $regent-gray;
  }

  &__thumb {
    display: block;
    width: 0;
    height: 0;
    transition: transform .3s;

    &__inner {
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
      margin-top: - $range-thumb-tot-size / 2;
      margin-left: - $range-thumb-tot-size / 2;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .field--disabled & {
      border-color: $disabledColor;
      pointer-events: none;
    }

    &__bullet {
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

      @include only-ie {
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
    width: 100%;
    transform-origin: 0 center;
    transform: scaleX(0);
    transition: transform .3s;

    .field--disabled & {
      background-color: $disabledColor;
    }
  }

  &__tooltip {
    position: absolute;
    bottom: $stack-m;
    transform: translateX(-50%);
    color: white;
    background: url('~hd-blocks/assets/icons/tooltip.svg') no-repeat;
    background-size: 100% 100%;
    padding: $stack-s $inline-m #{$stack-m + $stack-s};
    pointer-events: none;
  }
}
</style>
