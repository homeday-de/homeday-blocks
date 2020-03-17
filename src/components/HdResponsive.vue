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
      this.setListeners();
    },
  },
  created() {
    this.setListeners();
  },
  methods: {
    /* istanbul ignore next */
    updateMatch(key, value) {
      this.matches[key] = value;
      this.$forceUpdate();
    },
    setListeners() {
      this.listeners = {};

      const breakpoints = {
        ...getBreakpoints(),
        ...this.breakpoints,
      };

      Object.entries(breakpoints).forEach(([key, value]) => {
        this.listeners[key] = window.matchMedia(value);
        this.matches[key] = this.listeners[key].matches;
        try {
          /* istanbul ignore next */
          this.listeners[key].addEventListener('change', (e) => {
            this.updateMatch(key, e.matches);
          });
        } catch (error) {
          /* istanbul ignore next */
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
