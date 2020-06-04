<template>
  <date-pick
    v-bind="{...$props, ...$attrs}"
    :value="value"
    @input="handleInput"
  />
</template>

<script>
import DatePick from 'vue-date-pick';

export default {
  components: { DatePick },
  props: {
    value: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      default: 'YYYY.MM.DD',
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
