<template>
  <date-pick
    v-bind="{...$props, ...$attrs}"
    :value="value"
    @input="handleInput"
  />
</template>

<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
  components: { DatePick },
  props: {
    value: {
      type: String,
      default: '',
    },
    displayFormat: {
      type: String,
      default: 'YYYY.MM.DD',
    },
    weekdays: {
      type: Array,
      default: () => ([
        'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa',
      ]),
    },
    months: {
      type: Array,
      default: () => ([
        'Januar', 'Februar', 'März', 'April',
        'Mai', 'Juni', 'Juli', 'August',
        'September', 'Oktober', 'November', 'Dezember',
      ]),
    },
    startWeekOnSunday: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value);
    },
  },
};
</script>
