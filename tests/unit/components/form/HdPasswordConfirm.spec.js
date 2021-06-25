import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdPasswordConfirm from '@/components/form/HdPasswordConfirm.vue';
import HdInputPassword from '@/components/form/HdInputPassword.vue';

const STRENGTH_METER_SELECTOR = '.confirmPassword__strengthMeter';
const STRENGTH_BAR_VISIBLE_CLASS = 'isVisible';
const TEST_PASSWORD = 'loremIpsum123';

const wrapperBuilder = wrapperFactoryBuilder(HdPasswordConfirm, {
  props: {
    value: TEST_PASSWORD,
  },
});

describe('HdPasswordConfirm', () => {
  it('is rendered as expected', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('has two HdInputPassword inputs', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.findAll(HdInputPassword).length).toEqual(2);
  });

  it('shows password strength as text by default', async () => {
    const wrapper = wrapperBuilder();

    await wrapper.vm.validate();

    expect(wrapper.find(STRENGTH_METER_SELECTOR).text()).toBeTruthy();
  });

  it('does not show the password strength if the prop `withStrength` is set to false', async () => {
    const wrapper = wrapperBuilder({
      props: {
        withStrength: false,
      },
    });

    await wrapper.vm.validate();

    expect(wrapper.find(STRENGTH_METER_SELECTOR).text()).toBeFalsy();
  });

  it('shows password strength as a bar if the prop `strengthBarStyle` is set to true', async () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.find(STRENGTH_METER_SELECTOR).classes()).not.toContain(STRENGTH_BAR_VISIBLE_CLASS);

    await wrapper.setProps({ strengthBarStyle: true });

    await wrapper.vm.validate();

    expect(wrapper.find(STRENGTH_METER_SELECTOR).classes()).toContain(STRENGTH_BAR_VISIBLE_CLASS);
  });
});
