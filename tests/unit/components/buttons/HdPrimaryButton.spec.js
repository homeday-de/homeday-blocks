import { shallowMount } from '@vue/test-utils';
import HdPrimaryButton from '@/components/buttons/HdPrimaryButton.vue';

describe('HdLoaderButton', () => {
  let wrapper;

  beforeEach(() => {
    const label = 'label';

    wrapper = shallowMount(HdPrimaryButton, {
      propsData: {
        label,
      },
    });
  });

  test('the component is rendered with mandatory label', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('the button can be disabled', () => {
    wrapper.setProps({
      disabled: true,
    });

    expect(wrapper.element.disabled).toBe(true);
  });
});
