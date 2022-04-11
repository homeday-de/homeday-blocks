---
to: src/<%= path %>/<%= name %>.vue
---
<template>
  <div>
    Your new awesome component: <%= name %>
  </div>
</template>

<script>
export default {
  name: '<%= name %>',
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';
</style>
