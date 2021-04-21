import { Random } from '../../src/utils/Random';

describe('randomIntInRange', () => {
  it('should generate values inside the range inclusive', () => {
    for (let i = 10; i < 100; i++) {
      const value = Random.intInRange(1, i);
      expect(value >= 1 && value <= i).toEqual(true);
    }
  });
});
