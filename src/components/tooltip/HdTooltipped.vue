<template>
  <div v-if="component !== undefined"
    v-hd-tooltip="{ value, direction }"
    :is="component"
    v-bind="props"></div>
  <span v-else>
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'hd-tooltipped',
  props: ['value', 'direction', 'component', 'props'],
  computed: {
  },
};
</script>
