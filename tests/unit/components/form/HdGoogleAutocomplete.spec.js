import { wrapperFactoryBuilder } from 'tests/unit/helpers';
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

const wrapperBuilder = wrapperFactoryBuilder(HdGoogleAutocomplete, {
  props: {
    name: 'Test autocomplete',
  },
});

describe('HdGoogleAutocomplete', () => {
  it('The component is rendered', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Emits input event', async () => {
    const wrapper = wrapperBuilder();

    wrapper.find('input').setValue(TEST_VALUE);
    expect(wrapper.emitted('input')).toBeTruthy();

    const payload = wrapper.emitted('input')[0][0];

    expect(payload).toBe(TEST_VALUE);
  });

  it('Emits locationChanged event', () => {
    const wrapper = wrapperBuilder();

    wrapper.vm.emitLocation(BERLIN_LOCATION);
    expect(wrapper.emitted('locationChanged')).toBeTruthy();
    // And that expected payload is passed with the event
    const payload = wrapper.emitted('locationChanged')[0][0];
    expect(payload).toEqual(BERLIN_LOCATION);
  });

  it('Supports getLocation method with a specific signature', async () => {
    const wrapper = wrapperBuilder();
    const location = await wrapper.vm.getLocation();

    expect(location).toEqual(DEFAULT_LOCATION);
  });

  it('Supports clearing of the input', () => {
    const wrapper = wrapperBuilder();

    wrapper.get('input').setValue(TEST_VALUE);
    wrapper.vm.clearInput();
    expect(wrapper.emitted('input')).toBeTruthy();

    const payload = wrapper.emitted('input')[1][0];

    expect(payload).toBe('');
  });

  it('Supports disabling of the input', () => {
    const wrapper = wrapperBuilder({
      props: {
        disabled: true,
      },
    });

    expect(wrapper.find('input').attributes().disabled).toBe('disabled');
  });

  describe('Supports custom rules with error message', () => {
    const atLeastTenCharsErrorMessage = 'should be at least ten characters long';
    const atLeastTenChars = { validate: (value) => value.length >= 10, errorMessage: atLeastTenCharsErrorMessage };

    const startsWithSpaceErrorMessage = 'should start with empty space';
    const startsWithSpace = { validate: (value) => value[0] === ' ', errorMessage: startsWithSpaceErrorMessage };

    it('Simple case', async () => {
      // invalid
      const wrapper = wrapperBuilder({
        props: {
          customRules: [atLeastTenChars],
          value: 'too short',
        },
      });

      wrapper.vm.validate();

      expect(wrapper.vm.isValid).toBe(false);
      expect(wrapper.vm.error).toBe(atLeastTenCharsErrorMessage);

      // valid
      await wrapper.setProps({
        customRules: [atLeastTenChars],
        value: 'this one is long enough',
      });

      wrapper.vm.validate();

      expect(wrapper.vm.isValid).toBe(true);
      expect(wrapper.vm.error).toBeFalsy();
    });

    it('Multiple custom validators: first one has highest importance', async () => {
      // both invalid
      const wrapper = wrapperBuilder({
        props: {
          customRules: [startsWithSpace, atLeastTenChars],
          value: 'short',
        },
      });

      wrapper.vm.validate();

      expect(wrapper.vm.isValid).toBe(false);
      expect(wrapper.vm.error).toBe(startsWithSpaceErrorMessage);

      // first one valid, second one invalid
      await wrapper.setProps({
        customRules: [startsWithSpace, atLeastTenChars],
        value: ' short',
      });

      wrapper.vm.validate();

      expect(wrapper.vm.isValid).toBe(false);
      expect(wrapper.vm.error).toBe(atLeastTenCharsErrorMessage);
    });
  });
});
