import { Generator } from '../../src/Generator';

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

it('should generate a valid solved board', () => {});
