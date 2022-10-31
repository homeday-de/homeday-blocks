import { mount, createLocalVue } from '@vue/test-utils';
import deepmerge from 'deepmerge';
import { getMessages } from '@/lang';
import HdCheckbox from '@/components/form/HdCheckbox.vue';

const activeClass = 'checkbox--active';
const usingMouseClass = 'checkout--use-mouse';
const errorClass = 'field--errored';
const indeterminateClass = 'checkbox--indeterminate';
const validateSpy = jest.spyOn(HdCheckbox.methods, 'validate');

describe('HdCheckbox', () => {
  const build = (overrideProps = {}) => {
    const propsData = deepmerge({ name: 'Test checkbox' }, overrideProps);

    const view = mount(HdCheckbox, {
      propsData,
      attachToDocument: true,
    });

    return {
      view,
      checkbox: () => view.find('.checkbox'),
      checkboxInner: () => view.find('.checkbox__inner'),
      checkboxLabel: () => view.find('.field__label'),
      t: (lang) => getMessages(lang),
    };
  };

  it('renders component', () => {
    const { view } = build();

    expect(view.html()).toMatchSnapshot();
  });

  it('Accepts <html> code as innerLabel', () => {
    const innerLabelHtml = 'Hello <b>World!</b>';
    const innerLabelParsed = 'Hello World!';
    const { view } = build({ innerLabel: innerLabelHtml });

    expect(view.html()).toMatchSnapshot();
    expect(view.find('.checkbox__description').text()).toBe(innerLabelParsed);
  });

  it('At blur, the validation method is fired and the input element is not styled as active', async () => {
    const { view, checkboxInner } = build();

    await checkboxInner().trigger('blur');

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(view.classes()).not.toContain(activeClass);
  });

  it('At blur, the input is styled as error if not valid, not as error if is valid. The proper error message is also displayed', async () => {
    const { view, checkboxInner, t } = build({ required: true });

    checkboxInner().trigger('blur');

    await view.vm.$nextTick();

    expect(view.vm.error).toBe(t().FORM.VALIDATION.REQUIRED);
    expect(view.classes()).toContain(errorClass);

    await view.setProps({
      value: true,
    });
    await checkboxInner().trigger('blur');

    expect(view.vm.error).toBe(null);
    expect(view.classes()).not.toContain(errorClass);
  });

  it('At focus, the input element is styled as active', async () => {
    const { view, checkbox, checkboxInner } = build();

    checkboxInner().trigger('focus');

    await view.vm.$nextTick();

    expect(checkbox().classes()).toContain(activeClass);
  });

  it('On user input interaction, the proper kind of input device is detected', async () => {
    const { view, checkbox } = build();

    checkbox().trigger('mousedown');

    await view.vm.$nextTick();

    expect(view.get(`.${usingMouseClass}`).classes()).toContain(usingMouseClass);

    view.trigger('keydown');

    await view.vm.$nextTick();

    expect(view.classes()).not.toContain(usingMouseClass);
  });

  it('A click on the checkboxes, emits the input event with the proper value and validates it right after', async () => {
    const { view, checkboxInner } = build({ value: true });

    checkboxInner().trigger('click');

    await view.vm.$nextTick();

    expect(view.emitted('input')).toBeTruthy();

    const payload = view.emitted('input')[0][0];
    expect(payload).toBe(false);

    expect(validateSpy).toHaveBeenCalled();
  });

  it('Supports disabling of the input', () => {
    const { view } = build({ disabled: true });

    expect(view.find('input').attributes().disabled).toBe('disabled');
  });

  it('Supports indeterminate state', () => {
    const { checkbox } = build({ indeterminate: true });

    expect(checkbox().classes()).toContain(indeterminateClass);
  });

  it('Populate aria-labelledby with id generated on label', async () => {
    const { view, checkboxInner, checkboxLabel } = build({ name: 'testLabel', label: 'Test' });

    const computedLabelId = view.vm.$children[0].labelId;
    const labelIdAttribute = checkboxLabel().attributes('id');
    const ariaLabelledBy = checkboxInner().attributes('aria-labelledby');
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
    const checkbox = wrapper.find('.checkbox__inner');

    checkbox.trigger('click');
    await wrapper.vm.$nextTick();

    expect(errorHandler).not.toHaveBeenCalled();
  });
});
