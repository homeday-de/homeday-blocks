import _merge from 'lodash/merge';
import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import InlineSvg from 'vue-inline-svg';
import HdIcon from '@/components/HdIcon.vue';

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

const wrapperBuilder = wrapperFactoryBuilder(HdIcon, {
  props: {
    src: 'fake/icon1.svg',
  },
  stubs: {
    InlineSvg: stubbedInlineSvg,
  },
});

describe('HdIcon', () => {
  it('renders as expected', async () => {
    const wrapper = wrapperBuilder();

    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('has an <svg> in the root', async () => {
    const wrapper = wrapperBuilder();

    await wrapper.vm.$nextTick();

    expect(wrapper.is('svg')).toBe(true);
  });

  it('sets the right fill based on `fillFromClass`', async () => {
    const TEST_CLASS = 'color1';
    const TEST_FILL = 'orange';
    const wrapper = wrapperBuilder({
      props: {
        src: 'fake/icon2.svg',
        fillFromClass: {
          [TEST_CLASS]: TEST_FILL,
        },
      },
    });

    await wrapper.vm.$nextTick();

    const targetedPaths = wrapper.findAll(`.${TEST_CLASS}`);

    expect(targetedPaths.length).toBeGreaterThan(0);
    expect(targetedPaths.is(`[fill="${TEST_FILL}"]`)).toBe(true);
  });

  it('sets the right class based on `classFromFill`', async () => {
    const TEST_FILL = '#1C3553';
    const TEST_CLASS = 'primary-color';
    const wrapper = wrapperBuilder({
      props: {
        src: 'fake/icon3.svg',
        classFromFill: {
          [TEST_FILL]: TEST_CLASS,
        },
      },
    });

    await wrapper.vm.$nextTick();

    const targetedPaths = wrapper.findAll(`[fill="${TEST_FILL}"]`);

    expect(targetedPaths.length).toBeGreaterThan(0);
    expect(targetedPaths.is(`.${TEST_CLASS}`)).toBe(true);
  });
});
