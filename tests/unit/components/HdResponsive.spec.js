import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import { setBreakpoints } from '@/services/breakpoints';
import HdResponsive from '@/components/HdResponsive.vue';

const BREAKPOINTS = {
  s: '(max-width:599px)',
  m: '(min-width:600px)',
  l: '(min-width:900px)',
  xl: '(min-width:1200px)',
};

// https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const wrapperBuilder = wrapperFactoryBuilder(HdResponsive);

describe('HdResponsive', () => {
  afterEach(() => {
    // We reset the breakpoints after each test
    setBreakpoints({});
  });

  it('renders no markup', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('provides "matches" object as part of a scoped slot', () => {
    setBreakpoints(BREAKPOINTS);

    const wrapper = wrapperBuilder({
      scopedSlots: {
        default: '<div>{{Object.keys(props.matches)}}</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('provides "indeterminate" flag as part of a scoped slot', () => {
    setBreakpoints(BREAKPOINTS);

    const wrapper = wrapperBuilder({
      scopedSlots: {
        default: '<div>{{props.indeterminate}}</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('breakpoint changes are managed', () => {
    setBreakpoints(BREAKPOINTS);

    const mockedSetListeners = jest.fn();
    const wrapper = wrapperBuilder({
      scopedSlots: {
        default: `
          <div>I'm a Slot</div>
        `,
      },
      methods: {
        setListeners: mockedSetListeners,
      },
    });

    const modifiedBreakpoints = BREAKPOINTS;
    delete modifiedBreakpoints.s;

    wrapper.setProps({ breakpoints: modifiedBreakpoints });

    expect(mockedSetListeners).toHaveBeenCalled();
  });
});
