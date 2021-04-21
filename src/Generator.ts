import { Cell } from './Cell';
import { Board } from './utils/Board';
import { Random } from './utils/Random';
import { Utils } from './utils/Utils';

export class Generator {
  private difficulty: difficulty;
  private cells: Cell[][] = [];

  constructor(difficulty: difficulty = 'EASY') {
    this.difficulty = difficulty;
  }

  generate(): Cell[][] {
    this.generateSolvedGame();

    return this.cells;
  }

  generateSolvedGame(): Cell[][] {
    for (let row = 0; row < 9; row++) {
      this.cells.push([]);

      for (let column = 0; column < 9; column++) {
        const freeInRow = Board.freeInRow(row, this.cells);
        const freeInColumn = Board.freeInColumn(column, this.cells);
        const availables = Utils.intersection(freeInColumn, freeInRow);

        const value = Random.pick(availables);
        if (!value) {
          this.cells = this.cells.splice(0, row);
          row--;

          break;
        }

        this.cells[row].push(new Cell(value));
      }
    }

    return this.cells;
  }
}

export type difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
