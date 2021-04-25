import { Cell } from '../Cell';

export function cellsToArray(cells: Cell[][]): number[][] {
  const numbers: number[][] = [];

  cells.forEach((row) => {
    const numbersRow: number[] = [];

    row.forEach((cell) => {
      numbersRow.push(cell.value === null ? 0 : cell.value);
    });

    numbers.push(numbersRow);
  });

  return numbers;
}
