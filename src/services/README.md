# Services
Homeday Blocks contains a number of services that we found ourself needing across projects. Some of them are used by Homeday Blocks components, others 
are here to be consumed in projects directly.

Index:
- [Breakpoints service](#breakpoints) - Used for setting (and getting) the global project breakpoints.
- [Date service](#date) - Used as helpers to work with dates and date intervals.
- [Utils service](#utils) - Group of helpers that have generic usage.

## Breakpoints
Exposes methods for setting up viewport breakpoints of the project. The breakpoints set in this way are later used by the `HdResponsive` component.

### Usage
In your project entry file, import the service and define breakpoints that make sense for your project:

```js
import { setBreakpoints } from 'homeday-blocks/src/services/breakpoints';

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
import { HdResponsive } from 'homeday-blocks';
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

#### resetDateTime

Returns date with hour, minutes, seconds and miliseconds set to `0`.

`param {Date} date - arbitrary date`

Example:

```javascript
const date = new Date(2018, 1, 15, 16, 30, 30, 30); // 15.2.2018 at 16:30:30:30

const date2 = resetDateTime(date); // 15.2.2018 at 00:00:00:00
```

#### getNDaysFromDate

Returns new date that is N days away from inputted date, with hour, minutes, seconds and miliseconds set to `0`.

`param {Date} initialDate: Arbitrary date`

`param {Number} amountOfDays: Offset in days`

```javascript
const initialDate = new Date(2018, 1, 15, 16, 30, 30, 30); // 15.2.2018 at 16:30:30:30
const amountOfDays = 1;

const date2 = getNDaysFromDate(initialDate, amountOfDays); // 16.2.2018 at 00:00:00:00
```

#### convertMsToDays

Returns number of days from miliseconds.

`param {Number} ms: Miliseconds`

```javascript
const ms = 5 * 24 * 60 * 60 * 1000; // 432000000

const days = convertMsToDays(ms); // 5 days
```

#### getDaysDateRange

Returns array of date range between 2 dates, including start date and **excluding** end date

`param {Date} startDate: Start of time interval`

`param {Date} endDate: End of time interval`

```javascript
const startDate = new Date(2018, 0, 1);
const endDate = new Date(2018, 0, 3);

const timeInterval = getDaysDateRange(startDate, endDate);
// [ 2018-01-01T00:00:00.000Z, 2018-01-02T00:00:00.000Z ]
```

#### getIntlDateString

Returns array of **unique** day names in arbitrary(passed) date list

`param {String} locale: Valid locale`

`param {Array} datesArray : List of dates to be checked for day name`

`param {Object} localStringArgs - Locale options` - [Full List](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Parameters)


```javascript
const locale = 'en-US';
const datesArray = [new Date(2018, 0, 1)];
const localStringArgs = { weekday: 'long' };

const daysInIntervalLong = getIntlDateString(locale, datesArray, localStringArgs);
// [ 'Monday' ]
```

#### generateDateCycles

Returns an array of dates in N (`cycleLengthWeeks`) weeks, with M cycles (`amountOfCycles`) from selected offset(in days) from today (`startDateOffset`)

`param {Number} cycleLengthWeeks: Total number of weeks in the cycle`

`param {Number} amountOfCycles: Number of cycles to generate`

`param {Number} startDateOffset: Offset in days e.g.: 0 = today, -1 = yesterday ,...`

```javascript
const cycleLengthWeeks = 2;
const amountOfCycles = 2;
const startDateOffset = 0;

const dateCycles = generateDateCycles(cycleLengthWeeks, amountOfCycles, startDateOffset);
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

## Utils

#### generateUniqueNumbers

Returns array of N(`count`) indexes on `min` to `max` closed(including `min` and `max`) interval. In case that requested `amount` is larger then different between `min` and `max` (`amount > (max - min + 1)`), function returns an empty array (`[]`).

`param {Number} amount: Total number of indexes to be generated`

`param {Number} min: Minimum value that indexes can have`

`param {Number} max: Maximum value that indexes can have`

```javascript
const max = 5;
const min = 1;
const amount = 3;

const randomInts = generateUniqueNumbers(amount, min, max);
// [2, 3, 5]
```


## Scrolling
We provide a collection of fuctions to manage elements position and the page scrolling.

### elOffset
Given an element, returns its sizing and position from the top left of the document.
```javascript
const fistHeadingPositionAndSize = elOffset(document.querySelector('h1')); 
// {top: 111.5, left: 25, width: 1352, height: 51}
```

### getDocumentHeight
It gives the height of the document.
```javascript
const documentHeight = getDocumentHeight(); // 4157
```

### isWindowFullyScrolled
Returns a boolean indicating if the document is scrolled until the very bottom.
```javascript
const theDocumentIsScrolled = isWindowFullyScrolled(); // false
```

### freezeScrolling/unfreezeScrolling
Those functions encapsulates `disableBodyScroll` from [*willmcpo's body-scroll-lock*]((https://github.com/willmcpo/body-scroll-lock)) . Them allows to freeze/unfreeze the document scroll, keeping it allowed on the target element passed as argument.


### isElVisible
Returns a boolean indicating if the argument element is currently visible in the document window. It accepts as an argument an **object** and uses two properties:

`param {Object} el: the DOM element to check`
`param {Number} [offset=0]: an offset from the top for element to be considered visible`

### isScrolledPastElBottom
Returns a boolean indicating if the bottom edge of the element passed a vertical position from the top of the document (offset). It accepts as an argument an **object** and uses two properties:

`param {Object} el: the DOM element to check`
`param {Number} [offset=window.innerHeight]: the value to check the bottom of the element. It's default value has been chose to check, as default, if the element is scrolled past the bottom of the window.`

### scrollToEl
Scrolls the window to the top of a given element. It accepts as an argument an **object** and uses three properties:

`param {Object} el: the DOM element to scroll to`
`param {Number} [offset=0]: scrolling offset to the element.`
`param {Boolean} onlyIfNotVisible: scrolls to the element only if this is not visible. The check of the visibility is made with isElVisible described above`