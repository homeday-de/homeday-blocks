import { mount, createLocalVue } from '@vue/test-utils';
import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import { getMessages } from '@/lang';
import HdCheckbox from '@/components/form/HdCheckbox.vue';

const checkboxClass = 'checkbox';
const checkboxInnerSelector = '.checkbox__inner';
const checkboxLabelSelector = '.field__label';
const activeClass = 'checkbox--active';
const usingMouseClass = 'checkout--use-mouse';
const errorClass = 'field--errored';
const indeterminateClass = 'checkbox--indeterminate';

const wrapperBuilder = wrapperFactoryBuilder(HdCheckbox, {
  props: {
    name: 'Test checkbox',
  },
  attachToDocument: true,
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
    expect(wrapper.find('.checkbox__description').text()).toBe(innerLabelParsed);
  });

  it('At blur, the validation method is fired and the input element is not styled as active', () => {
    const mockedValidate = jest.fn();
    const wrapper = wrapperBuilder({
      methods: {
        validate: mockedValidate,
      },
    });
    const checkboxInner = wrapper.get(checkboxInnerSelector);

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
    const checkboxInner = wrapper.get(checkboxInnerSelector);

    checkboxInner.trigger('blur');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.error).toBe(getMessages('de').FORM.VALIDATION.REQUIRED);
    expect(wrapper.classes()).toContain(errorClass);

    await wrapper.setProps({
      value: true,
    });
    await checkboxInner.trigger('blur');

    expect(wrapper.vm.error).toBe(null);
    expect(wrapper.classes()).not.toContain(errorClass);
  });

  it('At focus, the input element is styled as active', async () => {
    const wrapper = wrapperBuilder();
    const checkboxInner = wrapper.get(checkboxInnerSelector);

    checkboxInner.trigger('focus');

    await wrapper.vm.$nextTick();

    expect(wrapper.get(`.${checkboxClass}`).classes()).toContain(activeClass);
  });

  it('On user input interaction, the proper kind of input device is detected', async () => {
    const wrapper = wrapperBuilder();

    wrapper.get(`.${checkboxClass}`).trigger('mousedown');

    await wrapper.vm.$nextTick();

    expect(wrapper.get(`.${usingMouseClass}`).classes()).toContain(usingMouseClass);

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
    const checkboxInner = wrapper.get(checkboxInnerSelector);

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

  it('Supports indeterminate state', () => {
    const wrapper = wrapperBuilder({
      props: {
        indeterminate: true,
      },
    });
    expect(wrapper.get(`.${checkboxClass}`).classes()).toContain(indeterminateClass);
  });

  it('Populate aria-labelledby with id generated on label', async () => {
    const wrapper = wrapperBuilder({
      props: {
        name: 'testLabel',
        label: 'Test',
      },
    });
    const computedLabelId = wrapper.vm.$children[0].labelId;
    const labelIdAttribute = wrapper.get(checkboxLabelSelector).attributes('id');
    const ariaLabelledBy = wrapper.get(checkboxInnerSelector).attributes('aria-labelledby');
    expect(labelIdAttribute).toContain(computedLabelId);
    expect(ariaLabelledBy).toContain(labelIdAttribute);
  });

  it('At toggle, focus should only trigger if element is available', async () => {
    const errorHandler = jest.fn().mockImplementation(() => ({}));
    const localVue = createLocalVue({
      errorHandler,
    });

    const myComponent = {
      components: { HdCheckbox },
      data: () => ({
        isChecked: true,
      }),
      template: '<HdCheckbox v-if="isChecked" v-model="isChecked" name="myCheckbox" />',
    };
    const wrapper = mount(myComponent, { localVue });
    const checkbox = wrapper.find(checkboxInnerSelector);

    checkbox.trigger('click');
    await wrapper.vm.$nextTick();

    expect(errorHandler).not.toHaveBeenCalled();
  });
});
