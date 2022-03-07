import _merge from 'lodash/merge';
import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import InlineSvg from 'vue-inline-svg';
import HdButton from '@/components/buttons/HdButton.vue';
import TYPES from '@/components/buttons/HdButtonTypes';

const ICON_BUTTON_CLASS = 'btn--icon-button';
const ICON_CONTENT = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="222 126 53 53" width="50" height="50">
  <path class="color1" d="M272.48 137.62L258.61 150.5L244.75 141.58L254.65 126.73L272.48 137.62Z" fill="#1895FF"/>
  <path class="color2" d="M242.22 176.24L222.97 160.68L230.47 145.1L243.56 155.68L242.22 176.24Z" fill="#1C3553"/>
</svg>`;

const stubbedInlineSvg = _merge(InlineSvg, {
  methods: {
    download() {
      const parser = new DOMParser();
      const result = parser.parseFromString(ICON_CONTENT, 'text/xml');
      const svgEl = result.querySelector('svg');
      return Promise.resolve(this.transformSource(svgEl));
    },
  },
});

const wrapperBuilder = wrapperFactoryBuilder(HdButton, {
  slots: {
    default: '<span>Button text</span>',
  },
  stubs: {
    InlineSvg: stubbedInlineSvg,
  },
});

describe('HdButton', () => {
  it('should render component with `btn` class', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.classes()).toContain('btn');
    expect(wrapper.html()).toMatchSnapshot();
  });

  Object.values(TYPES).filter((modifier) => modifier).forEach((modifier) => {
    it(`should render component with btn--${modifier} class`, () => {
      const className = `btn--${modifier}`;
      const wrapper = wrapperBuilder({
        props: {
          modifier,
        },
      });

      expect(wrapper.classes()).toContain(className);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  it('should render component with btn--dark-background class if prop isInDarkBackground is true', () => {
    const className = 'btn--dark-background';
    const wrapper = wrapperBuilder({
      props: {
        isInDarkBackground: true,
      },
    });

    expect(wrapper.classes()).toContain(className);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render the icon passed as prop', async () => {
    const wrapper = wrapperBuilder({
      props: {
        iconSrc: 'fake/icon.svg',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('svg').exists()).toBe(true);
    expect(wrapper.classes()).not.toContain(ICON_BUTTON_CLASS);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('can be used as an icon button', async () => {
    const wrapper = wrapperBuilder({
      props: {
        iconSrc: 'fake/icon.svg',
      },
      slots: {
        default: '',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.classes()).toContain(ICON_BUTTON_CLASS);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should forward listeners', () => {
    const click = jest.fn();
    const wrapper = wrapperBuilder({
      listeners: {
        click,
      },
    });

    wrapper.trigger('click');

    expect(click).toHaveBeenCalled();
  });
});
