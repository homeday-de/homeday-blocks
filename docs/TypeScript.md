# TypeScript (TS)

[TypeScript](https://www.typescriptlang.org) is a typed superset of JavaScript that compiles to plain JavaScript.

At first we were [using TypeScript without TypeScript using JSDoc](https://medium.com/homeday/confident-js-series-part-2-types-jsdocs-and-declaration-files-23ec2df6c47) as a soft introduction.

Now, since we added TypeScript support with loose configuration for a friendlier migration, it can be used directly.

Feel free to keep using plain JS and plain Vue components as usual, but if you want to give it a try, you can find a small guide bellow on how to use TS with our application.

Next step is incrementally increasing TS configuration strictness until the project is fully migrated.

## Converting from JS to TS

### Plain JS files

Just convert the file from `.js` to `.ts` and follow through with the compilation errors.

> For now, `any` is allowed, but try not to rely that much on it to facilitate enabling stricter rules in the future

### Vue files

Just add `<script lang="ts">` and wrap the export default object using either `Vue.extend`

```vue
<template>
  <div>Hello world</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import type { SpecialType } from '.....';

export default Vue.extend({
  name: 'MyComponent',
  props: {
    initialValues: {
      type: Object as PropType<SpecialType>, // you can specify better component prop types
      required: true,
    },
  },
});
</script>
```

if you are using Composition API, then use the `defineComponent` method

```vue
<template>
  <div>Hello world</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import type { SpecialType } from '.....';

export default defineComponent({
  name: 'MyComponent',
  props: {
    initialValues: {
      type: Object as PropType<SpecialType>,
      required: true,
    },
  },
});
</script>
```

## TS usage alongside vue

TS support with Vue 2 have some flaws, especially for some third party libraries (e.g: Vuex) and
mixins, despite some limitations, we can use it for most of our daily basis needs, you can find more
details in [Vue documentation](https://vuejs.org/v2/guide/typescript.html).

As mentioned in the previous section:

> To enable the use of TS in Vue files, you just have to add `<script lang="ts">` and wrap the export
> default object using either `Vue.extend`, or if you are using composition api then `defineComponent` method.

Then you can use TS normally, e.g:

```vue
<template>
  <div>Hello world</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

type State = {
  numberVar: number;
};

export default defineComponent({
  name: 'MyComponent',
  // you can explicitly define the return type or let type inference do its magic
  data(): State {
    return {
      numberVar: 2,
    };
  },
  // you can annotate computed properties return values
  computed: {
    someCalculation(): number {
      return this.numberVar * 2;
    },
  },
  // you can annotate method params and return values
  methods: {
    myMethod(param1: number, param2: string): void {
      console.log(param1 + this.someCalculation);
      console.log(param2);
    },
  },
});
</script>
```

### Annotating component props

To annotate component props, you will have to make use of `PropType` type, this way you can specify what your prop is:

#### With Vue.extend

```vue
<script lang="ts">
import Vue, { PropType } from 'vue'; // <--------  `PropType` imported from vue
import type { SpecialType } from '.....';

export default Vue.extend({
  props: {
    specialProp: {
      type: String as PropType<SpecialType>,
      required: true,
    },
  },
});
</script>
```

#### With Composition API

```vue
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';  // <-------- `PropType` imported from @vue/composition-api
import type { SpecialType } from '.....';

export default defineComponent({
  name: 'MyComponent',
  props: {
    specialProp: {
      type: String as PropType<SpecialType>,
      required: true,
    },
  },
});
</script>
```

### Vetur showing the error `Property 'xxx' does not exist on type 'CombinedVueInstance'`

Well, this is a weird limitation from Vetur, apparently you are supposed to explicitly provide a return type for **every computed property**, if you do that, the error will go away.

```vue
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  computed: {
    hello() {
      // <---------- this might trigger a type error in Vetur
      return 2 + 2;
    },
  },
});

// To fix that

export default defineComponent({
  computed: {
    // despite we have type inference, you might have to provide explicit return type
    // to ALL computed properties
    hello(): number {
      return 2 + 2;
    },
  },
});
</script>
```

More information on that
[here](https://vuejs.github.io/vetur/guide/FAQ.html#property-xxx-does-not-exist-on-type-combinedvueinstance)

### What are those "shims" files?

They are files that help TypeScript and the IDE know how to handle some specific file types like `*.vue`.

### What are those declaration files (\*.d.ts)?

> `.d.ts` files are _declaration_ files that contain _only_ type information. These files don’t
> produce `.js` outputs; they are only used for type-checking. You can think of them as special
> files that contain “blueprints” of your types.


Declaration files should be created when you want to enhance/augment types or when you are working
with plain JS files, they also can be automatically generated by TS compiler.

#### Enhancing types?

Not every third party library have type definitions, sometimes they also have incorrect type
annotations, this means you might not get autocompletion or you will get wrong compile time errors.
You might also have global variables in your application that you want to make them available.

## Learning TS

There are tons of courses, a really cool series is made by
[Mike North](https://frontendmasters.com/teachers/mike-north/ 'Mike North') and can be found at
Frontend Masters

- [TypeScript Fundamentals](https://frontendmasters.com/courses/typescript-v3/) - if you don't have
  time to watch the course, give it a try on
  [this website](https://www.typescript-training.com/course/fundamentals-v3)
- [Intermediate TypeScript](https://frontendmasters.com/courses/intermediate-typescript/) - if you
  don't have time to watch the course, give it a try on
  [this website](https://www.typescript-training.com/course/intermediate-v1)
- [Production-Grade TypeScript](https://frontendmasters.com/courses/production-typescript/) - if you
  want to learn how to better convert from JS to TS, this is a nice course