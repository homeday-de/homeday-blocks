<template>
  <div
    :class="fieldClasses"
    class="field field--input"
  >
    <input
      ref="input"
      :value="value"
      :id="name"
      :name="name"
      :placeholder="isActive && placeholder !== undefined ? placeholder : ''"
      :required="required"
      :autofocus="autofocus"
      :disabled="disabled"
      autocomplete="off"
      class="field__input"
      type="text"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    >
    <label
      v-if="label"
      :for="name"
      class="field__label"
    >
      {{ label }}
    </label>
    <p
      v-if="error"
      class="field__error"
    >
      {{ error }}
    </p>
    <p
      v-else-if="helper"
      class="field__error field__error--helper"
      v-html="helper"
    />
    <span class="field__border"/>
  </div>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'hd-blocks/lang';
import { getGoogleAPI } from 'hd-blocks/services/googleAPI';

export default {
  name: 'HdGoogleAutocomplete',
  props: {
    apiKey: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    lang: {
      type: String,
      default: 'de',
    },
    texts: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customRules: {
      type: Array,
      default: () => [],
      validator: rulesProvided => rulesProvided.every(
        ({ validate, errorMessage }) => typeof validate === 'function' && typeof errorMessage === 'string',
      ),
    },
  },
  data() {
    return {
      autocompleteInstance: null,
      geocoderInstance: null,
      lastLocation: null,
      isActive: undefined,
      isValid: undefined,
      error: null,
      helper: null,
    };
  },
  computed: {
    t() {
      return merge(getMessages(this.lang), this.texts);
    },
    isEmpty() {
      return this.value === null || this.value === undefined || this.value === '';
    },
    fieldClasses() {
      return {
        'field--active': this.isActive,
        'field--filled': !this.isEmpty,
        'field--invalid': this.isValid === false,
        'field--disabled': this.disabled,
      };
    },
  },
  watch: {
    value() {
      this.validate();
    },
  },
  created() {
    this.initAutocomplete();
  },
  methods: {
    async initAutocomplete() {
      await getGoogleAPI(this.apiKey);

      const autocompleteOptions = {
        componentRestrictions: { country: 'de' },
        types: ['(regions)'],
      };

      if (!this.$refs.input) {
        return;
      }

      this.autocompleteInstance = new window.google.maps.places.Autocomplete(
        this.$refs.input,
        autocompleteOptions,
      );

      window.google.maps.event.addListener(this.autocompleteInstance, 'place_changed', () => {
        const place = this.autocompleteInstance.getPlace();

        this.$emit('input', place.name);

        if (!place.geometry) {
          return;
        }

        // If the selected the whole Germany, we ignore the lat and lng
        if (place.address_components[0].short_name === 'DE') {
          this.emitLocation({
            lat: null,
            lng: null,
            name: place.name,
          });
          return;
        }

        this.emitLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.name,
        });
      });
    },
    emitLocation({ lat = null, lng = null, name = '' }) {
      this.lastLocation = {
        lat,
        lng,
        name,
      };

      this.$emit('locationChanged', {
        lat,
        lng,
        name,
      });
    },
    async getLocation() {
      if (!this.value) {
        return {
          lat: null,
          lng: null,
          name: '',
        };
      }

      if (this.lastLocation && this.lastLocation.name === this.value) {
        return this.lastLocation;
      }

      if (!this.geocoderInstance) {
        this.geocoderInstance = new window.google.maps.Geocoder();
      }

      return new Promise((resolve) => {
        this.geocoderInstance.geocode({ address: this.value }, (results, status) => {
          if (status !== window.google.maps.GeocoderStatus.OK) {
            resolve({
              lat: null,
              lng: null,
              name: this.value,
            });
          }

          this.lastLocation = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
            name: this.value,
          };

          resolve(this.lastLocation);
        });
      });
    },
    clearInput() {
      this.$refs.input.focus();
      this.hideError();
      this.$emit('input', '');
    },
    handleFocus() {
      this.isActive = true;
    },
    handleBlur() {
      this.isActive = false;
      this.validate();
    },
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
    showError(errorMessage) {
      this.error = errorMessage;
      this.isValid = false;
    },
    showHelper(message) {
      this.helper = message;
    },
    hideError() {
      this.isValid = true;
      this.error = null;
    },
    validate() {
      if (this.required && this.isEmpty) {
        this.showError(this.t.FORM.VALIDATION.REQUIRED);
      } else if (this.customRules.length && !this.isEmpty) {
        this.validateCustomRules();
      } else {
        this.hideError();
      }
      return !this.error;
    },
    validateCustomRules() {
      const firstFailingRule = this.customRules.find(({ validate }) => !validate(this.value));
      if (firstFailingRule) {
        this.showError(firstFailingRule.errorMessage);
      } else {
        this.hideError();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import 'hd-blocks/styles/inputs.scss';
.field {
  &__label {
    left: 0;
  }
  &__error {
    width: 100%;
    text-align: left;
    &--helper {
      display: block;
      color: $regent-gray;
    }
  }
}
</style>
