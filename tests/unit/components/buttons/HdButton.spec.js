import { shallowMount } from '@vue/test-utils';
import { TYPES } from 'hd-blocks/components/buttons/TYPES';
import HdButton from '@/components/buttons/HdButton.vue';

describe('HdButton', () => {
  let wrapper;

  beforeEach(() => {
    const text = 'label';

    wrapper = shallowMount(HdButton, {
      propsData: {
        text,
      },
    });
  });

  it('should render component with `btn` class', () => {
    expect(wrapper.classes()).toContain('btn');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with `btn--primary` class', () => {
    const modifier = TYPES.PRIMARY;
    const className = `btn--${modifier}`;

    wrapper.setProps({
      modifier,
    });

    expect(wrapper.classes()).toContain(className);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with `btn--secondary` class', () => {
    const modifier = TYPES.SECONDARY;
    const className = `btn--${modifier}`;

    wrapper.setProps({
      modifier,
    });

    expect(wrapper.classes()).toContain(className);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with `btn--tertiary` class', () => {
    const modifier = TYPES.TERTIARY;
    const className = `btn--${modifier}`;

    wrapper.setProps({
      modifier,
    });

    expect(wrapper.classes()).toContain(className);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with `btn--flat` class', () => {
    const modifier = TYPES.FLAT;
    const className = `btn--${modifier}`;

    wrapper.setProps({
      modifier,
    });

    expect(wrapper.classes()).toContain(className);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with `btn--ghost` class', () => {
    const modifier = TYPES.GHOST;
    const className = `btn--${modifier}`;

    wrapper.setProps({
      modifier,
    });

    expect(wrapper.classes()).toContain(className);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
