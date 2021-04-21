import { Random } from '../../../src/utils/Random';

describe('randomIntInRange', () => {
  it('should generate values inside the range inclusive', () => {
    for (let i = 10; i < 100; i++) {
      const value = Random.intInRange(1, i);
      expect(value >= 1 && value <= i).toEqual(true);
    }
  });

  it('should have a uniform distribution', () => {
    const values = [];
    for (let i = 0; i < 100; i++) {
      values.push(0);
    }

    const TRIES = 10_000;

    for (let i = 0; i < TRIES; i++) {
      const value = Random.intInRange(0, 99);
      values[value]++;
    }

    const distribution = values.map((value) => value / TRIES);
    expect(distribution.every((value) => value >= 0.0065 && value <= 0.0135)).toEqual(
      true
    );
  });
});

describe('pick', () => {
  it('should return a random value from an array', () => {
    const TRIES = 10_000;
    const array: number[] = [];
    const values: number[] = [];

    for (let i = 0; i < 100; i++) {
      array.push(i);
      values.push(0);
    }

    for (let i = 0; i < TRIES; i++) {
      const randomIndex = Random.pick(array);
      values[randomIndex]++;
    }

    const distribution = values.map((value) => value / TRIES);
    expect(distribution.every((value) => value >= 0.0065 && value <= 0.0135)).toEqual(
      true
    );
  });
});
