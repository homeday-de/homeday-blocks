import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdTagsSelector from '@/components/form/HdTagsSelector.vue';
// reusing items from the stories
import ITEMS from '@/stories/mocks/FORM_ITEMS';

const SINGLE_TAG_SELECTOR = '.tags-selector__selected-tags__tag';
const UNSELECTED_TAG_SELECTOR = '.tags-selector__panel__tag';
const REMOVE_BUTTON_SELECTOR = '.tags-selector__selected-tags__tag__remove';
const ADD_BUTTON_SELECTOR = 'panelToggle';

const wrapperBuilder = wrapperFactoryBuilder(HdTagsSelector, {
  props: {
    items: ITEMS,
    value: [ITEMS[0], ITEMS[1]],
  },
});

describe('HdTagsSelector', () => {
  it('The component is rendered', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Rendered selected tags should match passed in preselected items', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.findAll(SINGLE_TAG_SELECTOR).length).toBe(2);
  });

  it('No tags are rendered, when tags are preselected', () => {
    const wrapper = wrapperBuilder({
      props: {
        value: [],
      },
    });

    expect(wrapper.findAll(SINGLE_TAG_SELECTOR).length).toBe(0);
  });

  it('Tags can be added', async () => {
    const wrapper = wrapperBuilder({
      props: {
        value: [],
      },
    });
    // add a tag - it is a two click process
    const addButton = wrapper.find({ ref: ADD_BUTTON_SELECTOR });
    addButton.trigger('click');

    const firstTag = wrapper.find(UNSELECTED_TAG_SELECTOR);
    firstTag.trigger('click');

    await wrapper.vm.$nextTick();
    // check that one tag is added
    expect(wrapper.findAll(SINGLE_TAG_SELECTOR).length).toBe(1);
    // confirm that input event is emitted
    expect(wrapper.emitted('input')).toBeTruthy();
    // And that expected payload is passed with the event
    const payload = wrapper.emitted('input')[0][0];
    expect(payload.length).toBe(1);
    // Expect payload to be an array
    expect(Array.isArray(payload)).toBeTruthy();
  });

  it('Tags can be removed', async () => {
    const wrapper = wrapperBuilder({
      props: {
        value: [ITEMS[0]],
      },
    });
    // make sure we have one item
    expect(wrapper.findAll(SINGLE_TAG_SELECTOR).length).toBe(1);
    // click on remove button
    const removeButton = wrapper.find(REMOVE_BUTTON_SELECTOR);
    removeButton.trigger('click');

    await wrapper.vm.$nextTick();

    // we expect no tags are rendered
    expect(wrapper.findAll(SINGLE_TAG_SELECTOR).length).toBe(0);
    // confirm that input event is emitted
    expect(wrapper.emitted('input')).toBeTruthy();
    // And that expected payload is passed with the event
    const payload = wrapper.emitted('input')[0][0];
    expect(payload.length).toBe(0);
    // Expect payload to be an array
    expect(Array.isArray(payload)).toBeTruthy();
  });

  it('Pressing escape closes the panel', () => {
    const wrapper = wrapperBuilder({
      props: {
        value: [ITEMS[0]],
      },
      data: {
        panelVisible: true,
      },
      attachToDocument: true,
    });

    expect(wrapper.vm.panelVisible).toBe(true);
    wrapper.trigger('keyup.esc');
    // panel should not be visible
    expect(wrapper.vm.panelVisible).toBe(false);
  });

  it('Clicking outside of selection panel, closes it', () => {
    const wrapper = wrapperBuilder({
      props: {
        value: [ITEMS[0]],
      },
      data: {
        panelVisible: true,
      },
      attachToDocument: true,
    });

    expect(wrapper.vm.panelVisible).toBe(true);
    // click outside of the panel - vue utils do not expose parent as wrapper
    // so we result to pure JS. We can do that, because we attachToDocument on mount
    wrapper.element.parentElement.click();
    // panel should not be visible
    expect(wrapper.vm.panelVisible).toBe(false);
  });
});
