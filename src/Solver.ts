import { Cell } from './Cell';
import cloneDeep from 'lodash.clonedeep';
import { Board } from './utils/Board';

export class Solver {
  private cells: Cell[][];

  constructor(cells: Cell[][], clone = true) {
    this.cells = clone ? cloneDeep(cells) : cells;
  }

  isSolvable(): boolean {
    this.solve();

    return true;
  }

  private solve() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = this.cells[i][j];
        if (cell.value !== null) return;

        const possibleValues = Board.freeInPosition(i, j, this.cells);
        if (possibleValues.length > 1) continue;

        cell.value = possibleValues[0];
      }
    }
  }
}
