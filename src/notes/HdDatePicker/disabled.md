# `<HdDatePicker>` - disabled

You can disable the input. This could be useful when you want to show some date, but not let the user to edit it.

## Code example

```html
<template>
  <HdDatePicker
    v-model="date"
    :editable="false"
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
