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

  it('should return only available numbers', () => {
    let cells: Cell[][] = [[C(1)]];
    let result = Board.freeInColumn(0, cells);
    expect(result).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);

    cells = [[C(1)], [C()], [C()], [C()], [C(7)], [C()], [C(4)], [C()], [C()]];
    result = Board.freeInColumn(0, cells);
    expect(result).toEqual([2, 3, 5, 6, 8, 9]);

    cells = [
      [C(), C(9)],
      [C(), C()],
      [C(), C()],
      [C(), C()],
      [C(), C(5)],
      [C(), C(1)],
      [C(), C()],
      [C(), C(2)],
      [C(), C()],
    ];
    result = Board.freeInColumn(1, cells);
    expect(result).toEqual([3, 4, 6, 7, 8]);
  });
});

describe('freeInQuadrant', () => {
  it('should return all numbers when quadrant is empty', () => {
    const cells: Cell[][] = [
      [C(), C(), C()],
      [C(), C(), C()],
      [C(), C(), C()],
    ];
    const result = Board.freeInQuadrant(0, 0, cells);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should return only available numbers', () => {
    let cells: Cell[][] = [
      [C(1), C(), C()],
      [C(), C(), C()],
      [C(), C(), C()],
    ];
    let result = Board.freeInQuadrant(0, 0, cells);
    expect(result).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);

    cells = [
      [C(1), C(), C()],
      [C(), C(), C()],
      [C(), C(), C(3)],
    ];
    result = Board.freeInQuadrant(1, 1, cells);
    expect(result).toEqual([2, 4, 5, 6, 7, 8, 9]);

    cells = [
      [C(1), C(), C(7)],
      [C(), C(), C()],
      [C(4), C(), C(3)],
    ];
    result = Board.freeInQuadrant(2, 2, cells);
    expect(result).toEqual([2, 5, 6, 8, 9]);

    cells = [
      [C(), C(), C(), C(), C(), C(), C(1), C(2), C(3)],
      [C(), C(), C(), C(), C(), C(), C(4), C(), C(5)],
      [C(), C(), C(), C(), C(), C(), C(8), C(7), C(6)],
    ];
    result = Board.freeInQuadrant(2, 8, cells);
    expect(result).toEqual([9]);

    cells = [
      [C(), C(), C(), C(), C(3), C(), C(), C(), C()],
      [C(), C(), C(), C(), C(), C(), C(), C(), C()],
      [C(), C(), C(), C(), C(), C(), C(), C(), C()],
      [C(), C(), C(), C(), C(), C(), C(), C(4), C()],
      [C(), C(), C(), C(), C(), C(), C(), C(), C()],
      [C(), C(1), C(), C(), C(), C(), C(), C(), C()],
      [C(), C(), C(), C(), C(7), C(), C(), C(), C()],
      [C(), C(), C(), C(), C(), C(), C(), C(), C()],
      [C(), C(), C(), C(), C(2), C(), C(), C(), C()],
    ];
    result = Board.freeInQuadrant(8, 5, cells);
    expect(result).toEqual([1, 3, 4, 5, 6, 8, 9]);
  });
});
