import { mount } from '@vue/test-utils';
import { setBreakpoints } from '@/services/breakpoints';
import HdResponsive from '@/components/HdResponsive.vue';

const BREAKPOINTS = {
  s: '(max-width:599px)',
  m: '(min-width:600px)',
  l: '(min-width:900px)',
  xl: '(min-width:1200px)',
};

describe('HdResponsive', () => {
  let wrapper;

  afterEach(() => {
    // We reset the breakpoints after each test
    setBreakpoints({});
  });

  it('renders no markup', () => {
    wrapper = mount(HdResponsive);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('provides "matches" object as part of a scoped slot', () => {
    setBreakpoints(BREAKPOINTS);
    wrapper = mount(HdResponsive, {
      scopedSlots: {
        default: '<div>{{Object.keys(props.matches)}}</div>',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('provides "indeterminate" flag as part of a scoped slot', () => {
    setBreakpoints(BREAKPOINTS);
    wrapper = mount(HdResponsive, {
      scopedSlots: {
        default: '<div>{{props.indeterminate}}</div>',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
