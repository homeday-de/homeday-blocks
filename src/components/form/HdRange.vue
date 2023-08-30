<template>
  <div :class="fieldClasses" class="range field">
    <input
      type="range"
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
    />
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
    <template v-if="displayStepBullets">
      <div class="range__steps">
        <button
          v-for="(_, stepIndex) in stepsAmount"
          :key="stepIndex"
          type="button"
          class="range__step"
          @click="onStepClick(stepIndex)"
        >
          <p v-if="labels[stepIndex]" class="range__step-label" v-html="labels[stepIndex]" />
        </button>
      </div>
    </template>
    <template v-else-if="stepBullets.length">
      <div class="range__steps">
        <button
          v-for="(stepValue, stepIndex) in stepBullets"
          :key="stepValue"
          type="button"
          class="range__step"
          @click="onStepClick(stepIndex)"
          :style="customStepBulletOffset(stepValue)"
          :data-value="stepIndex"
        >
          <p v-if="labels[stepIndex]" class="range__step-label" v-html="labels[stepIndex]" />
        </button>
      </div>
    </template>
    <div class="range__thumb" ref="thumb">
      <div v-if="displayTooltip" class="range__tooltip">
        <img :src="tooltipBackground" class="range__tooltip__background" />
        <span class="range__tooltip__content">{{ tooltipValue || value }}</span>
      </div>
      <div class="range__thumb__inner" ref="thumbInner">
        <div class="range__thumb__bullet" />
      </div>
    </div>
  </div>
</template>

<script>
import onResize from 'homeday-blocks/src/services/on-resize';
import tooltipBackground from 'homeday-blocks/src/assets/tooltip.svg';
import formField from './formFieldMixin';

export default {
  name: 'HdRange',
  mixins: [formField],
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
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
      default: '', // falls back to the internal styles
    },
    progressBackground: {
      type: String,
      default: '', // falls back to the internal styles
    },
    stepBullets: {
      type: Array,
      required: false,
      default: () => [],
      validator: (steps) => steps.filter((s) => typeof s === 'number').length === steps.length,
    },
  },
  data() {
    return {
      isActive: null,
      trackWidth: 0,
      tooltipBackground,
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
      this.updateToClosestValue();
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
    onStepClick(stepIndex) {
      this.computedValue = this.min + stepIndex * this.step;
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
    customStepBulletOffset(value) {
      console.log('--------------');
      if (!this.stepBullets.length) return {}; // Early return standard bullets
      const stepPosition = this.stepBullets.indexOf(value);
      const valuePercentage = (value - this.min) / (this.max - this.min);
      let valuePercentageInputWidthPixels = this.trackWidth * valuePercentage;

      console.log('----------------', value);
      console.log('%', valuePercentage);

      if (stepPosition > 0) {
        const previousValue = this.stepBullets[stepPosition - 1];
        const previousValuePercentage = (previousValue - this.min) / (this.max - this.min);
        const previousPercentageInputWidthPixels = this.trackWidth * previousValuePercentage;
        valuePercentageInputWidthPixels -= previousPercentageInputWidthPixels;
        console.log('-', previousValuePercentage);
      }

      return {
        paddingLeft: `${valuePercentageInputWidthPixels}px`,
      };
    },
    getClosestValueInStepBullets(value) {
      return this.stepBullets.reduce((currentClosest, currentValue) => {
        const currentClosestDiff = Math.abs(currentClosest - value);
        const currentValueDiff = Math.abs(currentValue - value);
        return currentClosestDiff > currentValueDiff ? currentValue : currentClosest;
      }, 0);
    },
    updateToClosestValue() {
      if (!this.stepBullets.length) return;
      this.computedValue = this.getClosestValueInStepBullets(this.computedValue);
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.range {
  $range: &;
  height: $sp-l;
  position: relative;
  display: flex;
  align-items: center;

  &:focus {
    outline: none;
  }

  &.hasTooltip {
    margin-top: $sp-xl;
  }

  input[type='range'] {
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
    margin-top: -3px;
    width: 100%;
    height: $range-bar-height;
    border-radius: $range-bar-height;
    background: $disabledColor;
    z-index: 0;
    overflow: hidden;

    &:focus {
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
    padding: 0;
    background: transparent;
    border: 0;

    &:after {
      content: '';
      display: block;
      margin-left: calc(-1 * #{$steps-size / 2});
      margin-top: calc(-1 * #{$steps-size / 2});
      height: $steps-size - ($steps-border-size * 2);
      width: $steps-size - ($steps-border-size * 2);
      border-radius: calc(#{$steps-size} / 2);
      background: $primary-bg;
      border: $steps-border-size solid $quaternary-color;
      border-radius: 50%;
    }
  }

  &__step-label {
    position: absolute;
    top: #{$sp-l + $sp-s};
    transform: translateX(-50%);
    @include font('text-xsmall');
    color: getShade($quaternary-color, 80);
  }

  &__thumb {
    display: block;
    width: 0;
    height: 0;
    transition: transform 0.3s;

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
      margin-top: calc(-1 * #{$range-thumb-tot-size / 2});
      margin-left: calc(-1 * #{$range-thumb-tot-size / 2});
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

      border-radius: $sp-m;
      transition: transform 0.1s ease-in-out;
      transform-origin: center center;

      #{$range}:not(.field--disabled):hover & {
        background-color: $activeColor;
        transform: scale(1.25);
      }

      @include only-ie {
        top: 50%;
        left: 50%;
        margin-left: calc(-1 * #{$range-thumb-inner-bullet-size / 2});
        margin-top: calc(-1 * #{$range-thumb-inner-bullet-size / 2});
      }
    }
  }

  &__progress {
    background-color: $activeColor;
    height: 100%;
    width: 100%;
    transform-origin: 0 center;
    transform: scaleX(0);
    transition: transform 0.3s;

    .field--disabled & {
      background-color: $disabledColor;
    }
  }

  &__tooltip {
    position: absolute;
    bottom: $sp-m;
    transform: translateX(-50%);
    color: $white;
    padding: $sp-s $sp-m #{$sp-m + $sp-s};
    pointer-events: none;

    &__background {
      z-index: 1;
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: 0;
      right: 0;
    }

    &__content {
      z-index: 2;
      position: relative;
    }
  }
}
</style>
