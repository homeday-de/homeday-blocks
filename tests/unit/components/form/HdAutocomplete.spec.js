import { shallowMount } from '@vue/test-utils';
import HdAutocomplete from '@/components/form/HdAutocomplete.vue';

describe('HdAutocomplete', () => {
  let wrapper;
  const SUGGESTIONS_LOCATOR = '.autocomplete__suggestions';
  const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

  beforeEach(() => {
    wrapper = shallowMount(HdAutocomplete, {
      propsData: {
        formatter: ':bold',
        suggestions: OPTIONS,
        name: 'Test',
        label: 'Test',
        type: 'text',
        placeholder: 'Test',
        required: false,
        autocomplete: 'on',
        autofocus: false,
        lang: 'en',
      },
    });
  });

  test('the component is rendered', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('the lang prop validation accepts only danish and english', () => {
    expect(wrapper.vm.$options.props.lang.validator('pt')).toBeFalsy();
    expect(wrapper.vm.$options.props.lang.validator('en')).toBeTruthy();
    expect(wrapper.vm.$options.props.lang.validator('de')).toBeTruthy();
  });

  test('Query prop update emits event and show options on view', () => {
    // Check for suggestions not displayed
    expect(wrapper.emitted('queryUpdated')).toBeFalsy();

    // Change query to check suggestions displayed
    wrapper.vm.updateQuery({ value: 'Option' });
    expect(wrapper.emitted('queryUpdated')).toBeTruthy();
    expect(wrapper.find(SUGGESTIONS_LOCATOR).element.childElementCount).toBe(3);
  });

  test('esc key should hide suggestions', () => {
    // Watch the hide function
    const spyHide = jest.spyOn(wrapper.vm, 'hide');

    // Change query to check suggestions displayed
    wrapper.vm.updateQuery({ value: 'Option' });
    expect(wrapper.find(SUGGESTIONS_LOCATOR).element.childElementCount).toBe(3);

    wrapper.trigger('keydown.esc');
    expect(wrapper.vm.$data.suggestionsHidden).toBeTruthy();
    expect(spyHide).toBeCalled();
  });

  test('keydown.down should switch suggestion focus to next on list', () => {
    // Change query to check suggestions displayed
    wrapper.vm.updateQuery({ value: 'Option' });

    wrapper.trigger('keydown.down');
    expect(wrapper.vm.$data.selectedSuggestion).toBe(OPTIONS[0]);
    expect(wrapper.vm.currentSuggestionIndex).toBe(0);

    wrapper.trigger('keydown.down');
    expect(wrapper.vm.$data.selectedSuggestion).toBe(OPTIONS[1]);
    expect(wrapper.vm.currentSuggestionIndex).toBe(1);

    wrapper.trigger('keydown.down');
    expect(wrapper.vm.$data.selectedSuggestion).toBe(OPTIONS[2]);
    expect(wrapper.vm.currentSuggestionIndex).toBe(2);

    wrapper.trigger('keydown.down');
    expect(wrapper.vm.$data.selectedSuggestion).toBeNull();
  });

  test('keydown.up should switch suggestion focus to previous on list', () => {
    // Change query to check suggestions displayed
    wrapper.vm.updateQuery({ value: 'Option' });

    wrapper.trigger('keydown.up');
    expect(wrapper.vm.$data.selectedSuggestion).toBe(OPTIONS[2]);
    expect(wrapper.vm.currentSuggestionIndex).toBe(2);

    wrapper.trigger('keydown.up');
    expect(wrapper.vm.$data.selectedSuggestion).toBe(OPTIONS[1]);
    expect(wrapper.vm.currentSuggestionIndex).toBe(1);

    wrapper.trigger('keydown.up');
    expect(wrapper.vm.$data.selectedSuggestion).toBe(OPTIONS[0]);
    expect(wrapper.vm.currentSuggestionIndex).toBe(0);

    wrapper.trigger('keydown.up');
    expect(wrapper.vm.$data.selectedSuggestion).toBeNull();
  });
});
