<template>
  <div class="confirmPassword">
    <hd-input ref="passwordMain" name="passwordMain"
    @dataChange="fieldDataChange" class="confirm-password__input"
    type="password" :label="t.FORM.PASSWORD.LABEL" :required="true"/>

    <div class="confirmPassword__strengthMeter" :class="{isVisible: strengthUIVisible}">
      <div class="confirmPassword__strengthMeter__text">{{ t.FORM.VALIDATION.PASSWORD_STRENGTH.LEVELS[strengthIndex] }}</div>
      <div class="confirmPassword__strengthMeter__gauge">
        <div class="confirmPassword__strengthMeter__gauge__bar" :class="barClasses"></div>
      </div>
    </div>

    <hd-input ref="passwordConfirm" name="passwordConfirm"
    @dataChange="fieldDataChange" class="confirmPassword__input"
    type="password" :label="t.FORM.PASSWORD.LABEL_CONFIRM" :required="true"/>
  </div>
</template>

<script>
import some from 'lodash/some';
import { getPasswordStrength } from 'hd-blocks-src/services/utils';
import HdInput from 'hd-blocks-src/components/form/HdInput.vue';
import { getMessages } from 'hd-blocks-src/lang';

export default {
  name: 'hd-confirm-password',
  components: {
    HdInput,
  },
  props: {
    name: String,
    min: {
      type: Number,
      default: 0,
    },
    withStrength: {
      type: Boolean,
      default: true,
    },
    strengthUI: {
      type: Boolean,
      default: false,
    },
    lang: String,
  },
  data() {
    return {
      t: {},
      formData: {
        passwordMain: {
          value: '',
          error: true,
        },
        passwordConfirm: {
          value: '',
          error: true,
        },
      },
      strengthIndex: null,
      strengthUIVisible: false,
    };
  },
  created() {
    this.t = getMessages(this.lang);
  },
  computed: {
    barClasses() {
      return {
        [`level--${this.strengthIndex}`]: this.strengthUIVisible && this.strengthIndex >= 0,
      };
    },
  },
  methods: {
    fieldDataChange({ name, value, error }) {
      this.formData[name] = { value, error };
      this.checkPasswordValidity();
      this.emitData();
    },
    checkPasswordValidity() {
      if (this.formData.passwordMain.value.length > 0) {
        this.checkPasswordMatching(this.formData.passwordMain, this.formData.passwordConfirm);
        if (this.withStrength) {
          this.checkPasswordStrength(this.formData.passwordMain.value);
        }
      }
      if (this.min > this.formData.passwordMain.value.length && !this.formData.passwordMain.error) {
        this.$refs.passwordMain.showError(this.t.FORM.VALIDATION.PASSWORD_SHORT);
      }
      if (this.$refs.passwordMain.error !== null) {
        this.strengthUIVisible = false;
      }
    },
    checkPasswordMatching(passwordMainData, passwordConfirmData) {
      if (passwordConfirmData.value !== '' && passwordMainData.value !== passwordConfirmData.value) {
        // eslint-disable-next-line
        passwordConfirmData.error = this.t.FORM.VALIDATION.PASSWORD_MISMATCH;
        this.$refs.passwordConfirm.showError(passwordConfirmData.error);
      } else if (passwordConfirmData.error === this.t.FORM.VALIDATION.PASSWORD_MISMATCH) {
        this.$refs.passwordConfirm.validate();
      }
    },
    checkPasswordStrength(password) {
      this.strengthIndex = getPasswordStrength(password, 4);
      if (this.strengthUI) {
        this.strengthUIVisible = true;
      } else {
        const COLORS = [
          'orange',
          'GoldenRod',
          'LimeGreen',
          'green',
        ];
        const { TITLE, LEVELS } = this.t.FORM.VALIDATION.PASSWORD_STRENGTH;
        const msg = `${TITLE}: <span style='color: ${COLORS[this.strengthIndex]}'>${LEVELS[this.strengthIndex]}</span>`;
        this.$refs.passwordMain.showHelper(msg);
      }
    },
    emitData() {
      this.$emit('dataChange', {
        name: this.name,
        value: this.formData.passwordMain.value,
        error: this.formData.passwordMain.error || this.formData.passwordConfirm.error,
      });
    },
    hasErrors(formData) {
      return some(formData, field => field.error !== null);
    },
    validityCheck() {
      this.$refs.passwordMain.validityCheck();
      this.$refs.passwordConfirm.validityCheck();
      this.emitData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'hd-blocks-src/styles/variables.scss';
.confirmPassword {
  width: 100%;
  position: relative;
  &__strengthMeter {
    height: 14px;
    width: 100%;
    padding-left: $inline-s;
    position: absolute;
    top: 66px; // input height + margin
    display: flex;
    align-items: center;
    visibility: hidden;
    &.isVisible {
      visibility: visible;
    }
    &__text {
      @include font('text-xxsmall');
      color: $regent-gray;
      width: 65px;
    }
    &__gauge {
      height: 2px;
      flex: 1;
      &__bar {
        background: grey;
        width: 0%;
        height: 100%;
        transition: width .5s, background-image 1s;
        position: relative;
        overflow: hidden;
        &:after {
          content: '';
          height: 100%;
          width: 20px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, .7));
          position: absolute;
          right: -30px;
          top: 0;
          opacity: 0;
        }
        &.level {
          &--0 {
            width: 25%;
            background-image: linear-gradient(to right, #f70, #fa0);
          }
          &--1 {
            width: 50%;
            background-image: linear-gradient(to right, #db0, #bd0);
          }
          &--2 {
            width: 75%;
            background-image: linear-gradient(to right, #9d0, #5d1);
          }
          &--3 {
            &:after {
              animation: fadeInLeft 2s;
            }
            width: 100%;
            background-image: linear-gradient(to right, #1d0, #094);
          }
        }
      }
    }
  }
  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      transform: translateX(-300px);
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
}
</style>
