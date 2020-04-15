import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import { getMessages } from '@/lang';
import HdCheckbox from '@/components/form/HdCheckbox.vue';

const activeClass = 'checkbox--active';
const usingMouseClass = 'isUsingMouse';
const errorClass = 'hasError';

const wrapperBuilder = wrapperFactoryBuilder(HdCheckbox, {
  props: {
    name: 'Test checkbox',
  },
});

describe('HdCheckbox', () => {
  it('renders component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Accepts <html> code as innerLabel', () => {
    const innerLabelHtml = 'Hello <b>World!</b>';
    const innerLabelParsed = 'Hello World!';
    const wrapper = wrapperBuilder({
      props: {
        innerLabel: innerLabelHtml,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('.checkbox__inner__label').text()).toBe(innerLabelParsed);
  });

  it('At blur, the validation method is fired and the input element is not styled as active', () => {
    const mockedValidate = jest.fn();
    const wrapper = wrapperBuilder({
      methods: {
        validate: mockedValidate,
      },
    });
    const checkboxInner = wrapper.get('.checkbox__inner');

    checkboxInner.trigger('blur');

    expect(mockedValidate).toHaveBeenCalledTimes(1);
    expect(wrapper.classes()).not.toContain(activeClass);
  });

  it('At blur, the input is styled as error if not valid, not as error if is valid. The proper error message is also displayed', async () => {
    const wrapper = wrapperBuilder({
      props: {
        required: true,
        value: false,
      },
    });
    const checkboxInner = wrapper.get('.checkbox__inner');

    checkboxInner.trigger('blur');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.error).toBe(getMessages('de').FORM.VALIDATION.REQUIRED);
    expect(wrapper.classes()).toContain(errorClass);

    wrapper.setProps({
      value: true,
    });
    checkboxInner.trigger('blur');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.error).toBe(null);
    expect(wrapper.classes()).not.toContain(errorClass);
  });

  it('At focus, the input element is styled as active', async () => {
    const wrapper = wrapperBuilder();
    const checkboxInner = wrapper.get('.checkbox__inner');

    checkboxInner.trigger('focus');

    await wrapper.vm.$nextTick();

    expect(wrapper.classes()).toContain(activeClass);
  });

  it('On user input interaction, the proper kind of input device is detected', async () => {
    const wrapper = wrapperBuilder();

    wrapper.trigger('mousedown');

    await wrapper.vm.$nextTick();

    expect(wrapper.classes()).toContain(usingMouseClass);

    wrapper.trigger('keydown');

    await wrapper.vm.$nextTick();

    expect(wrapper.classes()).not.toContain(usingMouseClass);
  });

  it('A click on the checkboxes, emits the input event with the proper value and validates it right after', async () => {
    const value = true;
    const mockedValidate = jest.fn();
    const wrapper = wrapperBuilder({
      props: {
        value,
      },
      methods: {
        validate: mockedValidate,
      },
    });
    const checkboxInner = wrapper.get('.checkbox__inner');

    checkboxInner.trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toBeTruthy();

    const payload = wrapper.emitted('input')[0][0];
    expect(payload).toBe(!value);

    expect(mockedValidate).toHaveBeenCalledTimes(1);
  });

  it('Supports disabling of the input', () => {
    const wrapper = wrapperBuilder({
      props: {
        disabled: true,
      },
    });

    expect(wrapper.find('input').attributes().disabled).toBe('disabled');
  });
});
