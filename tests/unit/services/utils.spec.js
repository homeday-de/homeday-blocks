import {
  generateRandomNumbers,
} from '@/services/utils';


describe('Utils service', () => {
  describe('generateRandomNumbers', () => {
    it('returns array of random unique integers on open interval', () => {
      const max = 5;
      const min = 1;
      const amount = 3;
      const randomInts = generateRandomNumbers(amount, min, max);
      expect(randomInts.length).toBe(amount);
      expect(Math.max(...randomInts)).toBeLessThanOrEqual(max);
      expect(Math.min(...randomInts)).toBeGreaterThanOrEqual(min);
      expect(new Set(randomInts).size).toBe(randomInts.length);
    });

    it('returns empty array if amount is larger then difference between min and max', () => {
      const max = 5;
      const min = 1;
      const amount = max - min + 1;
      const randomInts = generateRandomNumbers(amount, min, max);
      expect(randomInts.length).toBe(0);
    });
  });
});
