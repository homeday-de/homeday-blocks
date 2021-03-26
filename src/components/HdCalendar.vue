<template>
  <div class="calendar">
    <header class="calendar__header">
      <button
        class="calendar__button calendar__header__button calendar__button--prev"
        :class="{'calendar__button--disabled': selectedWeekIndexTail - cycleLengthWeeks < 0}"
        @click="setWeekIndexTail(-cycleLengthWeeks)"
      >
        <HdIcon
          :src="chevronIcon"
          transform="rotate(180)"
          width="100%"
          height="100%"
      />
      </button>
      <span class="calendar__header__month">
        <template v-for="(month, index) in activeMonths">
          {{ index > 0 ? `- ${month}` : month }}
        </template>
      </span>
      <button
        class="calendar__button calendar__header__button calendar__button--next"
        :class="{'calendar__button--disabled': selectedWeekIndexTail + cycleLengthWeeks >= availableWeeks.length}"
        @click="setWeekIndexTail(cycleLengthWeeks)"
      >
        <HdIcon
          :src="chevronIcon"
          width="100%"
          height="100%"
      />
      </button>
    </header>
    <section class="calendar__body">
      <header class="calendar__days calendar__row">
        <div v-for="day in weekdays" :key="day" class="calendar__row__item calendar__day">{{day}}</div>
      </header>
      <div class="calendar__body__inner">
        <transition :name="'calendar-' + animationDirection">
          <section class="calendar__dates" v-if="animateCalendar">
            <div
              class="calendar__week calendar__row"
              v-for="(displayWeek, index) in displayedWeeks"
              :key="index"
            >
              <div
                v-for="(date, index) in displayWeek"
                class="calendar__date calendar__row__item"
                :class="{'calendar__date--disabled': isDisabled(date, index), 'calendar__date--selected': isSelectedDate(date)}"
                :key="date.getDate()"
                @click="selectDate(date)"
                @touchstart="selectDate(date)"
              >
                {{ date.getDate() }}
              </div>
            </div>
          </section>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import flatten from 'lodash/flatten';
import chunk from 'lodash/chunk';
import { getIntlDateString } from 'homeday-blocks/src/services/date';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { chevron as chevronIcon } from 'homeday-assets';

