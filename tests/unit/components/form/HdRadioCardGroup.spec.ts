// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';
import deepmerge from 'deepmerge';
import HdRadioCardGroup from 'homeday-blocks/src/components/form/HdRadioCardGroup.vue';
import HdRadioCard from 'homeday-blocks/src/components/form/HdRadioCard.vue';
import { getMessages, Language } from 'homeday-blocks/src/lang';

describe('HdRadioCardGroup', () => {
  const build = (overrideProps = {}, overrideSlots = {}) => {
    const propsData = deepmerge({ name: 'property', value: 'house' }, overrideProps);

    const slots = {
      default: [`
        <HdRadioCard native-value="apartment">
          <template #icon>
            <HdIcon src="apartmentCommercialIcon" />
          </template>

          Apartment
        </HdRadioCard>

        <HdRadioCard native-value="castle">
          <template #icon>
            <HdIcon src="houseCastleIcon" />
          </template>

          Castle
        </HdRadioCard>

        <HdRadioCard native-value="space">
          <template #icon>
            <HdIcon src="rocketIcon" />
          </template>

          Space
        </HdRadioCard>
        `],
      ...overrideSlots,
    };

    const view = mount(HdRadioCardGroup, {
      propsData,
      slots,
      stubs: {
        HdIcon: true,
        HdRadioCard,
      },
    });

    return {
      view,
      inputs: () => view.findAll('input[type="radio"]'),
      inputChecked: () => view.find('input[type="radio"]:checked'),
      labels: () => view.findAll('label'),
      error: () => view.find('.radio-group__error'),
      t: (lang: Language = 'de') => getMessages(lang),
    };
  };

  it('renders correctly', () => {
    const { view } = build();
    expect(view.html()).toMatchSnapshot();
  });

  it('renders only radio cards', () => {
    const slots = {
      default: [`
      <HdRadioCard native-value="apartment">
        <template #icon>
          <HdIcon src="apartmentCommercialIcon" />
        </template>

        Apartment
      </HdRadioCard>

      <h1>This element should not appear</h1>
      `],
    };
    const { view, inputs } = build({}, slots);

    expect(inputs()).toHaveLength(1);
    expect(view.find('h1').exists()).toBeFalsy();
  });

  it('displays disabled radios', async () => {
    const { view, inputs } = build({ disabled: true });

    await inputs().at(0).setChecked();

    inputs().wrappers.forEach((input) => expect(input.element).toBeDisabled());
    expect(view.emitted().input).toBeFalsy();
  });

  it('displays a radio with a checked state', () => {
    const { inputChecked } = build({ value: 'apartment' });
    expect(inputChecked().element).toBeChecked();
  });

  it('displays a radio with an unchecked state', () => {
    const { inputs } = build({ value: 'anotherValue' });

    inputs().wrappers.forEach((input) => expect(input.element).not.toBeChecked());
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
        validate: (value: string) => value.length > 1,
        errorMessage: 'Value must be greater than 1',
      },
      {
        validate: (value: string) => value.length < 3,
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

  describe('emits input event when', () => {
    it('input is checked', async () => {
      const { view, inputs } = build({ value: 'house' });

      await inputs().at(1).trigger('input');

      expect(view.emitted().input).toBeTruthy();
      expect(view.emitted().input).toHaveLength(1);
    });

    it('user press space in label', async () => {
      const { view, labels } = build();

      await labels().at(1).trigger('keydown.space');

      expect(view.emitted().input).toBeTruthy();
      expect(view.emitted().input).toHaveLength(1);
    });
  });
});
