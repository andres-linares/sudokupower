import { Generator } from '../../src/Generator';
import { Validator } from '../../src/Validator';

it('should generate an array of arrays of 9x9 cells', () => {
  const generator = new Generator();
  const result = generator.generate();

  expect(result.length).toEqual(9);
  result.forEach((row) => expect(row.length).toEqual(9));
});

it('should generate cells where each digit is repeated 9 times exactly', () => {
  const generator = new Generator();
  const result = generator.generateSolvedGame();
  const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  result.forEach((row) => row.forEach((cell) => cell.value && counts[cell.value - 1]++));
  expect(counts.every((count) => count === 9)).toEqual(true);
});

it('should generate a valid solved board', () => {
  const generator = new Generator();
  const result = generator.generateSolvedGame();

  const validator = new Validator(result);
  expect(validator.isValid()).toEqual(true);
});

it('should generate a valid playable board', () => {
  const generator = new Generator();
  const result = generator.generate();

  const validator = new Validator(result);
  expect(validator.isValid()).toEqual(true);
});

describe('difficulty', () => {
  it('should let around 35% of the board free in easy mode', () => {
    const generator = new Generator('EASY');
    const result = generator.generate();

    let totalCells = 0;
    let freeCells = 0;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = result[i][j];
        if (cell.value === null) freeCells++;

        totalCells++;
      }
    }

    const percentage = freeCells / totalCells;
    expect(percentage).toBeGreaterThanOrEqual(0.3);
    expect(percentage).toBeLessThanOrEqual(0.4);
  });

  it('should let around 45% of the board free in medium mode', () => {
    const generator = new Generator('MEDIUM');
    const result = generator.generate();

    let totalCells = 0;
    let freeCells = 0;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = result[i][j];
        if (cell.value === null) freeCells++;

        totalCells++;
      }
    }

    const percentage = freeCells / totalCells;
    expect(percentage).toBeGreaterThanOrEqual(0.4);
    expect(percentage).toBeLessThanOrEqual(0.5);
  });

  it('should let around 55% of the board free in hard mode', () => {
    const generator = new Generator('HARD');
    const result = generator.generate();

    let totalCells = 0;
    let freeCells = 0;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = result[i][j];
        if (cell.value === null) freeCells++;

        totalCells++;
      }
    }

    const percentage = freeCells / totalCells;
    expect(percentage).toBeGreaterThanOrEqual(0.5);
    expect(percentage).toBeLessThanOrEqual(0.6);
  });

  it('should let around 70% of the board free in hard mode', () => {
    const generator = new Generator('EXPERT');
    const result = generator.generate();

    let totalCells = 0;
    let freeCells = 0;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = result[i][j];
        if (cell.value === null) freeCells++;

        totalCells++;
      }
    }

    const percentage = freeCells / totalCells;
    expect(percentage).toBeGreaterThanOrEqual(0.6);
  });
});
