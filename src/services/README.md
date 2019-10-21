# Services
Homeday Blocks contains a number of services that we found ourself needing across projects. Some of them are used by Homeday Blocks components, others 
are here to be consumed in projects directly.

Index:
- [Breakpoints service](https://github.com/homeday-de/homeday-blocks/tree/develop/src/services#breakpoints) - Used for setting (and getting) the global project breakpoints.

## Breakpoints
Exposes methods for setting up viewport breakpoints of the project. The breakpoints set in this way are later used by the `HdResponsive` component.

### Usage
In your project entry file, import the service and define breakpoints that make sense for your project:

```js
import { setBreakpoints } from 'hd-blocks/services/breakpoints';

const breakpoints = {
  s: '(max-width:599px)',
  m: '(min-width:600px)',
  l: '(min-width:900px)',
  xl: '(min-width:1200px)',
};
setBreakpoints(breakpoints);
```

You can now import a helper component and render contents based on your breakpoints matching or not:

```vue
<script>
import HdResponsive from 'hd-blocks/components/HdResponsive.vue';
</script>

<template>
<HdResponsive #default="{ matches, indeterminate }">
  <div v-if="indeterminate">Matching could not be reliably determined (server side rendering, unit tests environment)</div>
  <div v-else-if="matches.xl">xl breakpoint matched</div>
  <div v-else-if="matches.m">m breakpoint matched</div>
</HdResponsive>
</template>
```

As seen in the example above, `HdResponsive` component exposes two arguments:
- `matches`: Object with the keys matching your breakpoints object and boolean values (`true`: matches, `false`: does not match the current viewport)
```
> console.log(typeof matches, matches);
object {s: false, m: false, l: true, xl: false}
```
- `indeterminate`: Boolean set to `true` if a viewport size could not be measured (SSR, unit tests). Can be used to provide fallback content for rendering on the server. You can optionally ignore this if you don't use server side rendering.
```
> console.log(typeof indeterminate, indeterminate);
boolean true
```

It is worth noting that HdResponsive component takes a `breakpoints` prop as well in case you want to override global ones for a specific instance:
```vue
<template>
<HdResponsive
  #default="{ matches, indeterminate }"
  :breakpoints="{
    l: '(min-width:999px)',
    gigantic: '(min-width: 2560px)',
  }"
>
  <div v-if="matches.l">l breakpoint (overridden) matched</div>
  <div v-else-if="matches.gigantic">gigantic breakpoint matched (specific to this HdResponsive instance)</div>
  <div v-else-if="matches.m">m breakpoint matched (global breakpoints still available since objects are merged)</div>
</HdResponsive>
</template>
```