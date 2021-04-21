import { Cell } from '../Cell';

const ALL_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export class Board {
  static freeInRow(rowIndex: number, cells: Cell[][]): number[] {
    const row = cells[rowIndex];
    const values = row.map((cell) => cell.value);

    return ALL_NUMBERS.filter((number) => !values.includes(number));
  }

  static freeInColumn(columnIndex: number, cells: Cell[][]): number[] {
    const column = cells.map((row) => row[columnIndex]);
    const values = column.map((cell) => cell?.value);

    return ALL_NUMBERS.filter((number) => !values.includes(number));
  }
}
