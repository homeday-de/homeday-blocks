let breakpoints = {};

export const matchMediaAvailable = (
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

export default {
  matchMediaAvailable,
  mediaMatches,
  setBreakpoints,
  getBreakpoints,
};
