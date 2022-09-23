import { setBreakpoints, getBreakpoints } from '@/services/breakpoints';

const BREAKPOINTS = {
  s: '(max-width:599px)',
  m: '(min-width:600px)',
  l: '(min-width:900px)',
  xl: '(min-width:1200px)',
};

describe('Breakpoints service', () => {
  afterEach(() => {
    // We reset the breakpoints after each test
    setBreakpoints({});
  });

  it('can set the breakpoints', () => {
    setBreakpoints(BREAKPOINTS);
    expect(getBreakpoints()).toBe(BREAKPOINTS);
  });
});