const WEEK_DAYS = 7;
export default {
  name: 'hdCalendar',
  components: {
    HdIcon,
  },
  props: {
    dates: {
      type: Array,
      required: true,
      // Check if passed array contains only valid dates
      validator: (dates) => dates.filter((d) => typeof d.getMonth === 'function').length === dates.length,
    },
    disabledDates: {
      type: Array,
      default() {
        return [];
      },
    },
    cycleLengthWeeks: {
      type: Number,
      default: 2,
    },
    locale: {
      type: String,
      default: 'de',
    },
  },
  data: () => ({
    weekdays: [],
    availableWeeks: [],
    selectedDate: null,
    selectedWeekIndexTail: 0,
    animateCalendar: true,
    animationDirection: 'right',
    chevronIcon,
  }),
  mounted() {
    this.weekdays = getIntlDateString(this.locale, this.dates, { weekday: 'short' });
    // Slice dates array into week chunks
    this.availableWeeks = chunk(this.dates, WEEK_DAYS);

    this.selectFirstAvailable();
  },
  computed: {
    displayedWeeks() {
      return this.availableWeeks.slice(this.selectedWeekIndexTail, this.selectedWeekIndexTail + this.cycleLengthWeeks);
    },
    activeMonths() {
      return getIntlDateString(this.locale, flatten(this.displayedWeeks), { month: 'long' });
    },
  },
  watch: {
    disabledDates() {
      this.selectFirstAvailable();
    },
  },
  methods: {
    selectFirstAvailable() {
      const firstAvialableDay = this.displayedWeeks[0]
        .find((day) => this.isDisabled(day) === false);

      this.selectDate(firstAvialableDay);
    },
    isSelectedDate(date) {
      return this.selectedDate ? this.selectedDate.toUTCString() === date.toUTCString() : false;
    },
    setWeekIndexTail(indexDiff) {
      const maxBound = this.selectedWeekIndexTail + indexDiff >= this.availableWeeks.length;
      const minBound = this.selectedWeekIndexTail + indexDiff < 0;

      this.animationDirection = indexDiff > 0 ? 'right' : 'left';
      if (maxBound || minBound) return;

      this.animateCalendar = !this.animateCalendar;
      setTimeout(() => {
        this.selectedWeekIndexTail += indexDiff;
        this.animateCalendar = !this.animateCalendar;
        this.selectFirstAvailable();
      }, 0);
    },
    isDisabled(date) {
      return this.disabledDates.indexOf(date) !== -1;
    },
    selectDate(date) {
      if (this.isDisabled(date)) return;
      const dateIndex = this.dates.findIndex((d) => d === date);
      this.selectedDate = date;
      this.$emit('dateSelected', {
        date,
        dateIndex,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

// Transitions
.calendar {
  &-left {
    &-leave-active, &-enter-active {
      transition: transform 200ms ease;
    }
    &-enter, &-leave-to {
      transform: translate(-100%, 0);
      opacity: 0;
    }
  }
  &-right {
    &-leave-active, &-enter-active {
      transition: transform 200ms ease;
    }
    &-enter, &-leave-to {
      transform: translate(100%, 0);
      opacity: 0;
    }
  }
}

.calendar {
  width: 100%;
  border-bottom: 1px solid getShade($quaternary-color, 60);

  &__header {
    text-align: center;
    position: relative;
    margin-bottom: $sp-m;
    display: flex;
    justify-content: center;
    align-items: center;
    &__month {
      font-size: 14px;
      line-height: 20px;
      font-weight: bold;
      margin: 0 $sp-xl;

      @media (min-width: $break-mobile) {
        font-size: 18px;
        line-height: 23px;
      }
    }

    @media (min-width: $break-mobile) {
      margin-bottom: $sp-s * 3;
    }
  }
  &__row {
    display: flex;
    margin-bottom: $sp-m;

    @media (min-width: $break-mobile) {
      margin-bottom: $sp-m;
    }

    &__item {
      width: calc(100% / 7);
      text-align: center;
      &:not(:last-child) {
        margin-right: $inline-m;
      }
    }
  }
  &__days {
    margin-bottom: $sp-m;

    @media (min-width: $break-mobile) {
      margin-bottom: $sp-s * 3;
    }
  }
  &__day {
    font-size: 14px;
    line-height: 10px;
    color: getShade($quaternary-color, 80);
    text-transform: uppercase;
    font-weight: 600;
    @media (min-width: $break-mobile) {
      font-size: 18px;
    }
  }

  &__date {
    position: relative;
    font-size: 16px;
    z-index: 1;
    cursor: pointer;

    @media (min-width: $break-mobile) {
      font-size: 18px;
    }
    &--disabled {
      color: getShade($quaternary-color, 60);
      cursor: not-allowed;
    }
    &:after {
      content: "";
      width: 16px;
      height: 16px;
      background: getShade($secondary-color, 110);
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      top: 0;
      bottom: 0;
      z-index: -1;
      border-radius: 50%;
      transform: scale(0);
      transition: transform ease 200ms;
    }

    &:not(&--disabled):hover {
      &:after {
        transform: scale(0.3) translateY(250%);
      }
    }
    :root &--selected:not(&--disabled) {
      cursor: initial;
      color: $white;

      &:after {
        transform: scale(2) translateY(0);
        @media (min-width: $break-mobile) {
          transform: scale(3) translateY(0);
        }
      }
    }
  }
  &__dates {
    width: 100%;
  }
  &__button {
    border: none;
    background: transparent;
    width: 24px;
    height: 24px;
    padding: 0;
    cursor: pointer;
    z-index: 2;

    @media (min-width: $break-mobile) {
      display: block;
      width: 32px;
      height: 32px;
    }
    &--disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    ::v-deep path {
      fill: $quaternary-color;
    }

    &--mobile {
      display: flex;
    }
  }
  &__body {
    &__inner {
      width: 100%;
      display: flex;
      justify-content: center;
      position: relative;
    }
    &__button {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;

      &:first-child {
        left: 0;
      }
    }
  }
}
</style>
