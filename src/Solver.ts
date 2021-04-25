import { Cell } from './Cell';
import cloneDeep from 'lodash.clonedeep';
import { Board } from './utils/Board';
import { Logger } from './utils/Logger';

export class Solver {
  private cells: Cell[][];

  constructor(cells: Cell[][], clone = true) {
    this.cells = clone ? cloneDeep(cells) : cells;
  }

  isSolvable(): boolean {
    this.solve();

    return this.isSolved;
  }

  private solve() {
    while (!this.isSolved) {
      const anySolution = this.setAnyPossibleValue();

      if (!anySolution) {
        console.log('NOPE', Logger.logBoard(this.cells));
        break;
      }
    }
  }

  private get isSolved(): boolean {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = this.cells[i][j];
        if (cell.value === null) return false;
      }
    }

    return true;
  }

  private setAnyPossibleValue(): boolean {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = this.cells[i][j];
        if (cell.value !== null) continue;

        const possibleValues = Board.freeInPosition(i, j, this.cells);
        if (possibleValues.length > 1) continue;

        cell.value = possibleValues[0];
        return true;
      }
    }

    return false;
  }
}
