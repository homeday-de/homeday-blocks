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

      Object.entries(breakpoints).forEach(([key, value]) => {
        this.listeners[key] = window.matchMedia(value);
        this.matches[key] = this.listeners[key].matches;
        try {
          this.listeners[key].addEventListener('change', (e) => {
            this.updateMatch(key, e.matches);
          });
        } catch (error) {
          this.listeners[key].addListener((e) => {
            this.updateMatch(key, e.matches);
          });
        }
      });
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
