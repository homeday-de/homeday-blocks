import { mount } from '@vue/test-utils';
import HdPasswordConfirm from '@/components/form/HdPasswordConfirm.vue';
import HdInputPassword from '@/components/form/HdInputPassword.vue';

const STRENGTH_METER_SELECTOR = '.confirmPassword__strengthMeter';
const STRENGTH_BAR_VISIBLE_CLASS = 'isVisible';

const TEST_PASSWORD = 'loremIpsum123';

describe('HdPasswordConfirm', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(HdPasswordConfirm, {
      propsData: { value: TEST_PASSWORD },
      sync: false, // Added to avoid this issue : https://github.com/vuejs/vue-test-utils/issues/532
    });
  });

  it('is rendered as expected', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('has two HdInputPassword inputs', () => {
    expect(wrapper.findAll(HdInputPassword).length).toEqual(2);
  });

  it('shows password strength as text by default', async () => {
    await wrapper.vm.validate();

    expect(wrapper.find(STRENGTH_METER_SELECTOR).text()).toBeTruthy();
  });

  it('does not show the password strength if the prop `withStrength` is set to false', async () => {
    wrapper.setProps({ withStrength: false });

    await wrapper.vm.validate();

    expect(wrapper.find(STRENGTH_METER_SELECTOR).text()).toBeFalsy();
  });

  it('shows password strength as a bar if the prop `strengthBarStyle` is set to true', async () => {
    expect(wrapper.find(STRENGTH_METER_SELECTOR).classes()).not.toContain(STRENGTH_BAR_VISIBLE_CLASS);

    wrapper.setProps({ strengthBarStyle: true });

    await wrapper.vm.validate();

    expect(wrapper.find(STRENGTH_METER_SELECTOR).classes()).toContain(STRENGTH_BAR_VISIBLE_CLASS);
  });
});
