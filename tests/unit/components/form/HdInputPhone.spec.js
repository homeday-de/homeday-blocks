import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdInputPhone from '@/components/form/HdInputPhone.vue';

const wrapperBuilder = wrapperFactoryBuilder(HdInputPhone);

describe('HdInputPhone', () => {
  const build = (overrideProps = {}) => {
    const props = {
      ...overrideProps,
      name: 'phone-number',
    };

    const wrapper = wrapperBuilder({ props });

    return {
      wrapper,
    };
  };

  it('is rendered as expected', () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have the default country as selected', () => {
    const { wrapper } = build({
      defaultCountry: 'MX',
    });
    const $input = wrapper.find('input');
    const $select = wrapper.find('button');

    expect($select.attributes()['aria-activedescendant']).toBe('+52, Mexiko');
    expect($input.element.value).toBe('+52');
  });

  it('should render the preferred countries first', () => {
    const { wrapper } = build({
      defaultCountry: 'DE',
      preferredCountries: ['AT', 'DE', 'BE'],
    });

    // The countries are going to be rendered in alphabetical order
    const preferredCountriesNames = [
      'Belgien',
      'Deutschland',
      'Österreich',
    ];

    const $listItems = wrapper.findAll('li');
    const firstItems = $listItems.wrappers.slice(0, preferredCountriesNames.length);
    firstItems.forEach((item, index) => {
      expect(item.element).toHaveTextContent(preferredCountriesNames[index]);
    });
  });

  it('should emit the formatted value', () => {
    const formattedValue = '+49 555 555 5555';
    const { wrapper } = build({
      defaultCountry: 'DE',
    });

    const $input = wrapper.find('input');

    $input.trigger('focus');
    $input.setValue('+495555555555');
    $input.trigger('blur');

    expect(wrapper.emitted('input')[0][0]).toBe(formattedValue);
  });

  it('should update the input when selecting an option', async () => {
    const { wrapper } = build({
      defaultCountry: 'DE',
    });

    const $input = wrapper.find('input');
    expect($input.element.value).toBe('+49');

    wrapper.find('button').element.click();

    await wrapper.vm.$nextTick();

    wrapper.find('#MX > button').element.click();

    await wrapper.vm.$nextTick();

    expect($input.element.value).toBe('+52');
  });

  it('should update the select when typing a new code', async () => {
    const { wrapper } = build({
      defaultCountry: 'DE',
    });

    const $input = wrapper.find('input');
    const $select = wrapper.find('button');

    expect($input.element.value).toBe('+49');
    expect($select.attributes()['aria-activedescendant']).toBe('+49, Deutschland');

    $input.trigger('focus');
    $input.setValue('+525555555555');
    $input.trigger('blur');

    await wrapper.vm.$nextTick();

    expect($select.attributes()['aria-activedescendant']).toBe('+52, Mexiko');
  });

  it('should replace the dial code if a new one is selected', async () => {
    const { wrapper } = build({
      defaultCountry: 'DE',
    });

    const $input = wrapper.find('input');
    expect($input.element.value).toBe('+49');

    $input.trigger('focus');
    $input.setValue('+495555555555');
    $input.trigger('blur');

    wrapper.find('button').element.click();

    await wrapper.vm.$nextTick();

    wrapper.find('#MX > button').element.click();

    await wrapper.vm.$nextTick();

    expect($input.element.value).toBe('+52 555 555 5555');
  });
});
