<template>
  <section class="timeslots">
    <div class="timeslots__controls" v-if="timeslotsPages.length > 1">
      <HdArrowButton @click.native="flipPage(-1)" direction="left" :isDisabled="prevPageDisabled" />
      <HdArrowButton @click.native="flipPage(1)" direction="right" :isDisabled="nextPageDisabled" />
    </div>
    <div class="timeslots__inner">
      <transition :name="`timeslots-transition-${animationDirection}`" >
        <div class="timeslots__slots" :key="currentPageIndex">
          <span
            class="timeslots__slot"
            :class="{'timeslots__slot--isUnavailable': timeslot.isAvailable === false, 'timeslots__slot--isSelected': timeslot.time === selectedTime}"
            v-for="timeslot in activeTimeslotPage"
            :key="timeslot.time"
            @click="selectTimeslot(timeslot)"
          >
            {{ timeslot.time }}
          </span>
        </div>
      </transition>
      <div class="timeslots__legend">
        <p class="timeslots__legend__indicator timeslots__legend__indicator--isUnavailable">
          NOT_AVAILABLE
        </p>
        <p class="timeslots__legend__indicator  timeslots__legend__indicator--isAvailable">
          AVAILABLE
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import chunk from 'lodash/chunk';
import HdArrowButton from 'homeday-blocks/src/components/buttons/HdArrowButton.vue';

export default {
  name: 'HdTimeslots',
  components: {
    HdArrowButton,
  },
  props: {
    timeslots: {
      type: Array,
      required: true,
      // Make sure that all the passed slots contain time
      validator: (slots) => slots.filter((s) => s.time).length === slots.length,
    },
    timeslotsPerPage: {
      type: Number,
      default: 12,
    },
  },
  mounted() {
    this.selectFirstAvialable();
  },
  data: () => ({
    selectedTime: null,
    currentPageIndex: 0,
    animationDirection: 'right',
  }),
  computed: {
    timeslotsPages() {
      return chunk(this.timeslots, this.timeslotsPerPage);
    },
    activeTimeslotPage() {
      return this.timeslotsPages[this.currentPageIndex];
    },
    nextPageDisabled() {
      return this.currentPageIndex + 1 === this.timeslotsPages.length;
    },
    prevPageDisabled() {
      return this.currentPageIndex === 0;
    },
  },
  methods: {
    selectFirstAvialable() {
      this.currentPageIndex = 0;
      const firstAvialableTimeslot = this.activeTimeslotPage
        .find((timeslot) => timeslot.isAvailable);

      this.selectTimeslot(firstAvialableTimeslot);
    },
    flipPage(indexMod) {
      const maxBound = this.currentPageIndex + indexMod >= this.timeslotsPages.length;
      const minBound = this.currentPageIndex + indexMod < 0;
      if (maxBound || minBound) return;

      this.animationDirection = indexMod > 0 ? 'right' : 'left';

      this.currentPageIndex += indexMod;
    },
    selectTimeslot(timeslot) {
      if (timeslot && timeslot.isAvailable) this.selectedTime = timeslot.time;
    },
  },
  watch: {
    selectedTime(time) {
      this.$emit('timeSelected', time);
    },
    timeslots() {
      this.selectFirstAvialable();
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.timeslots-transition {
  &-left, &-right {
    &-leave-active, &-enter-active {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      transition: transform 300ms cubic-bezier(0.250, 0.460, 0.450, 0.940);
      backface-visibility: hidden;
    }
  }
  &-left {
    &-enter {
      transform: translateX(-100%);
    }
    &-leave-to{
      transform: translateX(100%);
    }
  }

  &-right {
    &-enter {
      transform: translateX(100%);
    }
    &-leave-to {
      transform: translateX(-100%);
    }
  }
}

.timeslots {
  width: 100%;
  height: 100%;
  position: relative;

  &__controls {
    position: absolute;
    display: flex;
    padding: 0 $inline-xs;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    z-index: 0;

    @media (min-width: $break-mobile) {
      margin-top: -$stack-m;
    }

  }
  &__inner {
    width: calc(100% - #{$inline-xl});
    margin: auto;
    overflow: hidden;
    position: relative;
    height: 100%;
    padding-top: $stack-s;

    @media (min-width: $break-mobile) {
      padding-top: 0;
    }
  }
  &__slots {
    height: 100%;
    margin-right: -$inline-s;
  }

  &__slot {
    width: calc(100% / 4 - #{$inline-s});
    display: inline-block;
    padding: $sp-s;
    font-size: 14px;
    line-height: 10px;
    border: 1px solid getShade($secondary-color, 110);
    border-radius: 2px;
    margin-right: $inline-s;
    margin-bottom: $stack-s;
    text-align: center;
    color: $primary-color;
    cursor: pointer;
    transition: all 200ms ease;
    z-index: 1;

    @media (min-width: $break-mobile) {
      width: calc(100% / 6 - #{$inline-s});
      margin-bottom: $stack-xs;
      font-size: 18px;
      border-width: 2px;
    }

    &--isUnavailable {
      background: getShade($quaternary-color, 60);
      border-color: getShade($quaternary-color, 60);
      color: getShade($quaternary-color, 80);
      cursor: not-allowed;
    }
    &--isSelected {
      background: getShade($secondary-color, 110);
      color: $white;
    }
    &:not(&--isUnavailable):not(&--isSelected):hover {
      background: getShade($secondary-color, 90);
      border-color: getShade($secondary-color, 90);
      color: getShade($quaternary-color, 40);
      transform: translateY(-2px);
    }
    &:not(&--isSelected):not(&--isUnavailable) {
      box-shadow: 3px 1px 4px 0px rgba(0,0,0,0.35);
    }
  }

  &__legend {
    display: none;
    font-size: 11px;
    line-height: 14px;
    color: $primary-color;
    margin-top: $stack-s;
    position: absolute;
    bottom: 0;
    @media (min-width: $break-mobile) {
      display: flex;
    }
    &__indicator {
      position: relative;
      &:before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        height: 10px;
        width: 10px;
        border: 1px solid getShade($quaternary-color, 50);
        background: getShade($quaternary-color, 50);
        margin-right: $inline-s;
        border-radius: 2px;

        @media (min-width: $break-mobile) {
          border-width: 2px;
        }
      }

      &--isAvailable:before {
        background: $white;
        border-color: getShade($secondary-color, 110);
      }
      &:first-child {
        margin-right: $inline-m;

        @media (min-width: $break-mobile) {
          margin-right: $inline-l;
        }
      }
    }
  }
}
</style>
