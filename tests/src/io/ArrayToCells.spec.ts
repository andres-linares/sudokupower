import { Cell } from '../../../src/Cell';
import { arrayToCells } from '../../../src/io/ArrayToCells';

const C = (x?: number) => new Cell(x);

it('should transform a cells array to a number array', () => {
  const row = [1, 2, 0, 4];
  const values = [row];

  const result = arrayToCells(values);
  expect(result).toEqual([[C(1), C(2), C(), C(4)]]);
});

it('should transform a full cells array to a number array', () => {
  const values = [
    [2, 5, 7, 8, 6, 1, 4, 0, 3],
    [3, 8, 0, 2, 4, 5, 1, 6, 7],
    [1, 6, 4, 3, 0, 7, 2, 5, 8],
    [4, 3, 8, 0, 7, 6, 5, 1, 2],
    [5, 7, 2, 0, 3, 4, 6, 8, 9],
    [6, 0, 1, 5, 8, 2, 3, 7, 4],
    [7, 2, 5, 4, 1, 8, 0, 3, 6],
    [0, 4, 6, 7, 5, 3, 8, 2, 1],
    [8, 1, 3, 6, 2, 0, 7, 4, 5],
  ];

  const expectedResult = [
    [C(2), C(5), C(7), C(8), C(6), C(1), C(4), C(), C(3)],
    [C(3), C(8), C(), C(2), C(4), C(5), C(1), C(6), C(7)],
    [C(1), C(6), C(4), C(3), C(), C(7), C(2), C(5), C(8)],
    [C(4), C(3), C(8), C(), C(7), C(6), C(5), C(1), C(2)],
    [C(5), C(7), C(2), C(), C(3), C(4), C(6), C(8), C(9)],
    [C(6), C(), C(1), C(5), C(8), C(2), C(3), C(7), C(4)],
    [C(7), C(2), C(5), C(4), C(1), C(8), C(), C(3), C(6)],
    [C(), C(4), C(6), C(7), C(5), C(3), C(8), C(2), C(1)],
    [C(8), C(1), C(3), C(6), C(2), C(), C(7), C(4), C(5)],
  ];

  const result = arrayToCells(values);
  expect(result).toEqual(expectedResult);
});
