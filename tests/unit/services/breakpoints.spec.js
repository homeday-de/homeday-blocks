import { mount } from '@vue/test-utils';
import {
  setBreakpoints,
  getBreakpoints,
  Responsive,
} from '@/services/breakpoints';

const BREAKPOINTS = {
  s: '(max-width:599px)',
  m: '(min-width:600px)',
  l: '(min-width:900px)',
  xl: '(min-width:1200px)',
};

describe('Breakpoints service', () => {
  let wrapper;

  afterEach(() => {
    // We reset the breakpoints after each test
    setBreakpoints({});
  });

  it('can set the breakpoints', () => {
    setBreakpoints(BREAKPOINTS);
    expect(getBreakpoints()).toBe(BREAKPOINTS);
  });

  describe('Responsive component', () => {
    it('renders no markup', () => {
      wrapper = mount(Responsive);
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('provides "matches" object as part of a scoped slot', () => {
      setBreakpoints(BREAKPOINTS);
      wrapper = mount(Responsive, {
        scopedSlots: {
          default: '<div>{{Object.keys(props.matches)}}</div>',
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('provides "indeterminate" flag as part of a scoped slot', () => {
      setBreakpoints(BREAKPOINTS);
      wrapper = mount(Responsive, {
        scopedSlots: {
          default: '<div>{{props.indeterminate}}</div>',
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
