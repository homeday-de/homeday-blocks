<script>
import onResize from 'homeday-blocks/src/services/on-resize';
import {
  matchMediaAvailable,
  mediaMatches,
  getBreakpoints,
} from 'homeday-blocks/src/services/breakpoints';

export default {
  name: 'HdResponsive',
  props: {
    breakpoints: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      matches: {},
      indeterminate: !matchMediaAvailable,
    };
  },
  watch: {
    breakpoints() {
      this.setResponsiveFlags();
    },
  },
  created() {
    this.setResponsiveFlags();
  },
  mounted() {
    this.addResizeEvents();
  },
  beforeDestroy() {
    this.removeResizeEvents();
  },
  methods: {
    setResponsiveFlags() {
      const breakpoints = {
        ...getBreakpoints(),
        ...this.breakpoints,
      };

      this.matches = Object.keys(breakpoints).reduce(
        (matches, breakpointKey) => ({
          ...matches,
          [breakpointKey]: mediaMatches(breakpoints[breakpointKey]),
        }),
        {},
      );
    },
    addResizeEvents() {
      onResize.onThrottled(this.setResponsiveFlags);
    },
    removeResizeEvents() {
      onResize.offThrottled(this.setResponsiveFlags);
    },
  },
  render() {
    if (typeof this.$scopedSlots.default === 'undefined') {
      return null;
    }

    return this.$scopedSlots.default({
      matches: this.matches,
      indeterminate: this.indeterminate,
    });
  },
};
</script>
