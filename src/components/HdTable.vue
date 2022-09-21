<template>
  <table class="hd-table" :class="{ [align]: true, noWrap, fixed }">
    <thead>
      <tr>
        <th v-for="(th, i) in header" :key="`header-${i}`">{{ th }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(tr, i) in body" :key="`row-${i}`">
        <td v-for="(value, name) in tr" :key="`cell-${name}`">
          <slot :name="name" :value="value" :row-context="tr"
            ><span>{{ value }}</span></slot
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'HdTable',
  props: {
    header: {
      type: Array,
      required: true,
      validator(value) {
        return value.length > 0;
      },
    },
    body: {
      type: Array,
      required: true,
      validator(value) {
        return value.length > 0;
      },
    },
    align: {
      type: String,
      default: 'center',
    },
    noWrap: Boolean,
    fixed: Boolean,
  },
};
</script>
<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.hd-table {
  margin-top: $sp-s;
  @include font('text-xsmall');
  border-collapse: collapse;
  width: 100%;
  z-index: -1;
  text-align: center;
  th,
  td {
    padding: $sp-s;
    border-top: 1px solid getShade($quaternary-color, 60);
    color: $quaternary-color;
    font-weight: 600;
    vertical-align: middle;
    position: relative;
  }
  th {
    border-top: none;
    color: $primary-color;
    font-size: 13px;
    font-weight: 700;
    vertical-align: middle;
  }
  tr:nth-child(even) {
    background-color: $secondary-bg;
    td:after {
      background-color: $secondary-bg;
    }
  }
  &.fixed {
    table-layout: fixed;
  }
  &.center {
    text-align: center;
  }
  &.noWrap {
    td {
      white-space: nowrap;
      overflow: hidden;
    }
    td:after {
      content: '';
      width: $sp-s;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      background: linear-gradient(to left, $primary-bg, rgba($primary-bg, 0));
    }
    tr:nth-child(even) td:after {
      background: linear-gradient(to left, $secondary-bg, rgba($secondary-bg, 0));
    }
  }
  &.left {
    th,
    td {
      text-align: left;
    }
  }
}
</style>
