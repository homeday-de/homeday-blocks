**⚠️ The manipulation of the icons is not reactive.**

Please note that the icon's paths originally have the fill `#1C3553` with class `color-1` and `#1895FF` with class `color-2`.

### The component usage:

```html
<HdIcon
  :src="importedIcon"
  :fill-from-class="{
    'color-1': 'lightgray',
    'color-2': 'darkgray',
  }"
/>
```
