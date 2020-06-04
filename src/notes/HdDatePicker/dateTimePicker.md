# Datetime picker

You can create a date picker with controls for hours and minutes.

## Code example

```html
<template>
  <HdDatePicker
    v-model="date"
    :pickTime="true"
    :use12HourClock="true"
    :format="'YYYY-MM-DD HH:mm'"
    :displayFormat="'YYYY.MM.DD H:mm A'"
  />
</template>

<script>
import { HdDatePicker } from 'homeday-blocks';

export default {
  components: { HdDatePicker },
  data() {
    return {
      date: '2020.06.01 14:30',
    };
  },
};
</script>
```
