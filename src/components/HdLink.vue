<script>
export const TYPES = [
  'primary',
  'secondary',
  'dark',
  'secondary-dark',
];

export default {
  name: 'HdLink',
  props: {
    modifier: {
      type: String,
      default: 'primary',
      validator(value) {
        return TYPES.includes(value);
      },
    },
    to: {
      type: [String, Object],
    },
  },
  computed: {
    computedClasses() {
      const baseClass = 'link';
      const classes = [
        baseClass,
        `${baseClass}--${this.modifier}`,
      ];

      return classes;
    },
  },
  render(createElement) {
    const tag = this.to ? 'router-link' : 'a';
    const data = {
      class: this.computedClasses,
    };

    if (this.to) {
      data.props = {
        to: this.to,
      };
    }

    return createElement(
      tag,
      data,
      this.$slots.default,
    );
  },
};
</script>

<style lang="scss">
@import "../styles/typography";

.link {
  @include link;

  &--secondary {
    @include link-secondary;
  }

  &--dark {
    @include link-dark;
  }

  &--secondary-dark {
    @include link-secondary-dark;
  }
}
</style>
