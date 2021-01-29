import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import {
  HdForm, HdInput, HdInputFormatter, HdCheckbox,
} from 'homeday-blocks';
import { scrollToEl } from 'homeday-blocks/src/services/scrolling';

jest.mock('homeday-blocks/src/services/scrolling');

const wrapperFactory = wrapperFactoryBuilder(HdForm, {
  stubs: {
    HdInput,
    HdInputFormatter,
    HdCheckbox,
  },
});

describe('HdForm', () => {
  const hdFormFactory = () => ({
    wrapper: null,
    slots: {},
    props: {},
    selectors: {},
    build() {
      this.wrapper = wrapperFactory({ slots: this.slots, props: this.props, listeners: this.listeners });
      return {
        wrapper: this.wrapper,
        selectors: this.selectors,
      };
    },
    withProps(props = {}) {
      this.props = props;
      return this;
    },
    withListeners(listeners = {}) {
      this.listeners = listeners;
      return this;
    },
    withDefaultSlot(defaultSlot = {}) {
      this.slots = {
        default: defaultSlot,
      };
      return this;
    },
    withSampleForm() {
      this.selectors = {
        firstName: () => this.wrapper.find('input[name="firstName"]'),
        age: () => this.wrapper.find('input[name="age"]'),
        isNotRobot: () => this.wrapper.find('input[name="isNotRobot"]'),
        isNotRobotHdCheckbox: () => this.wrapper.findComponent(HdCheckbox),
        submit: () => this.wrapper.find('button[type="submit"]'),
      };

      this.slots = {
        default: {
          data: () => ({
            firstName: '',
            age: '0',
            isNotRobot: false,
          }),
          template: `
              <div>
                <HdInput label="First name" name="firstName" v-model="firstName" />
                <HdInputFormatter label="Age*" name="age" v-model="age" :formatter="(a) => a + ' years old'" required />
                <HdCheckbox inner-label="I'm not a bot*" name="isNotRobot" v-model="isNotRobot" required />

                <button type="submit">Submit</button>
              </div>
            `,
        },
      };
      return this;
    },
  });

  test('a user can submit a form successfully', async () => {
    const { wrapper, selectors } = hdFormFactory()
      .withSampleForm()
      .build();

    expect(selectors.firstName().exists()).toBe(true);
    expect(selectors.age().exists()).toBe(true);
    expect(selectors.isNotRobot().exists()).toBe(true);

    await selectors.firstName().setValue('Dave Grohl');
    await selectors.age().setValue('51');
    await selectors.isNotRobot().setChecked();

    await selectors.submit().trigger('submit');

    expect(wrapper.emitted().submit[0][0]).toMatchObject({
      formData: {
        age: '51',
        firstName: 'Dave Grohl',
        isNotRobot: true,
      },
      hasChanged: true,
      invalidFields: [],
      isValid: true,
    });
  });

  test('a user can submit a invalid form', async () => {
    const { wrapper, selectors } = hdFormFactory()
      .withSampleForm()
      .build();

    await selectors.firstName().setValue('Dave Grohl');
    await selectors.age().setValue('51');

    await selectors.submit().trigger('submit');

    const submitted = wrapper.emitted().submit[0][0];

    expect(submitted.invalidFields).toHaveLength(1);
    expect(submitted.invalidFields[0].name).toEqual('isNotRobot');
    expect(submitted.invalidFields[0].value).toBe(false);
    expect(submitted).toEqual(
      expect.objectContaining({
        formData: {
          age: '51',
          firstName: 'Dave Grohl',
          isNotRobot: false,
        },
        hasChanged: true,
        isValid: false,
      }),
    );
  });

  test('a HdForm detects changes in child inputs on submit', async () => {
    const { wrapper, selectors } = hdFormFactory()
      .withSampleForm()
      .build();

    await selectors.submit().trigger('submit');

    expect(wrapper.emitted().submit[0][0].hasChanged).toBe(false);

    await selectors.firstName().setValue('Dave Grohl');
    await selectors.submit().trigger('submit');

    expect(wrapper.emitted().submit[1][0].hasChanged).toBe(true);
  });

  test('a HdForm detects changes if the parent listens to hasChanged event', async () => {
    const onChange = jest.fn();
    const { wrapper, selectors } = hdFormFactory()
      .withListeners({ change: onChange })
      .withSampleForm()
      .build();

    const initialFirstNameValue = selectors.firstName().element.value;

    await selectors.firstName().setValue('Dave Grohl');

    expect(wrapper.emitted().change[1][0].hasChanged).toBe(true);

    await selectors.firstName().setValue(initialFirstNameValue);

    expect(wrapper.emitted().change[2][0].hasChanged).toBe(false);
  });

  test("a HdForm does not detect changes in child inputs that don't inject 'addFormField'", async () => {
    const { wrapper } = hdFormFactory()
      .withDefaultSlot({
        data: () => ({
          firstName: '',
          lastName: '',
        }),
        template: `
            <div>
              <input name="firstName" v-model="firstName" />
              <HdInput label="Last name" name="lastName" v-model="lastName" />

              <button type="submit">Submit</button>
            </div>
          `,

      })
      .build();

    const selectors = {
      firstName: () => wrapper.find('input[name="firstName"]'),
      lastName: () => wrapper.find('input[name="lastName"]'),
      submit: () => wrapper.find('button[type="submit"]'),
    };

    expect(selectors.firstName().exists()).toBe(true);
    expect(selectors.lastName().exists()).toBe(true);

    await selectors.firstName().setValue('Dave');
    await selectors.lastName().setValue('Grohl');

    await selectors.submit().trigger('submit');

    expect(wrapper.emitted().submit[0][0].formData).toEqual({
      lastName: 'Grohl',
    });
  });

  test('a user is directed to the invalid field after submit a invalid form', async () => {
    const { selectors } = hdFormFactory()
      .withProps({ scrollToInvalidField: true })
      .withSampleForm()
      .build();

    const expectedScrollElement = selectors.isNotRobotHdCheckbox().element;

    expect(scrollToEl).not.toHaveBeenCalled();

    await selectors.submit().trigger('submit');

    expect(scrollToEl).toHaveBeenCalledTimes(1);
    expect(scrollToEl).toHaveBeenCalledWith({ el: expectedScrollElement });
  });

  test('a HdForm tracks dynamically added or removed fields', async () => {
    const { wrapper } = hdFormFactory()
      .withDefaultSlot({
        data: () => ({
          name: '',
          hasTermsAgreed: false,
          favoriteBand: '',
        }),
        template: `
          <div>
            <HdCheckbox inner-label="Are you agree with our terms?" name="hasTermsAgreed" v-model="hasTermsAgreed" />

            <HdInput
              v-if="hasTermsAgreed"
              label="What is your favorite band?"
              name="favoriteBand"
              v-model="favoriteBand"
            />

            <button type="submit">Submit</button>
          </div>
        `,

      })
      .build();

    const selectors = {
      hasTermsAgreed: () => wrapper.find('input[name="hasTermsAgreed"]'),
      favoriteBand: () => wrapper.find('input[name="favoriteBand"]'),
      submit: () => wrapper.find('button[type="submit"]'),
    };

    expect(selectors.hasTermsAgreed().exists()).toBe(true);
    expect(selectors.favoriteBand().exists()).toBe(false);

    await selectors.submit().trigger('submit');

    expect(wrapper.emitted().submit[0][0].formData).toEqual({
      hasTermsAgreed: false,
    });

    await selectors.hasTermsAgreed().setChecked();

    expect(selectors.favoriteBand().exists()).toBe(true);

    await selectors.favoriteBand().setValue('Muse');
    await selectors.submit().trigger('submit');

    expect(wrapper.emitted().submit[1][0].formData).toEqual({
      hasTermsAgreed: true,
      favoriteBand: 'Muse',
    });

    await selectors.hasTermsAgreed().setChecked(false);

    expect(selectors.favoriteBand().exists()).toBe(false);

    await selectors.submit().trigger('submit');

    expect(wrapper.emitted().submit[2][0].formData).toEqual({
      hasTermsAgreed: false,
    });
  });
});
