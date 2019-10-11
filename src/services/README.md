# Services
Homeday Blocks contains a number of services that we found ourself needing across projects. Some of them are used by Homeday Blocks components, others 
are here to be consumed in projects directly.

Index:
- [Breakpoints service](https://github.com/homeday-de/homeday-blocks/tree/develop/src/services#breakpoints) - Provides a wrapper component for conditional rendering based on viewport size

## Breakpoints
Exposes a wrapper component that helps with conditional rendering based on viewport size. Relies on the [onResize](#on-resize) service.

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
import { Responsive } from 'hd-blocks/services/breakpoints';
</script>

<template>
<Responsive #default="{ matches, indeterminate }">
  <div v-if="indeterminate">Matching could not be reliably determined (server side rendering, unit tests environment)</div>
  <div v-else-if="matches.xl">xl breakpoint matched</div>
  <div v-else-if="matches.m">m breakpoint matched</div>
</Responsive>
</template>
```

As seen in the example above, `Responsive` component exposes two arguments:
- `matches`: Object with the keys matching your breakpoints object and boolean values (`true`: matches, `false`: does not match the current viewport)
- `indeterminate`: Boolean set to `true` if a viewport size could not be measured (SSR, unit tests). Can be used to provide fallback content for rendering on the server. You can optionally ignore this if you don't use server side rendering.
