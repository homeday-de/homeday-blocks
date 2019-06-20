import { mount } from '@vue/test-utils';
import HdTagsSelector from '@/components/form/HdTagsSelector.vue';
// reusing items from the stories
import ITEMS from '@/stories/mocks/FORM_ITEMS';

describe('HdTagsSelector', () => {
  // list of classNames we depend on
  const SINGLE_TAG_SELECTOR = '.tags-selector__selected-tags__tag';
  const UNSELECTED_TAG_SELECTOR = '.tags-selector__panel__tag';
  const REMOVE_BUTTON_SELECTOR = '.tags-selector__selected-tags__tag__remove';
  const ADD_BUTTON_SELECTOR = 'panelToggle';

  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdTagsSelector, {
      // this is needed to trigger window events
      // when mounting to document, we need to call wrapper.destroy after
      // every test - https://vue-test-utils.vuejs.org/api/options.html#attachtodocument
      attachToDocument: true,
    });
  });

  test('The component is rendered', () => {
    wrapper.setProps({ items: ITEMS, value: [ITEMS[0], ITEMS[1]] });
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.destroy();
  });

  test('Rendered selected tags should match passed in preselected items', () => {
    wrapper.setProps({ items: ITEMS, value: [ITEMS[0], ITEMS[1]] });
    expect(wrapper.findAll(SINGLE_TAG_SELECTOR).length).toBe(2);
    wrapper.destroy();
  });

  test('No tags are rendered, when tags are preselected', () => {
    wrapper.setProps({ items: ITEMS, value: [] });
    expect(wrapper.findAll(SINGLE_TAG_SELECTOR).length).toBe(0);
    wrapper.destroy();
  });

  test('Tags can be added', () => {
    // set empty preselection
    wrapper.setProps({ items: ITEMS, value: [] });
    // add a tag - it is a two click process
    const addButton = wrapper.find({ ref: ADD_BUTTON_SELECTOR });
    addButton.trigger('click');
    const firstTag = wrapper.find(UNSELECTED_TAG_SELECTOR);
    firstTag.trigger('click');
    // check that one tag is added
    expect(wrapper.findAll(SINGLE_TAG_SELECTOR).length).toBe(1);
    // confirm that input event is emitted
    expect(wrapper.emitted('input')).toBeTruthy();
    // And that expected payload is passed with the event
    const payload = wrapper.emitted('input')[0][0];
    expect(payload.length).toBe(1);
    // Expect payload to be an array
    expect(Array.isArray(payload)).toBeTruthy();
    wrapper.destroy();
  });

  test('Tags can be removed', () => {
    // set start state to 1 selected tag
    wrapper.setProps({ items: ITEMS, value: [ITEMS[0]] });
    // make sure we have one item
    expect(wrapper.findAll(SINGLE_TAG_SELECTOR).length).toBe(1);
    // click on remove button
    const removeButton = wrapper.find(REMOVE_BUTTON_SELECTOR);
    removeButton.trigger('click');
    // we expect no tags are rendered
    expect(wrapper.findAll(SINGLE_TAG_SELECTOR).length).toBe(0);
    // confirm that input event is emitted
    expect(wrapper.emitted('input')).toBeTruthy();
    // And that expected payload is passed with the event
    const payload = wrapper.emitted('input')[0][0];
    expect(payload.length).toBe(0);
    // Expect payload to be an array
    expect(Array.isArray(payload)).toBeTruthy();
    wrapper.destroy();
  });

  test('Pressing escape closes the panel', () => {
    // set start state to 1 selected tag
    wrapper.setProps({ items: ITEMS, value: [ITEMS[0]] });
    // set panel to visible
    wrapper.setData({ panelVisible: true });
    expect(wrapper.vm.panelVisible).toBe(true);
    wrapper.trigger('keyup.esc');
    // panel should not be visible
    expect(wrapper.vm.panelVisible).toBe(false);
    wrapper.destroy();
  });

  test('Clicking outside of selection panel, closes it', () => {
    // set start state to 1 selected tag
    wrapper.setProps({ items: ITEMS, value: [ITEMS[0]] });
    // set panel to visible
    wrapper.setData({ panelVisible: true });
    expect(wrapper.vm.panelVisible).toBe(true);
    // click outside of the panel - vue utils do not expose parent as wrapper
    // so we result to pure JS. We can do that, because we attachToDocument on mount
    wrapper.element.parentElement.click();
    // panel should not be visible
    expect(wrapper.vm.panelVisible).toBe(false);
    wrapper.destroy();
  });
});
