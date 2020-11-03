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
      this.wrapper = wrapperFactory({ slots: this.slots, props: this.props });
      return {
        wrapper: this.wrapper,
        selectors: this.selectors,
      };
    },
    withProps(props = {}) {
      this.props = props;
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

  test('a HdForm detects changes in child inputs', async () => {
    const { wrapper, selectors } = hdFormFactory()
      .withSampleForm()
      .build();

    await selectors.submit().trigger('submit');

    expect(wrapper.emitted().submit[0][0].hasChanged).toBe(false);

    await selectors.firstName().setValue('Dave Grohl');
    await selectors.submit().trigger('submit');

    expect(wrapper.emitted().submit[1][0].hasChanged).toBe(true);
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
});
