import { mount } from '@vue/test-utils';
import HdCheckbox from '@/components/form/HdCheckbox.vue';
import { getMessages } from 'hd-blocks/lang';

describe('HdCheckbox', () => {
  let wrapper;
  const activeClass = 'checkbox--active';
  const usingMouseClass = 'isUsingMouse';
  const errorClass = 'hasError';

  beforeEach(() => {
    wrapper = mount(HdCheckbox, {
      propsData: {
        name: 'Test checkbox',
      },
    });
  });

  test('focus out (blur) the input element, fires the validation method and sets the proper style', () => {
    const mockedValidate = jest.fn();
    wrapper.setMethods({ validate: mockedValidate });
    const checkboxInner = wrapper.find('.checkbox__inner');
    checkboxInner.trigger('blur');

    expect(mockedValidate).toHaveBeenCalledTimes(1);
    expect(wrapper.classes()).not.toContain(activeClass);
  });

  test('the input is properly validated and styled', () => {
    wrapper.setProps({
      required: true,
      value: false,
    });

    const checkboxInner = wrapper.find('.checkbox__inner');
    checkboxInner.trigger('blur');

    expect(wrapper.vm.error).toBe(getMessages('de').FORM.VALIDATION.REQUIRED);
    expect(wrapper.classes()).toContain(errorClass);

    wrapper.setProps({
      value: true,
    });
    checkboxInner.trigger('blur');

    expect(wrapper.vm.error).toBe(null);
    expect(wrapper.classes()).not.toContain(errorClass);
  });

  test('focus on the input element, sets the proper style', () => {
    const checkboxInner = wrapper.find('.checkbox__inner');
    checkboxInner.trigger('focus');

    expect(wrapper.classes()).toContain(activeClass);
  });

  test('mouse usage is detected on keydown', () => {
    wrapper.trigger('keydown');

    expect(wrapper.classes()).not.toContain(usingMouseClass);
  });

  test('mouse usage is detected on mousedown', () => {
    wrapper.trigger('mousedown');

    expect(wrapper.classes()).toContain(usingMouseClass);
  });
});
