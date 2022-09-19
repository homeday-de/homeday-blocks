import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import { createWrapper } from '@vue/test-utils';
import HdEditSwitch from '@/components/HdEditSwitch.vue';

const DEFAULT_SLOT_CONTENT = '<p>Default slot</p>';
const EDIT_SLOT_CONTENT = '<p>Edit slot</p>';
const VIEW_SLOT_CONTENT = '<p>View slot</p>';
const EDIT_CONTROLS_SELECTOR = '.edit-switch__actions';
const LOADING_INDICATOR_SELECTOR = '.edit-switch__loading-indicator';

const wrapperBuilder = wrapperFactoryBuilder(HdEditSwitch, {
  slots: {
    default: DEFAULT_SLOT_CONTENT,
    edit: EDIT_SLOT_CONTENT,
    view: VIEW_SLOT_CONTENT,
  },
});

describe('HdEditSwitch', () => {
  it('renders the component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Default slot is always visible', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.vm.$refs.defaultSlot).not.toBeUndefined();

    wrapper.setProps({
      editing: true,
    });

    expect(wrapper.vm.$refs.defaultSlot).not.toBeUndefined();
    expect(createWrapper(wrapper.vm.$refs.defaultSlot).html().includes(DEFAULT_SLOT_CONTENT)).toBe(
      true
    );
  });

  it('In the default state, edit slot is not present, and view is', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.vm.$refs.editSlot).toBeUndefined();
    expect(wrapper.vm.$refs.viewSlot).not.toBeUndefined();
    expect(createWrapper(wrapper.vm.$refs.viewSlot).html().includes(VIEW_SLOT_CONTENT)).toBe(true);
  });

  it('In the editing state, edit slot is present, and view is not', () => {
    const wrapper = wrapperBuilder({
      props: {
        editing: true,
      },
    });

    expect(wrapper.vm.$refs.editSlot).not.toBeUndefined();
    expect(createWrapper(wrapper.vm.$refs.editSlot).html().includes(EDIT_SLOT_CONTENT)).toBe(true);
    expect(wrapper.vm.$refs.viewSlot).toBeUndefined();
  });

  it('Loading should work', () => {
    const wrapper = wrapperBuilder({
      props: {
        loading: true,
      },
    });

    expect(wrapper.find(LOADING_INDICATOR_SELECTOR).exists()).toBe(true);
  });

  it('You should be able to disallow editing', () => {
    const wrapper = wrapperBuilder({
      props: {
        editingAllowed: false,
      },
    });

    expect(wrapper.find(EDIT_CONTROLS_SELECTOR).exists()).toBe(false);
  });

  it('Should fire edit events', () => {
    const wrapper = wrapperBuilder();

    wrapper.vm.edit();

    expect(wrapper.emitted('edit')).toBeTruthy();

    wrapper.vm.cancel();

    expect(wrapper.emitted('cancel')).toBeTruthy();

    wrapper.vm.save();

    expect(wrapper.emitted('save')).toBeTruthy();
  });
});
