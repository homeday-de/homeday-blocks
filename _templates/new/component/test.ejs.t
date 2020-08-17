---
to: tests/unit/<%= path %>/<%= name %>.spec.js
---
import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import <%= name %> from '@/<%= path %>/<%= name %>.vue';

const wrapperBuilder = wrapperFactoryBuilder(<%= name %>);

describe('<%= name %>', () => {
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
