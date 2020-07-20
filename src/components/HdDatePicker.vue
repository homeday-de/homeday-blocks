<template>
  <date-pick
    v-bind="{...$props, ...$attrs}"
    :value="value"
    v-on="$listeners"
    @input="handleInput"
    :editable="!disabled"
  >
    <slot
      v-bind="{...$props, ...$attrs}"
      v-on="$listeners"
    />
  </date-pick>
</template>

<script>
import DatePick from 'vue-date-pick';

export default {
  name: 'HdDatePicker',
  components: { DatePick },
  props: {
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      default: 'YYYY.MM.DD',
    },
    nextMonthCaption: {
      type: String,
      default: 'Nächsten Monat',
    },
    prevMonthCaption: {
      type: String,
      default: 'Vorheriger Monat',
    },
    setTimeCaption: {
      type: String,
      default: 'Zeit einstellen',
    },
    weekdays: {
      type: Array,
      default: () => ([
        'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So',
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
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss">
$vdpColor: #5BA4FF;
@import 'vue-date-pick/src/vueDatePick.scss';
</style>
