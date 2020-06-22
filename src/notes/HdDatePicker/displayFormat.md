# `<HdDatePicker>` - display format

Use `displayFormat` prop when UI date format is different from raw data format.

## Code example

```html
<template>
  <HdDatePicker
    v-model="date"
    :displayFormat="MM-YYYY"
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
