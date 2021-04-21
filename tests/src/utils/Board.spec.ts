import { Cell } from '../../../src/Cell';
import { Board } from '../../../src/utils/Board';

const C = (value?: number) => new Cell(value);

describe('freeInRow', () => {
  it('should return all numbers when row is empty', () => {
    let cells: Cell[][] = [[]];
    let result = Board.freeInRow(0, cells);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    cells = [[C(), C(), C(), C(), C(), C(), C(), C(), C()]];
    result = Board.freeInRow(0, cells);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    cells = [
      [C(), C(), C(), C(), C(), C(), C(), C(), C()],
      [C(), C(), C(), C(), C(), C(), C(), C(), C()],
    ];
    result = Board.freeInRow(1, cells);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should return only available numbers', () => {
    let cells: Cell[][] = [[C(5)]];
    let result = Board.freeInRow(0, cells);

    expect(result).toEqual([1, 2, 3, 4, 6, 7, 8, 9]);

    cells = [[C(8), C(9), C(), C(), C(), C(), C(), C(), C()]];
    result = Board.freeInRow(0, cells);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);

    cells = [
      [C(), C(), C(), C(), C(), C(), C(), C(), C()],
      [C(1), C(2), C(3), C(4), C(5), C(), C(), C(), C()],
    ];
    result = Board.freeInRow(1, cells);

    expect(result).toEqual([6, 7, 8, 9]);
  });
});

describe('freeInColumn', () => {
  it('should return all numbers when column is empty', () => {
    let cells: Cell[][] = [[]];
    let result = Board.freeInColumn(0, cells);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    cells = [[C()], [C()], [C()], [C()], [C()], [C()], [C()], [C()], [C()]];
    result = Board.freeInColumn(0, cells);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    cells = [
      [C(), C()],
      [C(), C()],
      [C(), C()],
      [C(), C()],
      [C(), C()],
      [C(), C()],
      [C(), C()],
      [C(), C()],
      [C(), C()],
    ];
    result = Board.freeInColumn(1, cells);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
