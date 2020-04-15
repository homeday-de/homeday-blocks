import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdArrowButton from '@/components/buttons/HdArrowButton.vue';

const wrapperBuilder = wrapperFactoryBuilder(HdArrowButton);

describe('HdArrowButton', () => {
  it('renders component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('direction class based on direction prop', async () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.classes()).toContain('arrowButton--right');

    wrapper.setProps({ direction: 'left' });

    await wrapper.vm.$nextTick();

    expect(wrapper.classes()).toContain('arrowButton--left');
  });

  // FIXME: https://bugzilla.mozilla.org/show_bug.cgi?id=654072
  it("<button> has autocomplete='off' attribute", () => {
    const wrapper = wrapperBuilder();
    const button = wrapper.get('button');
    const { autocomplete } = button.attributes();

    expect(autocomplete).toBe('off');
  });
});
