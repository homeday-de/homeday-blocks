<template>
  <div
    :class="loaderButtonClasses"
    :style="{
      height: `${buttonHeight}px`,
    }"
    class="loaderButton"
    @keydown="setUsingMouse(false)"
    @mousedown="setUsingMouse(true)"
  >
    <button
      ref="button"
      :style="buttonStyles"
      class="btn btn--primary loaderButton__button"
      @click="clicked"
      @keyup.enter.space="clicked"
      @transitionend="runTransitionQueue"
      :disabled="disabled"
    >
      <span class="loaderButton__button__label">{{ label }}</span>
    </button>

    <!-- Loading circle -->
    <svg
      v-show="isLoading"
      ref="circle"
      :width="`${buttonHeight}px`"
      :height="`${buttonHeight}px`"
      class="loaderButton__svg loaderButton__svg--progressCircle"
    >
      <path
        :d="circlePath"
        :style="{strokeWidth: `${loadingCircleStrokeWidth}px`}"
      />
    </svg>

    <svg
      ref="check"
      class="loaderButton__svg loaderButton__svg--checkmark"
      width="46px"
      height="46px"
    >
      <!-- Checkmark -->
      <g
        :style="scaledPath"
        stroke="#2988FF"
      >
        <path d="m11.066433,23.18223l8.364397,7.766946" />
        <path d="m34.933565,15.050822l-15.180095,15.533867" />
      </g>
    </svg>

    <!-- Error cross -->
    <svg
      ref="cross"
      class="loaderButton__svg loaderButton__svg--cross"
      width="46px"
      height="46px"
    >
      <g
        :style="scaledPath"
        stroke="#2988FF"
      >
        <path d="m23,23l-10.3,-10.3" />
        <path d="m23,23l10.3,10.3" />
        <path d="m23,23l-10.3,10.3" />
        <path d="m23,23l10.3,-10.3" />
      </g>
    </svg>
  </div>
</template>

<script>
import { getRandomInt, circleToPath } from 'homeday-blocks/src/services/utils';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';

export const LOADING_STATE = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
const FAKE_LOADING_STOP_THRESHOLD = 0.79;

export default {
  name: 'HdLoaderButton',
  props: {
    loadingState: {
      type: String,
      default: LOADING_STATE.IDLE,
      validator: val => Object.values(
        omit(LOADING_STATE, 'LOADING'),
      ).indexOf(val) !== -1,
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      state: LOADING_STATE.IDLE,
      loadedAmount: 0,
      transitionsQue: [],
      runTransitionQueue: debounce(() => {
        if (this.transitionsQue.length > 0) {
          const nextInQueMethod = this.transitionsQue.shift();
          nextInQueMethod();
        }
      }, 100),
      isUsingMouse: false,
    };
  },
  computed: {
    isLoading() {
      return this.state === LOADING_STATE.LOADING;
    },
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
    loaderButtonClasses() {
      return {
        [`loaderButton--${this.state}`]: true,
        isUsingMouse: this.isUsingMouse,
      };
    },
    buttonStyles() {
      const setIfLoading = val => (this.isLoading ? `${val}px` : undefined);

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
      if (state === LOADING_STATE.SUCCESS) {
        this.loadedAmount = 1;
      }
      if (state === LOADING_STATE.ERROR) {
        this.transitionsQue = [];
        this.setErrorState();
      }
      if (state === LOADING_STATE.IDLE) {
        this.stopLoading();
      }
    },
  },
  mounted() {
    this.undrawAll();
  },
  methods: {
    addToTransitionQue(method) {
      this.transitionsQue.push(method);
    },
    setIdleState({ immediate = false } = {}) {
      setTimeout(() => {
        this.$emit(this.state);
        this.undrawAll();
        this.state = LOADING_STATE.IDLE;
        this.loadedAmount = 0;
      }, immediate ? 0 : this.idleResetTime);
    },
    setSuccessState() {
      this.addToTransitionQue(this.draw.bind(this, this.$refs.check));
      if (this.resetOnSuccess) {
        this.addToTransitionQue(this.setIdleState);
      }
      this.state = LOADING_STATE.SUCCESS;
    },
    setErrorState() {
      this.addToTransitionQue(this.draw.bind(this, this.$refs.cross));
      this.state = LOADING_STATE.ERROR;
    },
    fakeLoading() {
      const bumpLoading = () => {
        const stopTreshold = this.isStatic ? 1 : FAKE_LOADING_STOP_THRESHOLD;
        if (this.loadedAmount >= stopTreshold || this.state === LOADING_STATE.ERROR) {
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

      if (this.disabled) {
        return;
      }

      if (this.state === LOADING_STATE.IDLE) {
        this.startLoading();
      }
    },
    startLoading() {
      if (this.isLoading) {
        return;
      }

      this.state = LOADING_STATE.LOADING;
      this.transitionsQue.push(this.fakeLoading);
    },
    stopLoading() {
      this.transitionQue = [];
      this.setIdleState({ immediate: true });
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

        path.addEventListener('transitionend', this.runTransitionQueue);
      });
    },
    setUsingMouse(usingMouse) {
      this.isUsingMouse = usingMouse;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.loaderButton {
  $lB: &;
  position: relative;
  display: inline-block;
  text-align: center;
  width: 100%;
  line-height: 1;

  &__button {
    max-width: 100%;
    width: 100%;
    height: 46px;
    padding: 0;
    transition:
      background-color 0.3s,
      color 0.3s,
      width 0.3s cubic-bezier(0.25, 0.25, 0.4, 1.6),
      border-width 0.3s,
      border-color 0.3s;

    #{$lB}.isUsingMouse & {
      outline: 0;
    }

    #{$lB}--loading & {
      cursor: progress;
      pointer-events: none;
      width: 46px; /* make a circle */
      border-width: 4px;
      border-color: getShade($quaternary-color, 50);;
      border-style: solid;
      border-radius: 30px;
      background-color: transparent;
      color: $white;
      transition:
        background-color 0.3s,
        color 0.3s,
        width 0.3s cubic-bezier(0.6, -0.6, 0.75, 0.75),
        border-width 0.3s,
        border-color 0.3s;
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
      border-color: $success-color;
      background-color: $success-color;
    }

    #{$lB}--error & {
      border-color: $error-color;
      background-color: $error-color;
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
    top: 50%;
    left: 50%;
    bottom: 0;
    margin: 0;
    transform: translate(-50%, -50%);
    pointer-events: none;

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
      stroke: $success-color;


      #{$lB}--error & {
        display: none;
      }
    }
  }

}
</style>
