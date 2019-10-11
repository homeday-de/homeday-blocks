import onResize from 'hd-blocks/services/on-resize';

let breakpoints = {};
const matchMediaAvailable = (
  typeof window !== 'undefined'
  && typeof window.matchMedia === 'function'
);

export const mediaMatches = (breakpoint, {
  matchMedia = matchMediaAvailable ? window.matchMedia : () => false,
} = {}) => {
  if (typeof breakpoints[breakpoint] === 'undefined') {
    // Breakpoint not defined, we treat it as a media query string
    return matchMedia(breakpoint).matches;
  }

  return matchMedia(breakpoints[breakpoint]).matches;
};

export const setBreakpoints = (newBreakpoints) => {
  breakpoints = newBreakpoints;
};

export const getBreakpoints = () => breakpoints;

export const Responsive = {
  name: 'Responsive',
  data() {
    return {
      matches: {},
      indeterminate: !matchMediaAvailable,
    };
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
