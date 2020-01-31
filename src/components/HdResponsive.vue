<script>
import {
  matchMediaAvailable,
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
      listeners: {},
    };
  },
  watch: {
    breakpoints() {
      this.setResponsiveFlags();
    },
  },
  beforeMount() {
    this.setResponsiveFlags();
  },
  created() {
    this.setResponsiveFlags();
  },
  methods: {
    updateMatch(key, value) {
      this.matches[key] = value;
      this.$forceUpdate();
    },
    setResponsiveFlags() {
      this.listeners = {};

      const breakpoints = {
        ...getBreakpoints(),
        ...this.breakpoints,
      };

      for (const breakpointKey in breakpoints) {
        this.listeners[breakpointKey] = window.matchMedia(breakpoints[breakpointKey]);
        this.matches[breakpointKey] = this.listeners[breakpointKey].matches;
        try {
          this.listeners[breakpointKey].addEventListener('change', (e) => {
            this.updateMatch(breakpointKey, e.matches);
          });
        } catch (error) {
          this.listeners[breakpointKey].addListener((e) => {
            this.updateMatch(breakpointKey, e.matches);
          });
        }
      }
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
