<template>
  <div
    @click="select"
    @keyup.enter.space="select"
    class="radioButton"
    role="button"
    tabindex="0"
  >
    <input
      v-if="name && value"
      type="radio"
      :name="name"
      :value="value"
      class="radioButton__input"
      @change="select"
    />
    <!-- Desktop icon -->
    <div class="radioButton__iconWrapper radioButton__iconWrapper--desktop">
      <div
        :style="setBackgroundImage(desktopIcon)"
        class="radioButton__icon"
      />
      <div
        :style="setBackgroundImage(desktopIconHover)"
        class="radioButton__icon--isHover radioButton__icon"
      />
    </div>
    <!-- Mobile icon -->
    <div class="radioButton__iconWrapper radioButton__iconWrapper--mobile">
      <div
        :style="setBackgroundImage(mobileIcon)"
        class="radioButton__icon"
      />
    </div>
    <label :for="name" class="radioButton__label" v-html="label" />
    <HdIcon
      :src="chevronIcon"
      class="radioButton__chevron"
    />
  </div>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import { chevron as chevronIcon } from 'homeday-assets';

export default {
  name: 'hdRadioButton',
  components: {
    HdIcon,
  },
  props: {
    label: String,
    value: {
      type: [String, Number, Object],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    desktopIcon: {
      type: String,
      required: true,
    },
    desktopIconHover: {
      type: String,
      required: true,
    },
    mobileIcon: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      chevronIcon,
    };
  },
  methods: {
    setBackgroundImage: (path) => ({ 'background-image': `url(${path})` }),
    select() {
      this.$emit('select', {
        value: this.value,
        name: this.name,
      });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

$iconWidth: 48px;
.radioButton {
  $rB: &;
  position: relative;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: transform .2s ease-in-out, box-shadow .2s ease-in-out;

  &__chevron {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    @media(min-width: $break-mobile) {
      display: none;
    }

    &::v-deep path {
      fill: $quaternary-color;
    }
  }
  // Border
  &:not(:last-child) {
    @media(max-width: $break-mobile - 1) {
      &:before {
        $leftPos: $iconWidth + $sp-s;
        content: "";
        position: absolute;
        left: $leftPos;
        right: 0;
        height: 1px;
        width: calc(100% - #{$leftPos});
        bottom: 0;
        background: getShade($quaternary-color, 60);
      }
    }
  }

  @media(min-width: $break-mobile) {
    flex-direction: column;
    border-radius: 4px;
    padding: $sp-m;
    box-shadow: 0 6px 12px 0 rgba(0,0,0,.3);

    &:hover, &:focus {
      transform: translateY(-2px);
      box-shadow: 0 9px 12px 0 rgba(0,0,0,.2);
      // border: 4px solid getShade($secondary-color, 110);
      outline: none;
      // margin: -4px;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border-radius: 4px;
        border: 4px solid getShade($secondary-color, 110);
      }
    }
  }
  &__input {
    display: none;
  }
  &__iconWrapper {
    display: none;
    margin-right: $sp-s;
    &--mobile {
      display: block;

      @media(min-width: $break-mobile) {
        display: none;
      }
    }
    &--desktop {
      @media(min-width: $break-mobile) {
        display: block;
      }
    }
  }
  &__icon {
    width: 48px;
    height: 48px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    @media(min-width: $break-mobile) {
      width: 96px;
      height: 96px;
      #{$rB}:hover & {
        display: none;
      }
    }

    &--isHover {
      display: none;

      #{$rB}:hover & {
        display: block;
      }
    }
  }
  &__label {
    font-size: 16px;
    line-height: 19px;
  }
}
</style>
