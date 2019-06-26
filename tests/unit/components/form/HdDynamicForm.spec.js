import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdDynamicForm from '@/components/form/HdDynamicForm.vue';
import LOGIN_FORM from '@/stories/mocks/forms/LOGIN';

const LINE_SELECTOR = '.dynamicForm__line';
const ITEM_SELECTOR = '.dynamicForm__line__item';
const SUBMIT_SELECTOR = '.dynamicForm__submit';

describe('HdDynamicForm', () => {
  const wrapperFactory = wrapperFactoryBuilder(HdDynamicForm,
    {
      propsData: {
        items: LOGIN_FORM,
        submitLabel: 'submit',
      },
    });

  let wrapper;
  beforeEach(() => {
    wrapper = wrapperFactory();
  });

  test('renders all the items', () => {
    expect(wrapper.findAll(LINE_SELECTOR).length).toBe(LOGIN_FORM.length);
  });

  test('does not render sumit button when `submitLabel` is empty', () => {
    wrapper = wrapperFactory({
      propsData: {
        submitLabel: '',
      },
    });

    expect(wrapper.find(SUBMIT_SELECTOR).exists()).toBe(false);
  });

  test('does not render sumit button when `submitLabel` is missing', () => {
    wrapper = wrapperFactory({
      propsData: {
        submitLabel: undefined,
      },
    });

    expect(wrapper.find(SUBMIT_SELECTOR).exists()).toBe(false);
  });

  test('renders nested components', () => {
    wrapper = wrapperFactory({
      propsData: {
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

  test('sets the initial values', () => {
    const formData = LOGIN_FORM.reduce((data, { name, initialValue }) => ({
      ...data,
      [name]: initialValue,
    }), {});

    expect(wrapper.vm.formData).toEqual(formData);
  });

  test('emits the right payload on input', () => {
    const TEST_VALUE = 'test value';
    const TEST_INPUT_NAME = LOGIN_FORM[0].name;
    wrapper.find(`[name=${TEST_INPUT_NAME}]`).setValue(TEST_VALUE);

    expect(wrapper.emitted('input')[0][0][TEST_INPUT_NAME]).toBe(TEST_VALUE);
  });

  describe('emits submit event', () => {
    test('invalid form', () => {
      wrapper.find('form').trigger('submit');
      const payload = wrapper.emitted('submit')[0][0];

      expect(payload.isValid).toBe(false);
      expect(payload.invalidFields.length).toBe(1);
    });

    test('valid form', () => {
      const TEST_VALUE = 'test value';
      const TEST_INPUT_NAME = LOGIN_FORM[1].name;
      wrapper.find(`[name=${TEST_INPUT_NAME}]`).setValue(TEST_VALUE);
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

  test('renders slots', () => {
    wrapper = wrapperFactory({
      propsData: {
        items: [{}],
      },
      slots: {
        before: '<div>The before slot</div>',
        'before-button': '<div>The before button slot</div>',
        after: '<div>The after slot</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
