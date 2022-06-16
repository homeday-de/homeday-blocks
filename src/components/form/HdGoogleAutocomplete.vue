<template>
  <TextFieldBase
    v-bind="$attrs"
    :name="name"
    :error="error"
    :helper="helper"
    :active="isActive"
    :filled="isFilled"
    :valid="isValid"
    :disabled="disabled"
    @clear-click="clearInput"
    @status-click="focusInput"
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
    <template #input-right>
      <slot name="input-right" />
    </template>
  </TextFieldBase>
</template>

<script>
import merge from 'lodash/merge';
import { getMessages } from 'homeday-blocks/src/lang';
import { getGoogleAPI } from 'homeday-blocks/src/services/googleAPI';
import TextFieldBase from './TextFieldBase.vue';
import formField from './formFieldMixin';

export const DEFAULT_LOCATION_DATA = {
  lat: null,
  lng: null,
  east: null,
  north: null,
  south: null,
  west: null,
  name: '',
};

export default {
  name: 'HdGoogleAutocomplete',
  mixins: [
    formField,
  ],
  components: {
    TextFieldBase,
  },
  props: {
    apiKey: {
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
      validator: (rulesProvided) => rulesProvided.every(
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
    isFilled() {
      return this.value !== null && this.value !== undefined && this.value !== '';
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
          this.emitLocation({ name: place.name });
          return;
        }

        this.emitLocation({
          ...place.geometry.location.toJSON(),
          ...place.geometry.viewport.toJSON(),
          name: place.name,
        });
      });
    },
    emitLocation(location) {
      const data = {
        ...DEFAULT_LOCATION_DATA,
        ...location,
      };

      this.lastLocation = data;

      this.$emit('locationChanged', data);
    },
    async getLocation() {
      if (!this.value) {
        return DEFAULT_LOCATION_DATA;
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
              ...DEFAULT_LOCATION_DATA,
              name: this.value,
            });
          }

          this.lastLocation = {
            ...results[0].geometry.location.toJSON(),
            ...results[0].geometry.viewport.toJSON(),
            name: this.value,
          };

          resolve(this.lastLocation);
        });
      });
    },
    clearInput() {
      this.focusInput();
      this.hideError();
      this.$emit('input', '');
    },
    focusInput() {
      this.$refs.input.focus();
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
    hideHelper() {
      this.helper = null;
    },
    validate() {
      if (this.required && !this.isFilled) {
        this.showError(this.t.FORM.VALIDATION.REQUIRED);
      } else if (this.customRules.length && this.isFilled) {
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
