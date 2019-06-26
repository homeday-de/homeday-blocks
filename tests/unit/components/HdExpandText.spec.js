import { mount } from '@vue/test-utils';
import HdExpandText from '@/components/HdExpandText.vue';

const originalMatchMedia = global.matchMedia;

describe('HdExpandText', () => {
  let wrapper;
  let matchMediaSpy;
  let scrollHeightSpy = jest.fn();

  beforeEach(() => {
    matchMediaSpy = jest.fn(() => ({
      matches: false,
    }));

    global.matchMedia = matchMediaSpy;

    wrapper = mount(HdExpandText, {
      slots: {
        default: `<p>Look, just because I don't be givin' no man a foot 
          massage don't make it right for Marsellus to throw Antwone into
          a glass Muttafu' house, frickin' up the way the talks. 
          Muttafu do that shirt to me, he better paralyze my lol, 'cause 
          I'll kill the Muttafu, know what I'm sayin'?</p>`,
      },
    });
  });

  afterEach(() => {
    matchMediaSpy.mockReset();
    global.matchMedia = originalMatchMedia;
    scrollHeightSpy.mockRestore();
  });

  it('renders the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('display partial content', () => {
    scrollHeightSpy = jest.spyOn(wrapper.vm, 'getScrollHeight')
      .mockImplementation((el) => {
        if (el === wrapper.vm.$refs.sample) return 32;

        if (el === wrapper.vm.$refs.wrapper) return 5000;

        return 0;
      });

    wrapper.vm.resizeWrapper();

    expect(wrapper.vm.isToggleVisible).toBe(true);
  });

  it('display the full content with no toggle', () => {
    scrollHeightSpy = jest.spyOn(wrapper.vm, 'getScrollHeight')
      .mockImplementation((el) => {
        if (el === wrapper.vm.$refs.sample) return 1000;

        if (el === wrapper.vm.$refs.wrapper) return 100;

        return 0;
      });

    wrapper.vm.resizeWrapper();

    expect(wrapper.vm.isToggleVisible).toBe(false);
  });

  it('the content is expandable and shrinkable', () => {
    scrollHeightSpy = jest.spyOn(wrapper.vm, 'getScrollHeight')
      .mockImplementation((el) => {
        if (el === wrapper.vm.$refs.sample) return 32;

        if (el === wrapper.vm.$refs.wrapper) return 5000;

        return 0;
      });

    wrapper.vm.resizeWrapper();
    expect(wrapper.vm.isExpanded).toBe(false);

    wrapper.find('.expand-text__toggle').trigger('click');
    expect(wrapper.vm.isExpanded).toBe(true);

    wrapper.find('.expand-text__toggle').trigger('click');
    expect(wrapper.vm.isExpanded).toBe(false);
  });

  it('In the default state, it displays the desidered amount of lines. The vertical margins are considered', () => {
    const marginTop = 72;
    const marginBottom = 61;
    const sampleHeight = 32;
    const lineCount = 3;
    wrapper.setProps({
      lines: lineCount,
      marginTop,
      marginBottom,
    });

    scrollHeightSpy = jest.spyOn(wrapper.vm, 'getScrollHeight')
      .mockImplementation((el) => {
        if (el === wrapper.vm.$refs.sample) return sampleHeight;

        return 0;
      });

    wrapper.vm.resizeWrapper();

    expect(wrapper.vm.$refs.wrapper.style.maxHeight).toBe(`${(sampleHeight * lineCount) + marginTop}px`);
  });
});
