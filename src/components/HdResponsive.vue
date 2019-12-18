<script>
import onResize from 'hd-blocks/services/on-resize';
import {
  matchMediaAvailable,
  mediaMatches,
  getBreakpoints,
} from 'hd-blocks/services/breakpoints';

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
    return this.$scopedSlots.default({
      matches: this.matches,
      indeterminate: this.indeterminate,
    });
  },
};
</script>
