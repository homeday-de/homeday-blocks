<template>
  <div
    class="autocomplete"
    @keydown.down="onDown"
    @keydown.up="onUp"
    @keydown.enter="onEnter"
    @keydown.esc="hide"
  >
    <hd-input v-bind="inputProps" :value="query" @dataChange="updateQuery" class="autocomplete__field" />
    <ul class="autocomplete__suggestions" v-if="suggestions.length > 0 && !suggestionsHidden">
      <li
        class="autocomplete__suggestionItem" @click="selectSuggestion(suggestion, true)" v-for="(suggestion, index) in suggestions" :key="index">
        <slot :suggestion="suggestion" :isSelected="suggestion === selectedSuggestion"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
import HdInput from 'hd-blocks-components/form/HdInput.vue';
import { populateTemplate } from 'hd-blocks-services/utils';
// import debounce from 'lodash/debounce';

export default {
  name: 'HdAutocomplete',
  components: {
    HdInput,
  },
  props: {
    formatter: {
      type: String,
      required: true,
    },
    suggestions: {
      type: Array,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
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
      validator: val => ['de', 'en'].indexOf(val) !== -1,
    },
  },
  data() {
    return {
      query: '',
      queryBackup: '',
      selectedSuggestion: null,
      suggestionsHidden: false,
    };
  },
  methods: {
    onDown() {
      const noSelection = this.selectedSuggestion === null;
      const isLast = (this.nextSuggestionIndex + 1) > this.suggestions.length;
      if (noSelection) {
        this.selectSuggestion(this.suggestions[0]);
      } else if (isLast) {
        this.query = this.queryBackup;
        this.selectSuggestion(null);
      } else {
        this.selectSuggestion(this.suggestions[this.nextSuggestionIndex]);
      }
    },
    onUp() {
      const noSelection = this.selectedSuggestion === null;
      const isFirst = this.previousSuggestionIndex === -1;
      if (noSelection) {
        this.selectSuggestion(this.suggestions[this.suggestions.length - 1]);
      } else if (isFirst) {
        this.query = this.queryBackup;
        this.selectSuggestion(null);
      } else {
        this.selectSuggestion(this.suggestions[this.previousSuggestionIndex]);
      }
    },
    hide() {
      this.suggestionsHidden = true;
    },
    updateQuery({ value }) {
      this.query = value;
    },
    formatQuery(suggestion) {
      const formatVars = this.formatter.match(/:(.+?)\b/g);
      const formatVarsTrimmed = formatVars.map(v => v.replace(/:/g, ''));
      const formatterValues = formatVarsTrimmed.reduce((acc, curr) => ({
        ...acc, [curr]: suggestion[curr],
      }), {});

      return populateTemplate(this.formatter, formatterValues);
    },
    selectSuggestion(suggestion, hideList) {
      if (this.queryBackup === '') {
        this.queryBackup = this.query;
      }
      if (suggestion) {
        this.query = this.formatQuery(suggestion);
      } else {
        this.queryBackup = '';
      }
      this.selectedSuggestion = suggestion;

      if (hideList) {
        this.hide();
      }
    },
  },
  computed: {
    currentSuggestionIndex() {
      return this.suggestions.findIndex(s => s === this.selectedSuggestion);
    },
    previousSuggestionIndex() {
      return this.currentSuggestionIndex - 1;
    },
    nextSuggestionIndex() {
      return this.currentSuggestionIndex + 1;
    },
    inputProps() {
      const {
        name, label, type, placeholder, required, autocomplete, autofocus, lang,
      } = this;
      return {
        name, label, type, placeholder, required, autocomplete, autofocus, lang,
      };
    },
  },
  watch: {
    query(val) {
      this.$emit('queryUpdated', val);
      this.suggestionsHidden = false;
    },
    suggestions() {
    },
  },
};
</script>

<style lang="scss" scoped>

.autocomplete {
  &__suggestions {
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  &__suggestionItem {
    list-style: none;
  }
  &__field {
    margin-bottom: 0;
  }
}
</style>
