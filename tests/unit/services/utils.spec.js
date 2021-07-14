import { generateUniqueNumbers, loadScript, cloneVNodeElement } from '@/services/utils';
import { mount } from '@vue/test-utils';

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
        url: '/example', attributes: { id: 10, 'data-test': 20 }, head: true, first: true,
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
      const HeaderComponent = ({
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
      });

      /** @type {Vue.Component<Vue>} */
      const MyComponent = ({
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
              h,
            );
            return h('div', {}, [clone]);
          });

          return h('div', {}, [
            clones,
            children,
          ]);
        },
      });

      const wrapper = mount(MyComponent, {
        slots: {
          default: [HeaderComponent],
        },
      });

      expect(wrapper.text()).toContain('Alexander');
      expect(wrapper.text()).toContain('comrade');
    });
  });
});
