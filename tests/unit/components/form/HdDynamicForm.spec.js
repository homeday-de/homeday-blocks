import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdDynamicForm from '@/components/form/HdDynamicForm.vue';
import LOGIN_FORM from '@/stories/mocks/forms/LOGIN';

const LINE_SELECTOR = '.dynamicForm__line';
const ITEM_SELECTOR = '.dynamicForm__line__item';
const SUBMIT_SELECTOR = '.dynamicForm__submit';

const wrapperBuilder = wrapperFactoryBuilder(HdDynamicForm, {
  props: {
    items: LOGIN_FORM,
    submitLabel: 'submit',
  },
});

describe('HdDynamicForm', () => {
  it('renders all the items', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.findAll(LINE_SELECTOR).length).toBe(LOGIN_FORM.length);
  });

  it('does not render submit button when `submitLabel` is empty', () => {
    const wrapper = wrapperBuilder({
      props: {
        submitLabel: '',
      },
    });

    expect(wrapper.find(SUBMIT_SELECTOR).exists()).toBe(false);
  });

  it('does not render sumit button when `submitLabel` is missing', () => {
    const wrapper = wrapperBuilder({
      props: {
        submitLabel: undefined,
      },
    });

    expect(wrapper.find(SUBMIT_SELECTOR).exists()).toBe(false);
  });

  it('renders nested components', () => {
    const wrapper = wrapperBuilder({
      props: {
        items: [
          [
            {
              type: 'input',
              name: 'input1',
            },
            {
              type: 'input',
              name: 'input2',
            },
          ],
        ],
      },
    });

    expect(wrapper.find(LINE_SELECTOR).findAll(ITEM_SELECTOR).length).toBe(2);
  });

  it('sets the initial values', () => {
    const wrapper = wrapperBuilder();
    const formData = LOGIN_FORM.reduce((data, { name, initialValue }) => ({
      ...data,
      [name]: initialValue,
    }), {});

    expect(wrapper.vm.formData).toEqual(formData);
  });

  it('emits the right payload on input', async () => {
    const wrapper = wrapperBuilder();
    const TEST_VALUE = 'test value';
    const TEST_INPUT_NAME = LOGIN_FORM[0].name;

    wrapper.get(`[name=${TEST_INPUT_NAME}]`).setValue(TEST_VALUE);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')[0][0][TEST_INPUT_NAME]).toBe(TEST_VALUE);
  });

  describe('the submit event', () => {
    it('invalid form', () => {
      const wrapper = wrapperBuilder();

      wrapper.find('form').trigger('submit');
      const payload = wrapper.emitted('submit')[0][0];

      expect(payload.isValid).toBe(false);
      expect(payload.invalidFields.length).toBe(1);
    });

    it('valid form', async () => {
      const wrapper = wrapperBuilder();
      const TEST_VALUE = 'test value';
      const TEST_INPUT_NAME = LOGIN_FORM[1].name;
      wrapper.find(`[name=${TEST_INPUT_NAME}]`).setValue(TEST_VALUE);

      await wrapper.vm.$nextTick();

      wrapper.find('form').trigger('submit');
      const payload = wrapper.emitted('submit')[0][0];

      expect(payload.isValid).toBe(true);
      expect(payload.invalidFields.length).toBe(0);
      expect(payload.data).toEqual({
        [LOGIN_FORM[0].name]: LOGIN_FORM[0].initialValue,
        [LOGIN_FORM[1].name]: TEST_VALUE,
      });
    });
  });

  it('renders slots', () => {
    const wrapper = wrapperBuilder({
      slots: {
        before: '<div>The before slot</div>',
        'before-button': '<div>The before button slot</div>',
        after: '<div>The after slot</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('validates the form when `validate` is called', async () => {
    const TEST_NAME = 'test';
    const wrapper = wrapperBuilder({
      props: {
        items: [{
          type: 'input',
          name: TEST_NAME,
          props: {
            required: true,
          },
        }],
      },
    });

    expect(wrapper.vm.validate()).toBe(false);

    wrapper.find(`[name=${TEST_NAME}]`).setValue('foo');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.validate()).toBe(true);
  });
});
