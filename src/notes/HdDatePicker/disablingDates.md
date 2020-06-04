# Disabling dates

You can disable some dates on the `<HdDatePicker>` with the prop `isDateDisabled`. It must be a function that returns a boolean value for a date.

## Code example

```html
<template>
  <HdDatePicker
    v-model="date"
    :isDateDisabled="isFutureDate"
  />
</template>

<script>
import { HdDatePicker } from 'homeday-blocks';

export default {
  components: { HdDatePicker },
  data() {
    return {
      date: '2020-06-01',
    };
  },
  methods: {
    isFutureDate(date) {
      const currentDate = new Date();
      return date > currentDate;
    },
  },
};
</script>
```
