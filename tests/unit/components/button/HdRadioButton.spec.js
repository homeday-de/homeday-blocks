import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import HdRadioButton from '@/components/buttons/HdRadioButton.vue';

Vue.use(HdRadioButton);

describe('HdRadioButton', () => {
  let wrapper;
  const mockedSelect = jest.fn();
  HdRadioButton.methods.select = mockedSelect;

  const name = 'lorem';
  const value = 'ipsum';
  const label = 'dolor';

  beforeEach(() => {
    wrapper = shallowMount(HdRadioButton, {
      propsData: { name, value, label },
    });
  });

  test('the component is rendered', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('on change, the proper method is invoked', () => {
    const input = wrapper.find('input');

    expect(input.attributes().name).toBe(name);
    expect(input.attributes().value).toBe(value);

    expect(wrapper.find('label').text()).toBe(label);

    input.trigger('change');
    expect(mockedSelect).toHaveBeenCalled();
  });
});
