import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdButton, { TYPES } from '@/components/buttons/HdButton.vue';

const wrapperBuilder = wrapperFactoryBuilder(HdButton, {
  slots: {
    default: '<span>Button text</span>',
  },
});

describe('HdButton', () => {
  it('should render component with `btn` class', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.classes()).toContain('btn');
    expect(wrapper.html()).toMatchSnapshot();
  });

  Object.values(TYPES).filter(modifier => modifier).forEach((modifier) => {
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
