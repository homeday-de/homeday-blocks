import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdInputPhone from '@/components/form/HdInputPhone.vue';

const wrapperBuilder = wrapperFactoryBuilder(HdInputPhone);

describe('HdInputPhone', () => {
  const build = (overrideProps = {}) => {
    const props = {
      ...overrideProps,
    };

    const wrapper = wrapperBuilder({ props });

    return {
      wrapper,
    };
  };

  it('should render', () => {
    const { wrapper } = build();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
