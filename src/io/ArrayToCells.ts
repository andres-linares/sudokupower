import { Cell } from '../Cell';

export function arrayToCells(numbers: number[][]): Cell[][] {
  const cells: Cell[][] = [];

  numbers.forEach((row) => {
    const cellsRow: Cell[] = [];

    row.forEach((value) => {
      const cell = new Cell(value === 0 ? null : value);
      cellsRow.push(cell);
    });

    cells.push(cellsRow);
  });

  return cells;
}
