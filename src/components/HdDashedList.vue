<template>
  <dl class="dashed-list">
    <template v-for="(item, index) in items">
      <h4
        v-if="item.title"
        :key="index"
        class="dashed-list__title"
      >
        {{ item.title }}
      </h4>

      <div
        v-for="({ label, value, secondaryValue }, subIndex) in (item.items || [item])"
        :key="`${index}${subIndex}`"
        class="dashed-list__item"
        :class="{
          'dashed-list__item--expanded-label': expandedLabel && !secondaryValue,
        }"
      >
        <dt>
          <span v-html="label" />
        </dt>
        <dd>
          <span v-html="value" />
        </dd>
        <dd v-if="secondaryValue">
          <div class="dashed-list__dash" />
          <span v-html="secondaryValue" />
        </dd>
      </div>
    </template>
  </dl>
</template>

<script>
export default {
  name: 'HdDashedList',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    expandedLabel: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

$leaders-border: 1px dashed getShade($neutral-gray, 50);

.dashed-list {
  background-color: inherit;

  &__title {
    margin-top: $sp-l;
    margin-bottom: $sp-s;
    color: $neutral-gray;
    font-weight: 700;
  }

  &__dash {
    flex: 1;
    display: inline-flex;
    border-bottom: $leaders-border;
    margin-bottom: .47em;
    margin-left: 0.1em;
    margin-right: 0.1em;
  }
}

.dashed-list__item {
  display: flex;
  flex-flow: wrap;
  margin-bottom: $sp-s;

  > dt,
  > dd {
    position: relative;
    display: flex;
    align-items: flex-end;
  }

  > dt {
    width: 100%;
    color: getShade($neutral-gray, 80);
  }

  > dd {
    background-color: inherit;
    color: $cello-blue;
  }

  > dd + dd {
    flex: 1;
    justify-content: flex-end;
  }
}

@media (min-width: $break-tablet) {
  .dashed-list__item {
    > dt,
    > dd {
      overflow: hidden;
    }

    > dt {
      position: relative;
      width: 40%;
      max-width: 60%;
      margin-right: 0.1em;

      > span::after {
        content: "";
        position: absolute;
        border-bottom: $leaders-border;
        width: 100%;
        margin-left: 0.1em;
        margin-top: 1em;
      }
    }
  }

  .dashed-list__item--expanded-label {
    > dt {
      flex: 1;
      width: auto;
      max-width: unset;
    }
  }
}
</style>
