<template>
  <div class="details-table-wrap" :id=reference>
    <dl
      :class="{ withDivider }"
      class="details-table">
      <div
        v-if="$slots.before"
        class="details-table__before"
      >
        Test
        <slot name="before"/>
      </div>
      <div class="details-table__rows">
        <slot/>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'HdDetailsTable',
  props: {
    withDivider: {
      type: Boolean,
      default: true,
    },
    reference: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.details-table-wrap {
  padding-top: $sp-m;
  padding-bottom: $sp-s;

  + #{&} {
    padding-top: $sp-s;
  }
}

.details-table {
  &.withDivider {
    &::after {
      content: '';
      display: block;
      height: 2px;
      background-color: getShade($quaternary-color, 60);
      margin-top: $sp-s;
    }
  }

  &__before {

    @media (min-width: $break-desktop) {
      margin-bottom: $sp-s;
    }
  }

  &__rows {

    @media (min-width: $break-desktop) {
      display: flex;
      flex-flow: row wrap;
      align-items: flex-start;
    }
  }
}
</style>
