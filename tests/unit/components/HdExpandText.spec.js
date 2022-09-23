import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdExpandText from '@/components/HdExpandText.vue';

const originalMatchMedia = global.matchMedia;

const wrapperBuilder = wrapperFactoryBuilder(HdExpandText, {
  slots: {
    default: `<p>Look, just because I don't be givin' no man a foot
      massage don't make it right for Marsellus to throw Antwone into
      a glass Muttafu' house, frickin' up the way the talks.
      Muttafu do that shirt to me, he better paralyze my lol, 'cause
      I'll kill the Muttafu, know what I'm sayin'?</p>`,
  },
});

describe('HdExpandText', () => {
  let matchMediaSpy;
  let scrollHeightSpy = jest.fn();

  beforeEach(() => {
    matchMediaSpy = jest.fn(() => ({
      matches: false,
    }));

    global.matchMedia = matchMediaSpy;
  });

  afterEach(() => {
    matchMediaSpy.mockReset();
    global.matchMedia = originalMatchMedia;
    scrollHeightSpy.mockRestore();
  });

  it('renders the component', async () => {
    const wrapper = wrapperBuilder();

    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('display partial content', () => {
    const wrapper = wrapperBuilder();

    scrollHeightSpy = jest.spyOn(wrapper.vm, 'getScrollHeight').mockImplementation((el) => {
      if (el === wrapper.vm.$refs.sample) return 32;

      if (el === wrapper.vm.$refs.wrapper) return 5000;

      return 0;
    });

    wrapper.vm.resizeWrapper();

    expect(wrapper.vm.isToggleVisible).toBe(true);
  });

  it('display the full content with no toggle', () => {
    const wrapper = wrapperBuilder();

    scrollHeightSpy = jest.spyOn(wrapper.vm, 'getScrollHeight').mockImplementation((el) => {
      if (el === wrapper.vm.$refs.sample) return 1000;

      if (el === wrapper.vm.$refs.wrapper) return 100;

      return 0;
    });

    wrapper.vm.resizeWrapper();

    expect(wrapper.vm.isToggleVisible).toBe(false);
  });

  it('the content is expandable and shrinkable', async () => {
    const wrapper = wrapperBuilder();

    scrollHeightSpy = jest.spyOn(wrapper.vm, 'getScrollHeight').mockImplementation((el) => {
      if (el === wrapper.vm.$refs.sample) return 32;

      if (el === wrapper.vm.$refs.wrapper) return 5000;

      return 0;
    });

    wrapper.vm.resizeWrapper();
    expect(wrapper.vm.isExpanded).toBe(false);

    await wrapper.vm.$nextTick();

    wrapper.find('.expand-text__toggle').trigger('click');
    expect(wrapper.vm.isExpanded).toBe(true);

    wrapper.find('.expand-text__toggle').trigger('click');
    expect(wrapper.vm.isExpanded).toBe(false);
  });

  it('In the default state, it displays the desidered amount of lines. The vertical margins are considered', () => {
    const marginTop = 72;
    const marginBottom = 61;
    const sampleHeight = 32;
    const lines = 3;
    const wrapper = wrapperBuilder({
      props: {
        lines,
        marginTop,
        marginBottom,
      },
    });

    scrollHeightSpy = jest.spyOn(wrapper.vm, 'getScrollHeight').mockImplementation((el) => {
      if (el === wrapper.vm.$refs.sample) return sampleHeight;

      return 0;
    });

    wrapper.vm.resizeWrapper();

    expect(wrapper.vm.$refs.wrapper.style.maxHeight).toBe(`${sampleHeight * lines + marginTop}px`);
  });
});
