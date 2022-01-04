<script>
import { TYPES } from 'homeday-blocks/src/components/HdLinkTypes';

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
      const baseClass = 'hd-link';
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

<style lang="scss" scoped>
@import "../styles/typography";
</style>
