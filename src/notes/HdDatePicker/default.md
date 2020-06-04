# `<HdDatePicker>`

The `<HdDatePicker>` is a wrapper component over **[vue-date-pick][vue_date_pick]**. We decided to use this library becauseit is a simple library, with active development and a very powerful API solving our current needs for picking dates.

It can handle:

- i18n
- Custom styles
- Different formats
- Cross browser support

## Basic usage

```html
<template>
  <HdDatePicker
    v-model="date"
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

<!-- Links references -->

[vue_date_pick]: https://github.com/dbrekalo/vue-date-pick
