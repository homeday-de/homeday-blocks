import { generateUniqueNumbers, loadScript } from '@/services/utils';
import { JSDOM } from 'jsdom';

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
      // Consider using beforeEach later for same test cases.
      const dom = new JSDOM();
      global.window = dom.window;
      global.document = dom.window.document;

      loadScript({
        url: '/example', attributes: { id: 10, 'data-test': 20 }, head: true, first: true,
      });

      const scriptTag = document.querySelector('[data-test="20"]');

      expect(scriptTag.getAttribute('id')).toEqual('10');
      expect(scriptTag.parentElement.tagName).toEqual('HEAD');
      expect(scriptTag.parentElement.firstChild.getAttribute('src')).toEqual('/example');
    });
  });
});
