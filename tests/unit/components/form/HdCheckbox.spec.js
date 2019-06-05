import { mount } from '@vue/test-utils';
import HdCheckbox from '@/components/form/HdCheckbox.vue';
import { getMessages } from 'hd-blocks/lang';
import Vue from 'vue';

describe('HdCheckbox', () => {
  let wrapper;
  let checkboxInner;
  const activeClass = 'checkbox--active';
  const usingMouseClass = 'isUsingMouse';
  const errorClass = 'hasError';

  beforeEach(() => {
    wrapper = mount(HdCheckbox, {
      propsData: {
        name: 'Test checkbox',
      },
    });

    checkboxInner = wrapper.find('.checkbox__inner');
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('At blur, the validation method is fired and the input element is not styled as active', () => {
    const mockedValidate = jest.fn();
    wrapper.setMethods({ validate: mockedValidate });
    checkboxInner.trigger('blur');

    expect(mockedValidate).toHaveBeenCalledTimes(1);
    expect(wrapper.classes()).not.toContain(activeClass);
  });

  test('At blur, the input is styled as error if not valid, not as error if is valid. The proper error message is also displayed', () => {
    wrapper.setProps({
      required: true,
      value: false,
    });

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

  test('At focus, the input element is styled as active', () => {
    checkboxInner.trigger('focus');

    expect(wrapper.classes()).toContain(activeClass);
  });

  test('On user input interaction, the proper kind of input device is detected', () => {
    wrapper.trigger('mousedown');
    expect(wrapper.classes()).toContain(usingMouseClass);

    wrapper.trigger('keydown');
    expect(wrapper.classes()).not.toContain(usingMouseClass);
  });

  test('A click on the checkboxes, emits the input event with the proper value and validates it right after', () => {
    const value = true;
    wrapper.setProps({ value });
    const mockedValidate = jest.fn();
    wrapper.setMethods({ validate: mockedValidate });

    checkboxInner.trigger('click');

    // that's why https://vue-test-utils.vuejs.org/guides/#what-about-nexttick
    return Vue.nextTick().then(() => {
      expect(wrapper.emitted('input')).toBeTruthy();

      const payload = wrapper.emitted('input')[0][0];
      expect(payload).toBe(!value);

      expect(mockedValidate).toHaveBeenCalledTimes(1);
    });
  });
});
