<template>
  <div class="confirm-password">
    <hd-input ref="passwordMain" name="passwordMain"
    @dataChange="fieldDataChange" class="confirm-password__input"
    type="password" :label="t.FORM.PASSWORD.LABEL" :required="true"/>

    <hd-input ref="passwordConfirm" name="passwordConfirm"
    @dataChange="fieldDataChange" class="confirm-password__input"
    type="password" :label="t.FORM.PASSWORD.LABEL_CONFIRM" :required="true"/>
  </div>
</template>

<script>
import some from 'lodash/some';
import { getPasswordStrength } from '@/services/utils';
import HdInput from '@/components/form/HdInput.vue';
import { getMessages } from '@/lang';

export default {
  name: 'hd-confirm-password',
  props: {
    name: String,
    min: {
      type: Number,
      default: 0,
    },
  },
  components: {
    HdInput,
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
    };
  },
  created() {
    this.t = getMessages(this.lang);
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
        this.checkPasswordStrength(this.formData.passwordMain.value);
      }
      if (this.min > this.formData.passwordMain.value.length && !this.formData.passwordMain.error) {
        this.$refs.passwordMain.showError(this.t.FORM.VALIDATION.PASSWORD_SHORT);
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
      const strengthIndex = getPasswordStrength(password, 4);
      const msg = this.t.FORM.VALIDATION.PASSWORD_STRENGTH[strengthIndex];
      this.$refs.passwordMain.showHelper(msg);
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
@import '@/styles/variables.scss';
.confirm-password {
  width: 100%;
}
</style>
