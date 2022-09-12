import {
  generateUniqueNumbers,
  loadScript,
  cloneVNodeElement,
  keysToCamelCase,
  keysToSnakeCase,
} from '@/services/utils';
import { mount } from '@vue/test-utils';

const SNAKE_CASE_DATA = {
  category_to_test_out: {
    my_uri: '/categories/0b092e7c-4d2c-4eba-8c4e-80937c9e483d',
    parent_name: 'Food',
    name_of_product: {
      name_of: { name_of_of: 'John' },
      age_of: [{ array_object: 'John' }, 40, 50],
      car_type: null,
    },
    super_deep_object: {
      a_ridiculously_deep_object: {
        now_you_are_pulling_my_leg: 'well yes, just a little bit',
        seriously_gone_too_far_this_time: {
          what_do_you_have_to_say_for_yourself: "ok i'll back off a touch",
        },
      },
      must_rid_me_of_this_snake_case: 'okie dokie - whatever you ask',
      please_let_me_up_for_air: 'ok mister, away you go',
    },
  },
  amount_owing_array: [
    { jon_smith: 50, patti_smith: 30 },
    20,
    20,
    {
      my_dad: [
        { oh_my_lordy: 'deep array object bro', yes_sir: 'really deep' },
        40,
        { yo_ho: 'very very very deep' },
      ],
    },
  ],
  debit_run: true,
};

const CAMEL_CASE_DATA = {
  categoryToTestOut: {
    myUri: '/categories/0b092e7c-4d2c-4eba-8c4e-80937c9e483d',
    parentName: 'Food',
    nameOfProduct: {
      nameOf: { nameOfOf: 'John' },
      ageOf: [{ arrayObject: 'John' }, 40, 50],
      carType: null,
    },
    superDeepObject: {
      aRidiculouslyDeepObject: {
        nowYouArePullingMyLeg: 'well yes, just a little bit',
        seriouslyGoneTooFarThisTime: {
          whatDoYouHaveToSayForYourself: "ok i'll back off a touch",
        },
      },
      mustRidMeOfThisSnakeCase: 'okie dokie - whatever you ask',
      pleaseLetMeUpForAir: 'ok mister, away you go',
    },
  },
  amountOwingArray: [
    { jonSmith: 50, pattiSmith: 30 },
    20,
    20,
    {
      myDad: [
        { ohMyLordy: 'deep array object bro', yesSir: 'really deep' },
        40,
        { yoHo: 'very very very deep' },
      ],
    },
  ],
  debitRun: true,
};

describe('Utils service', () => {
  describe('generateRandomNumbers', () => {
    it('returns array of random unique integers on closed interval', () => {
      const max = 5;
      const min = 1;
      const amount = 3;
      const randomInts = generateUniqueNumbers(amount, min, max);
      expect(Math.max(...randomInts)).toBeLessThanOrEqual(max);
      expect(Math.min(...randomInts)).toBeGreaterThanOrEqual(min);
      expect(new Set(randomInts).size).toBe(randomInts.length);
    });

    it('returns empty array if amount is larger then difference between min and max', () => {
      const max = 5;
      const min = 1;
      const amount = max - min + 2;
      const randomInts = generateUniqueNumbers(amount, min, max);
      expect(randomInts.length).toBe(0);
    });

    it('appends a script tag in the head of html', () => {
      loadScript({
        url: '/example',
        attributes: { id: 10, 'data-test': 20 },
        head: true,
        first: true,
      });

      const scriptTag = document.querySelector('[data-test="20"]');

      expect(scriptTag.getAttribute('id')).toEqual('10');
      expect(scriptTag.parentElement.tagName).toEqual('HEAD');
      expect(scriptTag.parentElement.firstChild.getAttribute('src')).toEqual('/example');
    });
  });

  describe('cloneVNodeElement', () => {
    it('creates a clone of a vue dom element', () => {
      /** @type {Vue.Component<Vue>} */
      const HeaderComponent = {
        props: ['name'],
        data: () => ({ greeting: 'Hello' }),
        computed: {
          computedProperty() {
            return 2 + 2;
          },
        },
        methods: {
          sumComputedProperty() {
            return this.computedProperty + 2;
          },
        },
        template: `
          <div>
            <h1>{{ greeting }}, {{ name ||"comrade" }}</h1>
            <span>The result is: {{ computedProperty }}</span>
            <span>The sum is: {{ sumComputedProperty() }}</span>
          </div>
        `,
      };

      /** @type {Vue.Component<Vue>} */
      const MyComponent = {
        render(h) {
          /** @type {import('vue').VNode[]} */
          const children = this.$slots.default || [];

          /** @type {import('vue').VNode[]} */
          const clones = children.map((vnode) => {
            const clone = cloneVNodeElement(
              vnode,
              {
                props: {
                  name: 'Alexander',
                },
              },
              h
            );
            return h('div', {}, [clone]);
          });

          return h('div', {}, [clones, children]);
        },
      };

      const wrapper = mount(MyComponent, {
        slots: {
          default: [HeaderComponent],
        },
      });

      expect(wrapper.text()).toContain('Alexander');
      expect(wrapper.text()).toContain('comrade');
    });
  });

  describe('keysToCamelCase', () => {
    it('deeply converts the keys of a given object to camelCase', () => {
      expect(keysToCamelCase(SNAKE_CASE_DATA)).toEqual(CAMEL_CASE_DATA);
    });
  });

  describe('keysToSnakeCase', () => {
    it('deeply converts the keys of a given object to snake_case', () => {
      expect(keysToSnakeCase(CAMEL_CASE_DATA)).toEqual(SNAKE_CASE_DATA);
    });
  });
});
