import { mount } from '@vue/test-utils';
import HdGoogleAutocomplete from '@/components/form/HdGoogleAutocomplete.vue';

const TEST_VALUE = 'Berlin';
const BERLIN_LOCATION = {
  lat: 52.520008,
  lng: 13.404954,
  name: 'Berlin',
};
const DEFAULT_LOCATION = {
  lat: null,
  lng: null,
  name: '',
};

describe('HdGoogleAutocomplete', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdGoogleAutocomplete, {
      propsData: {
        name: 'Test autocomplete',
      },
    });
  });

  test('The component is rendered', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Emits input event', async () => {
    wrapper.find('input').setValue(TEST_VALUE);
    expect(wrapper.emitted('input')).toBeTruthy();

    const payload = wrapper.emitted('input')[0][0];

    expect(payload).toBe(TEST_VALUE);
  });

  test('Emits locationChanged event', () => {
    wrapper.vm.emitLocation(BERLIN_LOCATION);
    expect(wrapper.emitted('locationChanged')).toBeTruthy();
    // And that expected payload is passed with the event
    const payload = wrapper.emitted('locationChanged')[0][0];
    expect(payload).toEqual(BERLIN_LOCATION);
  });

  test('Supports getLocation method with a specific signature', async () => {
    const location = await wrapper.vm.getLocation();
    expect(location).toEqual(DEFAULT_LOCATION);
  });

  test('Supports clearing of the input', () => {
    wrapper.find('input').setValue(TEST_VALUE);
    wrapper.vm.clearInput();
    expect(wrapper.emitted('input')).toBeTruthy();

    const payload = wrapper.emitted('input')[1][0];

    expect(payload).toBe('');
  });

  test('Supports disabling of the input', () => {
    wrapper.setProps({
      disabled: true,
    });

    expect(wrapper.find('input').attributes().disabled).toBe('disabled');
  });


  describe('Supports custom rules with error message', () => {
    const atLeastTenCharsErrorMessage = 'should be at least ten characters long';
    const atLeastTenChars = { validate: value => value.length >= 10, errorMessage: atLeastTenCharsErrorMessage };

    const startsWithSpaceErrorMessage = 'should start with empty space';
    const startsWithSpace = { validate: value => value[0] === ' ', errorMessage: startsWithSpaceErrorMessage };

    test('Simple case', () => {
      // invalid
      wrapper.setProps({
        customRules: [atLeastTenChars],
        value: 'too short',
      });

      wrapper.vm.validate();

      expect(wrapper.vm.isValid).toBe(false);
      expect(wrapper.vm.error).toBe(atLeastTenCharsErrorMessage);

      // valid
      wrapper.setProps({
        customRules: [atLeastTenChars],
        value: 'this one is long enough',
      });

      wrapper.vm.validate();

      expect(wrapper.vm.isValid).toBe(true);
      expect(wrapper.vm.error).toBeFalsy();
    });

    test('Multiple custom validators: first one has highest importance', () => {
      // both invalid
      wrapper.setProps({
        customRules: [startsWithSpace, atLeastTenChars],
        value: 'short',
      });

      wrapper.vm.validate();

      expect(wrapper.vm.isValid).toBe(false);
      expect(wrapper.vm.error).toBe(startsWithSpaceErrorMessage);

      // first one valid, second one invalid
      wrapper.setProps({
        customRules: [startsWithSpace, atLeastTenChars],
        value: ' short',
      });

      wrapper.vm.validate();

      expect(wrapper.vm.isValid).toBe(false);
      expect(wrapper.vm.error).toBe(atLeastTenCharsErrorMessage);
    });
  });
});
