<script>
export const TYPES = [
  'primary',
  'secondary',
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
    customTag: {
      type: String,
      required: false,
      default: 'router-link',
    },
  },
  computed: {
    computedClasses() {
      const baseClass = 'hd-link';
      const classes = [
        baseClass,
        `${baseClass}--${this.modifier}`,
      ];

      return classes;
    },
  },
  render(createElement) {
    const tag = this.to ? this.customTag : 'a';
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

<style lang="scss" scoped>
@import "../styles/typography";
</style>
