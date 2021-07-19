// @ts-check

import { mount } from '@vue/test-utils';
import deepmerge from 'deepmerge';
import { HdCheckboxCard } from 'homeday-blocks/main';
import { getMessages } from 'homeday-blocks/src/lang';

describe('HdCheckboxCard', () => {
  const build = (overrideProps = {}, overrideSlots = {}) => {
    const propsData = deepmerge({ name: 'property', nativeValue: 'house' }, overrideProps);

    const slots = deepmerge({
      default: ['House'],
      icon: ['<HdIcon src="house-icon" />'],
    }, overrideSlots);

    const view = mount(HdCheckboxCard, {
      propsData,
      slots,
      stubs: {
        HdIcon: true,
      },
    });

    return {
      view,
      input: () => view.find('input[type="checkbox"]'),
      label: () => view.find('label'),
      error: () => view.find('.error'),
      /** @returns {import('homeday-blocks/src/lang').Messages} */
      t: (lang = 'de') => getMessages(lang),
    };
  };

  it('renders correctly', () => {
    const { view } = build();
    expect(view.html()).toMatchSnapshot();
  });

  it('displays a disabled checkbox', async () => {
    const { view, input } = build({ disabled: true });

    await input().setChecked();

    expect(input().element).toBeDisabled();
    expect(view.emitted().input).toBeFalsy();
  });

  it('displays a checkbox with a checked state', () => {
    const { input } = build({ nativeValue: 'house', value: ['house'] });
    expect(input().element).toBeChecked();
  });

  it('displays a checkbox with an unchecked state', () => {
    const { input } = build({ nativeValue: 'house', value: ['apartment'] });
    expect(input().element).not.toBeChecked();
  });

  it('displays validation error when input is required', async () => {
    const { view, error, t } = build({ required: true });

    expect(error().exists()).toBeFalsy();

    await view.setProps({
      value: null,
    });

    expect(error().exists()).toBeTruthy();
    expect(error().text()).toContain(t().FORM.VALIDATION.SELECT_ONE_OPTION);
  });

  it('displays validation error for custom validation rules', async () => {
    const customRules = [
      {
        validate: (value) => value.length > 1,
        errorMessage: 'Value must be greater than 1',
      },
      {
        validate: (value) => value.length < 3,
        errorMessage: 'Value must be less than 3',
      },
    ];
    const { view, error } = build({ customRules });

    expect(error().exists()).toBeFalsy();

    await view.setProps({
      value: 'a',
    });

    expect(error().exists()).toBeTruthy();
    expect(error().text()).toContain(customRules[0].errorMessage);

    await view.setProps({
      value: 'abc',
    });

    expect(error().exists()).toBeTruthy();
    expect(error().text()).toContain(customRules[1].errorMessage);
  });

  describe('emits input event', () => {
    it('when input is checked', async () => {
      const { view, input } = build();

      await input().setChecked();

      expect(view.emitted().input).toBeTruthy();
      expect(view.emitted().input).toHaveLength(1);
    });

    it('when user press space in label', async () => {
      const { view, label } = build();

      await label().trigger('keydown.space');

      expect(view.emitted().input).toBeTruthy();
      expect(view.emitted().input).toHaveLength(1);
    });

    it('for custom true-value', async () => {
      const { view, input } = build({ nativeValue: null, trueValue: 'on' });

      await input().setChecked();

      expect(view.emitted().input).toBeTruthy();
      expect(view.emitted().input).toHaveLength(1);
      expect(view.emitted().input).toEqual([['on']]);
    });

    it('for custom false-value', async () => {
      const { view, input } = build({
        nativeValue: null, value: 'on', trueValue: 'on', falseValue: 'off',
      });

      await input().setChecked(false);

      expect(view.emitted().input).toBeTruthy();
      expect(view.emitted().input).toHaveLength(1);
      expect(view.emitted().input).toEqual([['off']]);
    });
  });
});
