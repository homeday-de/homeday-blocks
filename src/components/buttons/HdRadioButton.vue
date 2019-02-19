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
    <label :for="name" class="radioButton__label" v-text="label" />
  </div>
</template>

<script>
export default {
  name: 'hdRadioButton',
  props: {
    label: String,
    value: {
      type: [String, Number],
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
  methods: {
    setBackgroundImage: path => ({ 'background-image': `url(${path})` }),
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
  &:after {
    content: "";
    background: url('~hd-blocks/assets/icons/ic_arrow_forward--idle-24px.svg');
    display: block;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    @media(min-width: $break-mobile) {
      display: none;
    }
  }
  // Border
  &:not(:last-child) {
    @media(max-width: $break-mobile - 1) {
      &:before {
        $leftPos: $iconWidth + $inline-s;
        content: "";
        position: absolute;
        left: $leftPos;
        right: 0;
        height: 1px;
        width: calc(100% - #{$leftPos});
        bottom: 0;
        background: $heather;
      }
    }
  }

  @media(min-width: $break-mobile) {
    flex-direction: column;
    border-radius: 4px;
    padding: $inset-m;
    box-shadow: 0 6px 12px 0 rgba(0,0,0,.3);

    &:hover, &:focus {
      transform: translateY(-2px);
      box-shadow: 0 9px 12px 0 rgba(0,0,0,.2);
      // border: 4px solid $vivid-blue;
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
        border: 4px solid $vivid-blue;
      }
    }
  }
  &__input {
    display: none;
  }
  &__iconWrapper {
    display: none;
    margin-right: $inline-s;
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
.hd-radio-button {
  @media(min-width: $break-mobile) {
    border-radius: 3px;
    flex-direction: column;
    box-shadow: 0 6px 12px 0px rgba(0, 0, 0, 0.3);

    &:hover, &:focus {
      cursor: pointer;
      box-shadow: 0 9px 12px 0 rgba(0, 0, 0, 0.2);
      border: 3px solid $vivid-blue;
      backface-visibility: hidden;
      outline: none;
      transform: translateY(-2px);

      .image-container {
        display: none;
        &--hover {
          display: block;
        }
      }
    }

  }
  &:focus {
    outline: none;
  }
  &:after {
    content: "";
    background: url('~/assets/icons/ic_arrow_forward--idle-24px.svg');
    display: block;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    @media(min-width: $break-mobile) {
      display: none;
    }
  }

  &__input {
    display: none;
  }

  &__img {
    .image-container {
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
    }

    &--mobile {
      .image-container {
        width: 48px;
        height: 48px;
      }

      @media(min-width: $break-mobile) {
        display: none;
      }
    }

    &--desktop {
      display: none;
      .image-container {
        width: 96px;
        height: 96px;
        &--hover {
          display: none;
        }
      }
      @media(min-width: $break-mobile) {
        display: block;
      }
    }
  }


  &__label {
    width: 100%;
    margin-left: $inset-s;
    padding: #{$stack-m - 3px} 0;
    border-bottom: 1px solid $heather;
    font-size: 16px;
    line-height: 19px;
    cursor: pointer;

    @media(min-width: $break-mobile) {
      margin-left: 0;
      text-align: center;
      color: $cello;
      border: 0;
      padding: 0 $inline-s;
      height: 41px;
    }
  }
}


.touch {
  .hd-radio-button {
    @media(min-width: $break-mobile) {
      &:hover .radio-img-wrapper .radio-img {
        display: block;
      }
      &:hover .radio-img-wrapper .radio-img-hover {
        display: none;
      }
    }
  }
}
</style>
