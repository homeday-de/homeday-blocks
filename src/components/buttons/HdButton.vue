// Apparently there is a bug on Storybook actions with `$listeners`
// This will throw the error `method "toJSON" is not defined` on JS console 🙇‍♂️
// https://github.com/storybookjs/storybook/issues/14933
// This error appeared when bumping node from v12 to v14
<template>
  <button
    v-on="$listeners"
    :class="computedClasses"
  >
    <span
      v-if="iconSrc"
      class="btn__icon"
    >
      <HdIcon
        :src="iconSrc"
        width="100%"
        height="100%"
      />
    </span>
    <span
      ref="content"
      class="btn__content"
    >
      <slot />
    </span>
  </button>
</template>

<script>
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import TYPES from 'homeday-blocks/src/components/buttons/HdButtonTypes';

export default {
  name: 'HdButton',
  components: {
    HdIcon,
  },
  props: {
    modifier: {
      type: String,
      default: TYPES.PRIMARY,
      validator(value) {
        const allTypes = Object.values(TYPES);

        return allTypes.includes(value);
      },
    },
    isInDarkBackground: {
      type: Boolean,
      default: false,
    },
    iconSrc: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      contentObserver: null,
      isIconButton: false,
    };
  },
  computed: {
    computedClasses() {
      const baseClass = 'btn';
      return [
        baseClass,
        {
          [`${baseClass}--${this.modifier}`]: this.modifier,
          [`${baseClass}--dark-background`]: this.isInDarkBackground,
          [`${baseClass}--icon-button`]: this.isIconButton,
        },
      ];
    },
  },
  mounted() {
    // We set an observer to watch the content of the button
    // to know when to switch to the icon button mode
    this.contentObserver = new MutationObserver(() => {
      this.detectIconButton();
    });
    this.contentObserver.observe(this.$refs.content, {
      characterData: true,
      subtree: true,
    });

    this.detectIconButton();
  },
  beforeDestroy() {
    this.contentObserver.disconnect();
  },
  methods: {
    detectIconButton() {
      // It's an icon button if the content element has no text
      this.isIconButton = !this.$refs.content.textContent.trim();
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'homeday-blocks/src/styles/_variables.scss';

.btn {
  &--icon-button {
    padding: $sp-s;
  }

  &__icon {
    width: 24px;
    height: 24px;
    margin-right: $sp-xs;

    .btn--icon-button & {
      width: 28px;
      height: 28px;
      margin-right: 0;
    }

    ::v-deep path {
      fill: currentColor;
    }
  }
}
</style>
