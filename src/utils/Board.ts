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

  static freeInQuadrant(
    rowIndex: number,
    columnIndex: number,
    cells: Cell[][]
  ): number[] {
    const quadrant = this.cellsInQuadrant(rowIndex, columnIndex, cells);
    const values = quadrant.map((cell) => cell?.value);

    return ALL_NUMBERS.filter((number) => !values.includes(number));
  }

  private static cellsInQuadrant(row: number, column: number, cells: Cell[][]): Cell[] {
    if (row <= 2 && column <= 2) return this.cellsAround(1, 1, cells);
    if (row <= 2 && column <= 5) return this.cellsAround(1, 4, cells);
    if (row <= 2) return this.cellsAround(1, 7, cells);

    if (row <= 5 && column <= 2) return this.cellsAround(4, 1, cells);
    if (row <= 5 && column <= 5) return this.cellsAround(4, 4, cells);
    if (row <= 5) return this.cellsAround(4, 7, cells);

    if (column <= 2) return this.cellsAround(7, 1, cells);
    if (column <= 5) return this.cellsAround(7, 4, cells);

    return this.cellsAround(7, 7, cells);
  }

  private static cellsAround(row: number, column: number, cells: Cell[][]): Cell[] {
    const around: Cell[] = [];

    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = column - 1; j <= column + 1; j++) {
        around.push(cells[i][j]);
      }
    }

    return around;
  }
}
