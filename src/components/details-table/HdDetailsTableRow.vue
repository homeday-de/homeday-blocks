<template>
  <div
    :class="{
      'details-table__row': true,
      'details-table__row--single-column': forceSingleColumn,
    }"
  >
    <dt class="details-table__row__label">
      {{ label }}<span class="details-table__row__required" v-if="required">*</span>:
    </dt>
    <dd class="details-table__row__content">
      <div class="details-table__row__content__inside">
        <slot/>
      </div>
    </dd>
  </div>
</template>

<script>
export default {
  name: 'HdDetailsTableRow',
  props: {
    label: {
      type: String,
      default: '',
    },
    forceSingleColumn: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.details-table__row {
  margin-top: $sp-s;
  margin-bottom: $sp-s;
  display: flex;
  flex-flow: row nowrap;
  word-wrap: break-word;

  @media (min-width: $break-desktop) {
    margin-top: 0;
    min-width: 0;
    flex: 0 0 100%;

    &:not(&--single-column) {
      flex: 0 0 50%;
    }
  }

  &__label {
    flex: 0 0 152px;
    min-width: 0;
    margin-right: $sp-s;
    color: getShade($quaternary-color, 80);

    @media (min-width: $break-tablet) {
      flex-basis: 187px;
    }
  }

  &__content {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    align-items: flex-end;

    &__inside {
      width: 100%;
      &::first-letter {
        text-transform: capitalize;
      }
    }

    .field {
      margin-bottom: $sp-m;
      word-wrap: normal;

      &__input {
        padding-top: $sp-s;
      }
    }
  }

  &:not(&--single-column):nth-child(odd) #{&}__content {

    @media (min-width: $break-desktop) {
      margin-right: $sp-xs;
    }
  }

  &:not(&--single-column):nth-child(even) #{&}__label {

    @media (min-width: $break-desktop) {
      margin-left: $sp-xs;
    }
  }
}
</style>
