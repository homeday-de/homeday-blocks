<template>
  <div class="loaderButton" :class="progressClass">
      <button
        class="btn btn--primary loaderButton__button"
        :style="buttonStyles"
        ref="button"
        @click="clicked"
        @keyup.enter.space="clicked"
        @transitionend="runTransitionQue"
      >
        <span class="loaderButton__button__label">{{ label }}</span>
      </button>

      <!-- Loading circle -->
      <svg class="loaderButton__svg loaderButton__svg--progressCircle" v-show="state == 'loading'" :width="`${buttonHeight}px`" :height="`${buttonHeight}px`" ref="circle">
        <path
          :d="circlePath"
          :style="{strokeWidth: `${loadingCircleStrokeWidth}px`}"
        />
      </svg>

      <svg class="loaderButton__svg loaderButton__svg--checkmark" width="46px" height="46px" ref="check">
        <!-- Checkmark -->
        <g stroke="#1895FF" :style="scaledPath">
          <path d="m11.066433,23.18223l8.364397,7.766946"/>
          <path d="m34.933565,15.050822l-15.180095,15.533867"/>
        </g>
      </svg>

      <!-- Error cross -->
      <svg class="loaderButton__svg loaderButton__svg--cross" width="46px" height="46px" ref="cross">
        <g stroke="#1895FF" :style="scaledPath">
          <path d="m23,23l-10.3,-10.3"/>
          <path d="m23,23l10.3,10.3"/>
          <path d="m23,23l-10.3,10.3"/>
          <path d="m23,23l10.3,-10.3"/>
        </g>
      </svg>
  </div>
</template>

<script>
import { getRandomInt, circleToPath } from 'hd-blocks/services/utils';
import debounce from 'lodash/debounce';

export default {
  name: 'hdLoaderButton',
  props: {
    loadingState: {
      type: String,
      validator: val => ['success', 'error'].indexOf(val) !== -1,
    },
    label: {
      type: String,
      required: true,
    },
    resetOnSuccess: {
      type: Boolean,
      default: true,
    },
    idleResetTime: {
      type: Number,
      default: 1000,
    },
    isStatic: {
      type: Boolean,
      default: true,
    },
    buttonHeight: {
      type: Number,
      default: 46,
      // If height of the button is bigger than 80px the svg scaling is going to break
      validator: val => val <= 80,
    },
    loadingCircleStrokeWidth: {
      type: Number,
      default: 4,
    },
  },
  mounted() {
    this.undrawAll();
  },
  data() {
    return {
      state: 'idle',
      loadedAmount: 0,
      transitionsQue: [],
    };
  },
  computed: {
    scaledPath() {
      const baseHeight = 46;
      const passedHeight = this.buttonHeight;
      const scaleRatio = passedHeight / baseHeight;
      return {
        transform: `scale(${scaleRatio})`,
        transformOrigin: 'center',
      };
    },
    // Create a path for circle based on buttonHeight so we can later animate it
    circlePath() {
      const stroke = this.loadingCircleStrokeWidth;
      const c = this.buttonHeight / 2;
      // 2r + border = buttonHeight
      const r = (this.buttonHeight - stroke) / 2;
      return circleToPath(c, c, r);
    },
    progressClass() {
      return `loaderButton--${this.state}`;
    },
    buttonStyles() {
      const isLoading = this.state === 'loading';
      const setIfLoading = val => (isLoading ? `${val}px` : undefined);

      return {
        // We want to make button a circle on loading so we use same dimensions for height and width
        width: setIfLoading(this.buttonHeight),
        height: `${this.buttonHeight}px`,
        borderRadius: setIfLoading(this.buttonHeight),
        borderWidth: setIfLoading(this.loadingCircleStrokeWidth),
      };
    },
  },
  watch: {
    loadedAmount(val) {
      this.draw(this.$refs.circle, val);
      if (val >= 1) {
        this.transitionsQue.push(this.setSuccessState);
      }
    },
    loadingState(state) {
      if (state === 'success') {
        this.loadedAmount = 1;
      }
      if (state === 'error') {
        this.transitionsQue.push(this.setErrorState);
      }
    },
  },
  methods: {
    addToTransitionQue(method) {
      this.transitionsQue.push(method);
    },
    setIdleState() {
      setTimeout(() => {
        this.$emit(this.state);
        this.undrawAll();
        this.state = 'idle';
        this.loadedAmount = 0;
      }, this.idleResetTime);
    },
    setSuccessState() {
      this.addToTransitionQue(this.draw.bind(this, this.$refs.check));
      if (this.resetOnSuccess) {
        this.addToTransitionQue(this.setIdleState);
      }
      this.state = 'success';
    },
    setErrorState() {
      this.addToTransitionQue(this.draw.bind(this, this.$refs.cross));
      this.addToTransitionQue(this.setIdleState);
      this.state = 'error';
    },
    runTransitionQue: debounce(function debouncedQueMethod() {
      if (this.transitionsQue.length > 0) {
        const nextInQueMethod = this.transitionsQue.shift();
        nextInQueMethod();
      }
    }, 100),
    fakeLoading() {
      const bumpLoading = () => {
        const stopTreshold = this.isStatic ? 1 : 0.90;
        if (this.loadedAmount >= stopTreshold || this.state === 'error') {
          clearInterval(this.loadingInterval);
          return;
        }

        const bumpValue = getRandomInt(4, 20) / 100;
        this.loadedAmount += bumpValue;
      };
      this.loadingInterval = setInterval(bumpLoading, 300);
    },
    clicked() {
      this.$emit('click');
      if (this.state === 'idle') {
        this.state = 'loading';
        this.transitionsQue.push(this.fakeLoading);
      }
    },
    undrawAll() {
      this.draw(this.$el, 0);
    },
    draw(container, val = 1) {
      const paths = Array.from(container.querySelectorAll('path'));
      // Do not overdraw
      const drawValue = val > 1 ? 1 : val;
      /* eslint-disable no-param-reassign */
      paths.forEach((path) => {
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength * (1 - drawValue);

        path.addEventListener('transitionend', this.runTransitionQue);
      });
    },
  },
};
</script>

