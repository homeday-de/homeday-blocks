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
export const TYPES = {
  DEFAULT: '',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  DISABLED: 'disabled',
};

export default {
  name: 'HdBadge',
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
@import 'hd-blocks/styles/mixins.scss';

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
      padding: $stack-xs $inline-s;
      cursor: default;

      &::after{
        content: ' ';
        display: none;
        background: url('~hd-blocks/assets/icons/ic_chevron-down.svg') no-repeat;
        width: 16px;
        height: 16px;
        margin-left: $inline-m;
        margin-right: $inline-s;
      }
    }

    ::v-deep  &__icon{
      width: 14px;
      height: 14px;
      margin-right: $inline-s;
    }

    &__details{
      visibility: hidden;
      width: 170px;
      white-space: nowrap;
      overflow: hidden;

      padding: $inset-s;
      padding-top: 0;
      border-bottom-left-radius: $inline-xs;
      border-bottom-right-radius: $inline-xs;
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
        color: $secondary-color;

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

    &--with-details > &__label{
      cursor: pointer;

      &::after{
        display: block;
      }
    }

    &--collapsed{
      display: block;
    }

    &--collapsed > &__label{
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      &::after{
        transform: rotateZ(180deg);
      }
    }

    &--collapsed > &__details{
      visibility: visible;
      width: 100%;
      white-space: normal;
    }
}
</style>
