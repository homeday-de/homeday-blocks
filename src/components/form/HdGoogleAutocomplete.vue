<template>
  <div id="app">
    <HdAutocomplete
      name="test"
      label="Label 123"
      placeholder="Placeholder"
      :suggestions="suggestions"
      @querySuggestions="updateSuggestions"
      formatter=":line1"
    >
      <template slot-scope="{ suggestion, isSelected }">
        <HdSuggestionItem
          :line1="suggestion.line1"
          :line2="suggestion.line2"
          :isSelected="isSelected"
          :highlightString="query"
          :icon="require('hd-blocks/assets/icons/ic_location--grey.svg')"
        />
      </template>
    </HdAutocomplete>
  </div>
</template>

<script>
import HdAutocomplete from 'hd-blocks/components/form/HdAutocomplete.vue';
import HdSuggestionItem from 'hd-blocks/components/HdSuggestionItem.vue';
import { loadJSAsync } from 'hd-blocks/services/utils';

function get() {
  const key = 'AIzaSyDY98a4vRvZnPpX7Fy7fXso4JDFbiLhi8I';
  return new Promise((resolve, reject) => {
    loadJSAsync(`maps.googleapis.com/maps/api/js?v=3&libraries=places&key=${key}`,
      () => resolve(window.google),
      () => reject());
  });
}

export default {
  name: 'HdGoogleAutocomplete',
  components: {
    HdAutocomplete,
    HdSuggestionItem,
  },
  data: () => ({
    query: '',
    autocompleteService: null,
    queryConfig: {
      components: 'country:de',
    },
    suggestions: [],
  }),
  mounted() {
    get().then((google) => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
    });
  },
  methods: {
    async updateSuggestions(query) {
      this.query = query;

      const params = {
        components: 'country:de',
        input: this.query,
        componentRestrictions: {
          country: 'de',
        },
      };
      const test = await new Promise((resolve) => {
        this.autocompleteService.getPlacePredictions(params, (predictions) => {
          resolve(predictions);
        });
      });

      this.suggestions = this.parsePlacesResponse(test);
    },
    parsePlacesResponse: response => response.map((item) => {
      const line1 = item.structured_formatting.main_text;
      const line2 = (item.structured_formatting.secondary_text) ? item.structured_formatting.secondary_text : undefined;
      return { line1, line2 };
    }),
  },
};
</script>

<style lang="scss">
</style>
