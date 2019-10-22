You can also use it to render `<router-view>`, just provide the props `to` and it will automatically use `<router-view>` instead of default `<a>`.

```js
<template>
  <div>
    <h1>My component</h1>
    <hd-link :to="{ name: 'login' }">
      Click me
    </hd-link>
  </div>
</template>

<script>
import HdLink from 'hd-blocks/components/HdLink.vue';

export default {
  name: 'MyComponent',
  components: { HdLink },
}
</script>
```