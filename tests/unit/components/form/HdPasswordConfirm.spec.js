import { shallowMount } from '@vue/test-utils';
import HdPasswordConfirm from '@/components/form/HdPasswordConfirm.vue';
import HdInputPassword from '@/components/form/HdInputPassword.vue';

const STRENGTH_METER_SELECTOR = '.confirmPassword__strengthMeter';

describe('HdPasswordConfirm', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(HdPasswordConfirm);
  });

  it('is rendered as expected', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('has two HdInputPassword inputs', () => {
    expect(wrapper.findAll(HdInputPassword).length).toEqual(2);
  });

  it('has a password strength meter', () => {
    expect(wrapper.find(STRENGTH_METER_SELECTOR).exists()).toBeTruthy();
  });
});
