import { Cell } from '../Cell';

export class Logger {
  static logBoard(cells: Cell[][]): string {
    let boardString = '';

    for (let i = 0; i < 9; i++) {
      const row = cells[i];
      const rowString = this.logRow(row);

      if (i > 0 && i % 3 === 0) {
        boardString += '\n-------+-------+------';
      }

      boardString += '\n' + rowString;
    }

    return boardString;
  }

  private static logRow(row: Cell[]): string {
    let rowString = '';

    for (let i = 0; i < 9; i++) {
      const cell = row ? row[i] : { value: 0 };
      const value = cell?.value ? cell.value.toString() : '0';

      if (i > 0 && i % 3 === 0) {
        rowString += ' |';
      }

      rowString += ' ' + value;
    }

    return rowString;
  }
}
