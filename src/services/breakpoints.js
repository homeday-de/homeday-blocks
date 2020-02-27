import sassVariables from 'homeday-blocks/src/styles/variablesForJS.scss';

let breakpoints = {
  mobile: `(max-width: ${sassVariables.breakMobile - 1}px)`,
  tablet: `(min-width: ${sassVariables.breakMobile}px)`,
  desktop: `(min-width: ${sassVariables.breakTablet}px)`,
  desktopWide: `(min-width: ${sassVariables.breakDesktop}px)`,
  desktopExtraWide: `(min-width: ${sassVariables.breakDesktopWide}px)`,
};

export const matchMediaAvailable = window && typeof window.matchMedia === 'function';

const defaultMatchMedia = matchMediaAvailable ? window.matchMedia : () => false;

export function mediaMatches(
  breakpoint,
  { matchMedia = defaultMatchMedia } = {},
) {
  if (typeof breakpoints[breakpoint] === 'undefined') {
    // Breakpoint not defined, we treat it as a media query string
    return matchMedia(breakpoint).matches;
  }

  return matchMedia(breakpoints[breakpoint]).matches;
}

export function setBreakpoints(newBreakpoints) {
  breakpoints = newBreakpoints;
}

export function getBreakpoints() {
  return breakpoints;
}

export default {
  matchMediaAvailable,
  mediaMatches,
  setBreakpoints,
  getBreakpoints,
};