<style lang="scss" scoped>

.loaderButton {
  $lB: &;
  position: relative;
  display: inline-block;
  text-align: center;
  width: 100%;

  &__button {
    max-width: 100%;
    width: 100%;
    height: 46px;
    padding: 0;
    transition: background-color 0.3s, color 0.3s, width 0.3s cubic-bezier(0.25, 0.25, 0.4, 1.6),  border-width 0.3s, border-color 0.3s;

    #{$lB}--loading & {
      cursor: progress;
      width: 46px; /* make a circle */
      border-width: 4px;
      border-color: #ddd;
      border-style: solid;
      border-radius: 30px;
      background-color: transparent;
      color: #fff;
      transition: background-color 0.3s, color 0.3s, width 0.3s cubic-bezier(0.6, -0.6, 0.75, 0.75), border-width 0.3s, border-color 0.3s;
    }

    #{$lB}--success &,
    #{$lB}--error & {
      transition: background-color 0.3s, width 0.3s, border-width 0.3s;
    }

    #{$lB}--loading &,
    #{$lB}--success &,
    #{$lB}--error & {
      // Disable ripple effect
      &:after {
        display: none;
      }
    }

    #{$lB}--success & {
      border-color: $mantis;
      background-color: $mantis;
    }

    #{$lB}--error & {
      border-color: $torch-red;
      background-color: $torch-red;
    }

    &__label {
      /* Transition for when returning to default state */
      transition: opacity 0.3s 0.1s;

      #{$lB}--loading & {
        transition: opacity 0.15s;
      }
      #{$lB}--loading &,
      #{$lB}--success &,
      #{$lB}--error & {
        position: absolute;
        opacity: 0;
      }
    }
  }

  &__svg {
    position: absolute;
    top: 0;
    left: 50%;
    bottom: 0;
    margin: auto;
    transform: translateX(-50%);
    pointer-events: none;
    // transition: all $time-s ease-in-out;

    #{$lB}:hover & {
      transform: translateX(-50%) translateY(-1px);
    }

    path {
      opacity: 0;
      fill: none;

      #{$lB}--loading &,
      #{$lB}--success &,
      #{$lB}--error & {
        opacity: 1;
        transition: stroke-dashoffset 0.3s;
      }
    }

    &--checkmark path, &--cross path {
      stroke: $white;
      stroke-linecap: round;
      stroke-width: 3;
      transition: opacity 0.1s;
      stroke-linejoin: round;
    }

    &--progressCircle path {
      fill: transparent;
      stroke: $mantis;


      #{$lB}--error & {
        display: none;
      }
    }
  }

}
</style>
