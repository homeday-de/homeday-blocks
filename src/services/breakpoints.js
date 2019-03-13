const BREAKPOINT_TABLET = '(min-width:768px)';
const BREAKPOINT_DESKTOP = '(min-width:1280px)';

let breakpoints = {
  tablet: BREAKPOINT_TABLET,
  desktop: BREAKPOINT_DESKTOP,
};

export const isMobile = () => !window.matchMedia(breakpoints.tablet).matches;
export const isDesktop = () => window.matchMedia(breakpoints.desktop).matches;
export const isTablet = () => !isDesktop() && window.matchMedia(breakpoints.tablet).matches;
export const setBreakpoints = (newBreakpoints) => {
  breakpoints = { ...breakpoints, ...newBreakpoints };
};

export default {
  isMobile,
  isTablet,
  isDesktop,
  setBreakpoints,
};
