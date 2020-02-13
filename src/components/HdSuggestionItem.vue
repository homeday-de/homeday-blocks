<template>
  <div class="suggestionItem" :class="{'suggestionItem--isSelected': isSelected}">
    <img class="suggestionItem__icon" v-if="icon" :src="icon"/>
    <div class="suggestionItem__content">
      <p class="suggestionItem__line suggestionItem__line--1" v-html="highlightedLine1" />
      <p class="suggestionItem__line suggestionItem__line--2" v-html="highlightedLine2" />
    </div>
  </div>
</template>

<script>
import { accentFold } from 'homeday-blocks/src/services/utils';

const containsSharpS = text => text.match(/ß/) !== null;
export default {
  name: 'HdSuggestionItem',
  props: {
    line1: String,
    line2: String,
    icon: String,
    highlightString: String,
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({

  }),
  methods: {
    highlightText(text) {
      const normalizedText = text.toLowerCase();
      const normalizedHighlight = this.highlightString.toLowerCase();
      const accentFoldedText = accentFold(normalizedText);

      // const highlightContainsSharpS = containsSharpS(this.highlightString);
      const accentFoldedMatch = accentFoldedText.match(normalizedHighlight);
      const regularMatch = normalizedText.match(normalizedHighlight);
      const matchedText = regularMatch || accentFoldedMatch;

      if (matchedText) {
        const startIndex = matchedText ? matchedText.index : 0;
        const endIndex = startIndex + this.highlightString.length;
        const proposedHighlight = text.slice(startIndex, endIndex);

        const isSS = containsSharpS(proposedHighlight) && !containsSharpS(this.highlightString);

        const highlight = text.slice(startIndex, isSS ? endIndex - 1 : endIndex);

        return text.replace(highlight, "<span class='suggestionItem__highlight'>$&</span>");
      }
      return text;
    },
  },
  computed: {
    highlightedLine1() {
      return this.highlightText(this.line1);
    },
    highlightedLine2() {
      return this.highlightText(this.line2);
    },
  },
};
</script>

<style lang="scss">
@import 'homeday-blocks/src/styles/mixins.scss';

.suggestionItem {
  $sI: &;
  @include font('text-xsmall');
  background-color: $primary-bg;
  cursor: pointer;
  border: 0;
  position: relative;
  display: flex;
  align-items: center;

  &:after {
    content: '';
    width: 10px;
    position: absolute;
    top: 0; bottom: 1px; right: 0;
    width: 20px;
    background: linear-gradient(to left, rgba($primary-bg, 1), rgba($primary-bg, 0));
  }

  &:hover, &--isSelected {
    background: $secondary-bg;
  }

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 50px;
    position: relative;

    &:after {
      content: "";
      width: 100%;
      left: 0;
      right: 0;
      height: 1px;
      background: getShade($quaternary-color, 60);
      bottom: -1px;
      position: absolute;
      z-index: 1;
    }
  }
  &__icon {
    margin: $inset-s;
  }

  &__line {
    white-space: nowrap;

    &--2 {
      font-size: 13px;
      color: getShade($quaternary-color, 80);
    }

  }
  &__highlight {
    font-weight: 600;
  }
}
</style>
