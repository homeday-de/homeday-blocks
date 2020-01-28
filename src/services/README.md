# Services
Homeday Blocks contains a number of services that we found ourself needing across projects. Some of them are used by Homeday Blocks components, others 
are here to be consumed in projects directly.

Index:
- [Breakpoints service](#breakpoints) - Used for setting (and getting) the global project breakpoints.
- [Date service](#date) - Used as helpers to work with dates and date intervals.

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

## Date

##### resetDateTime

Returns date with hour, minutes, seconds and miliseconds set to `0`.
`param {Date} date - arbitrary date`

Example:

```javascript
const date = new Date(2018, 1, 15, 16, 30, 30, 30); // 15.2.2018 at 16:30:30:30
const date2 = resetDateTime(d); // 15.2.2018 at 00:00:00:00
```

##### getNDaysFromDate

Returns new date that i s N days away from inputted date, with hour, minutes, seconds and miliseconds set to `0`.

`param {Date} initialDate - arbitrary date`
`param {Number} amountOfDays - offet in days`

```javascript
const date = new Date(2018, 1, 15, 16, 30, 30, 30); // 15.2.2018 at 16:30:30:30
const date2 = getNDaysFromDate(d, 1); // 16.2.2018 at 00:00:00:00
```

##### convertMsToDays

Returns number of days from miliseconds.

`param {Number} ms - miliseconds`

```javascript
const days = convertMsToDays(5 * 24 * 60 * 60 * 1000); // 5 days
```

##### getDaysDateRange

Returns array of date range between 2 dates, including start date and *excluding* end date

`param {Date} startDate - start of time interval`
`param {Date} endDate - end of time interval`

```javascript
const timeInterval = getDaysDateRange(new Date(2018, 0, 1), new Date(2018, 0, 3));
// [ 2018-01-01T00:00:00.000Z, 2018-01-02T00:00:00.000Z ]
```

##### getIntlDateString

Returns array of *unique* day names in arbitrary(passed) date list

`param {String} locale - Valid locale`
`param {Array} datesArray - list of dates to be check for date`
`param {Object} localStringArgs - Locale options - see options here for full list of options: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Parameters`


```javascript
const daysInIntervalLong = getIntlDateString('en-US', [new Date(2018, 0, 1)], { weekday: 'long' });
// [ 'Monday' ]
```

##### generateRandomIndexes

Returns array of N(count) indexes on `min` to `max` open interval

`param {Number} amount - Total number of indexes to be generated`
`param {Number} min - minimum value that indexes can have`
`param {Number} max - minimum value that indexes can have`

```javascript
    const max = 5;
    const min = 1;
    const count = 3;
    const randomInts = generateRandomIndexes(count, min, max);
    // [2, 3, 5]
```

##### generateDateCycles

Returns an array of dates in N (cycleLengthWeeks) weeks, with M cycles (amountOfCycles) from speficis offset from today (startDateOffset)

`param {Number} cycleLengthWeeks - Total number of weeks in the cycle`
`param {Number} amountOfCycles - Number of cycles to generate`
`param {Number} startDateOffset - Offset in days e.g.: 0 = today, -1 = yestrday ,...`

```javascript
const cycleLengthWeeks = 2;
    const amountOfCycles = 2;
    const startDateOffset = 0;
    const dateCycles = genera teDateCycles(cycleLengthWeeks, amountOfCycles, startDateOffset);
    /*
      [
        2020-01-28T00:00:00.000Z,
        2020-01-29T00:00:00.000Z,
        2020-01-30T00:00:00.000Z,
        2020-01-31T00:00:00.000Z,
        2020-02-01T00:00:00.000Z,
        2020-02-02T00:00:00.000Z,
        2020-02-03T00:00:00.000Z,
        2020-02-04T00:00:00.000Z,
        2020-02-05T00:00:00.000Z,
        2020-02-06T00:00:00.000Z,
        2020-02-07T00:00:00.000Z,
        2020-02-08T00:00:00.000Z,
        2020-02-09T00:00:00.000Z,
        2020-02-10T00:00:00.000Z,
        2020-02-11T00:00:00.000Z,
        2020-02-12T00:00:00.000Z,
        2020-02-13T00:00:00.000Z,
        2020-02-14T00:00:00.000Z,
        2020-02-15T00:00:00.000Z,
        2020-02-16T00:00:00.000Z,
        2020-02-17T00:00:00.000Z,
        2020-02-18T00:00:00.000Z,
        2020-02-19T00:00:00.000Z,
        2020-02-20T00:00:00.000Z,
        2020-02-21T00:00:00.000Z,
        2020-02-22T00:00:00.000Z,
        2020-02-23T00:00:00.000Z,
        2020-02-24T00:00:00.000Z
      ]
    */
```