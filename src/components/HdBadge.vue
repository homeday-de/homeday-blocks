<template>
  <!-- collapsible badge component could have been structured in a semantic way using
  html5 <details> & <summary> tags but unfortunately IE doesn't support them -->
  <div
    :class="computedClasses"
  >
    <span
      class="badge__label"
      @click.capture="collapse"
    >
      <template v-if="showIconBefore">
        <img
          v-if="icon"
          :src="icon"
          class="badge__icon"
        >
        <svg
          v-else
          class="badge__icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="7"
            cy="7"
            r="7"
            fill="currentColor"
          />
        </svg>
      </template>
      {{ label }}
      <HdIcon
        :src="chevronIcon"
        transform="rotate(90)"
        class="badge__chevron"
      />
    </span>
    <p
      v-if="hasDetails"
      class="badge__details"
    >
      <slot />
    </p>
  </div>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { TYPES } from 'homeday-blocks/src/components/HdBadgeTypes';
import { chevron as chevronIcon } from 'homeday-assets';

export default {
  name: 'HdBadge',
  components: {
    HdIcon,
  },
  props: {
    modifier: {
      type: String,
      default: TYPES.DEFAULT,
      validator(value) {
        const allTypes = Object.values(TYPES);

        return allTypes.includes(value);
      },
    },
    label: {
      type: String,
      default: '',
    },
    showIconBefore: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      collapsed: false,
      chevronIcon,
    };
  },
  computed: {
    computedClasses() {
      const baseClass = 'badge';
      const classes = [baseClass];

      if (this.modifier) {
        classes.push(`${baseClass}--${this.modifier}`);
      }
      if (this.hasDetails) {
        classes.push(`${baseClass}--with-details`);
      }
      if (this.collapsed) {
        classes.push(`${baseClass}--collapsed`);
      }

      return classes;
    },
    hasDetails() {
      return !!this.$slots.default;
    },
  },
  methods: {
    collapse() {
      if (this.hasDetails) this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/mixins.scss';

.badge{
    display: flex;
    justify-content: flex-start;

    &__label{
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 18px;
      line-height: 28px;
      border-radius: 4px;
      padding: $sp-xs $sp-s;
      cursor: default;
    }

    &__chevron {
      display: none;
      width: 24px;
      height: 24px;
      margin-left: $sp-m;
      margin-right: $sp-s;

      &::v-deep path {
        fill: currentColor;
      }
    }

    ::v-deep  &__icon{
      width: 14px;
      height: 14px;
      margin-right: $sp-s;
    }

    &__details{
      visibility: hidden;
      width: 170px;
      white-space: nowrap;
      overflow: hidden;

      padding: $sp-s;
      padding-top: 0;
      border-bottom-left-radius: $sp-xs;
      border-bottom-right-radius: $sp-xs;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      font-weight: normal;
      font-size: 18px;
      line-height: 28px;
    }

    &--primary{
        color: $success-color;

        .badge__label, .badge__details{
          background: rgba($success-color, 0.15);
        }
    }

    &--secondary{
        color: getShade($secondary-color, 110);

        .badge__label, .badge__details{
          background: getShade($secondary-color, 70);
        }
    }

    &--tertiary{
        color: $tertiary-color;

        .badge__label, .badge__details{
          background: getShade($tertiary-color, 60);
        }
    }

    &--disabled{
        color: $quaternary-color;

        .badge__label, .badge__details{
          background: getShade($quaternary-color, 40);
        }
    }

    &--with-details & {
      &__label{
        cursor: pointer;
      }

      &__chevron{
        display: block;
      }
    }

    &--collapsed {
      display: block;
    }

    &--collapsed > &__label {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &--collapsed &__chevron {
      transform: rotateZ(270deg);
    }

    &--collapsed > &__details {
      visibility: visible;
      width: 100%;
      white-space: normal;
    }
}
</style>
