<template>
  <div class='range'>
    <input type="range"
      :name="name"
      :v-model="value"
      :required="required"
      :disabled="disabled"
      :min="minValue"
      :max="maxValue"
      :step="rangeStep"
      @input="updateRangeDecoration"
      @change="updateRangeDecoration"
    >
    <div class="range__thumb">
      <div class="range__thumb__bullet">
      </div>
    </div>
    <div class="range__decoration">
      <div class="range__progress">
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
      refault: false,
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
    value: {
      type: Number,
      default: 0,
    },
    rangeStep: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    value() {
      this.input.value = this.value;
      this.updateRangeDecoration();
    },
    minValue() {
      this.updateRangeDecoration();
    },
    maxValue() {
      this.updateRangeDecoration();
    },
  },
  mounted() {
    this.input = this.$el.querySelector('input');
    this.progress = this.$el.querySelector('.range__progress');
    this.progress.style.width = '1px';
    this.thumb = this.$el.querySelector('.range__thumb');

    if (this.minValue > this.maxValue) {
      this.minValue = this.maxValue;
      this.value = this.minValue;
    }

    this.updateRangeDecoration();
  },
  computed: {
  },
  methods: {
    updateRangeDecoration() {
      if (this.input.value > this.maxValue) {
        this.input.value = this.maxValue;
      }

      if (this.input.value < this.minValue) {
        this.input.value = this.minValue;
      }

      this.displayValue = this.input.value;

      // the percentage of the value, between max and min. I.e. : 15 is the 50% between 10 and 20
      const valuePercentage = this.input.value / ((this.$props.maxValue - this.$props.minValue) / 100);
      const valuePercentageInputWidthPixels = this.input.offsetWidth * valuePercentage / 100;

      this.progress.style.transform = `scaleX(${valuePercentageInputWidthPixels})`;

      const thumbWidthOffset = this.thumb.offsetWidth * valuePercentage / 100;
      this.thumb.style.transform = `translateX(${valuePercentageInputWidthPixels - thumbWidthOffset}px)`;
    },
  },
};
</script>

<style lang="scss">
  $shadow: 0 2px 4px 0 rgba(0,0,0,0.25);
  $range-thumb-size: $inset-l;
  $range-thumb-inner-bullet-size : $range-thumb-size / 2;
  $range-thumb-height: $inset-l;
  $range-bar-height: 6px;
  $range-thumb-border: 2px;

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
      $decoration : &;
      position: absolute;
      top: 50%;
      margin-top: - 3px;
      width: 100%;
      height: $range-bar-height;
      border-radius: $range-bar-height;
      background: $heather;
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
      border: $range-thumb-border solid $vivid-blue;
      background: $heather;
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

      display: flex;
      align-items: center;
      justify-content: center;

      &__bullet{
        background: $heather;
        position: absolute;
        height: $range-thumb-size;
        width: $range-thumb-size;
        max-height: $range-thumb-inner-bullet-size;
        max-width: $range-thumb-inner-bullet-size;

        border-radius: $inset-m;
        transition: transform .1s ease-in-out;
        transform-origin: center center;


        #{$range}:hover &{
          background-color: $vivid-blue;
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
      background-color: $vivid-blue;
      height: 100%;
      transform-origin: 0 center;
    }

  }
</style>
