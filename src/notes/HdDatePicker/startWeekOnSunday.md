# Disabling dates

Depending on your needs you can show the calendar starting on Sunday with the prop `startWeekOnSunday`. It must be a boolean prop.

## Code example

```html
<template>
  <HdDatePicker
    v-model="date"
    :startWeekOnSunday="true"
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
};
</script>
```
