# Date picker

- [Date picker](#date-picker)
  - [Why do we need a date-picker component?](#why-do-we-need-a-date-picker-component)
  - [How are we handling dates?](#how-are-we-handling-dates)
  - [General criteria for the selection](#general-criteria-for-the-selection)
    - [Potential resources](#potential-resources)
  - [Benchmarking](#benchmarking)
  - [The winner](#the-winner)
  - [Relevant links](#relevant-links)

## Why do we need a date-picker component?

Across myHomeday we need to retrieve some dates from the user. This it's pretty much straight forward with [HTML date input][date_input], however this input lacks full [browser support][date_input_browser_support].

On our project [browsers list support][our_browserlist] we defined that we support browsers versions selected by [global usage statistics][browser_usage_global_stats] over a **1%**. That leaves us supporting [IE11][ie_11], and [Safari][safari], among other browsers.

Both, **IE11**, and **Safari** gracefully degrade to a [text input][text_input] and this creates problems in consistency of user interface (the presented controls are different) and data handling.

The second problem is the more serious one; with date input supported, the value is normalized to the format `yyyy-mm-dd`. But with a text input, the browser has no recognition of what format the date should be in, and there are many different formats in which people write dates. For example:

- `ddmmyyyy`
- `dd/mm/yyyy`
- `mm/dd/yyyy`
- `dd-mm-yyyy`
- `mm-dd-yyyy`
- `Month dd, yyyy`

## How are we handling dates?

At the moment we are using three text inputs to handle the **day**, **month**, and **year**. Nevertheless, this brings a huge overhead to handle the users input, and it's hard to give proper feedback to the user. Therefore, we decided to use a a third-party date-picker component.

## General criteria for the selection

The points taken into consideration are the following:

- Good browser support (IE, Safari)
- Good documentation
- Can present the value in DE locale format
- Can expose the value in a programmatically useful way (Date object or ISO string)
- Customizable UI
- Package size
- Active development

### Potential resources

- https://madewithvuejs.com/blog/best-vue-js-datepickers
- https://www.vuescript.com/best-date-picker/

## Benchmarking

After reviewing several libraries these are the ones that better solves our problem.

| Library | Documentation | Browser Support | i18n | Programmatic API | Customizable UI | Unpacked Package size | Latest release |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **[vue-datetime][vue_datetime]** | [Readme][vue_datetime_documentation] | ◻️ IE11 <br> ✅ Safari | ✅ | ✅ | ✅ | 191 kB, but depends on [Luxon][luxon] (huge package) | May 1, 2020 |
| **[vue-date-pick][vue_date_pick]** | [Docs page][vue_date_pick_documentation] | ◻️ IE11 <br> ✅ Safari | ✅ | ✅ | ✅ | 63.8 kB | May 3, 2020 |
| **[vue2-datepicker][vue2_datepicker]** | [Docs page][vue2_datepicker_documentation] | ◻️ IE11 <br> ✅ Safari | ✅ | ✅ | ✅ | 809 kB | April 22, 2020 |
| **[vuejs-datepicker][vuejs_datepicker]** | [Readme][vuejs_datepicker_documentation] | ◻️ IE11 <br> ✅ Safari | ✅ | ✅ | ✅ | 467 kB | June 24, 2019 |

## The winner

The selected library is **[vue-date-pick][vue_date_pick]**. It's a simple library, with active development and that solves all our current needs for picking dates. It doesn't have huge dependencies, and the package size is really slim. In addition, it's really simple to add i18n, and custom styles.

## Relevant links

- https://homeday.atlassian.net/browse/CE-1388

<!-- Links references -->

[date_input]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
[date_input_browser_support]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date#Handling_browser_support
[our_browserlist]: /.browserlistrc
[browser_usage_global_stats]: https://www.w3counter.com/globalstats.php
[ie_11]: https://en.wikipedia.org/wiki/Internet_Explorer_11
[safari]: https://www.apple.com/safari/
[text_input]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
[vue_datetime]: https://github.com/mariomka/vue-datetime
[vue_datetime_documentation]: https://github.com/mariomka/vue-datetime#readme
[luxon]: https://moment.github.io/luxon/
[vue_date_pick]: https://github.com/dbrekalo/vue-date-pick
[vue_date_pick_documentation]: https://dbrekalo.github.io/vue-date-pick/getting-started.html
[vue2_datepicker]: https://github.com/mengxiong10/vue2-datepicker
[vue2_datepicker_documentation]: https://mengxiong10.github.io/vue2-datepicker/index.html
[vuejs_datepicker]: https://github.com/charliekassel/vuejs-datepicker
[vuejs_datepicker_documentation]: https://github.com/charliekassel/vuejs-datepicker#readme