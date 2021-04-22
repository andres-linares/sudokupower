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
    const MAX_TRIES_PER_ROW = 10;
    const MAX_TRIES_PER_QUADRANT = 5;

    let triesPerRow = 0;
    let triesPerQuadrant = 0;

    for (let row = 0; row < 9; row++) {
      this.cells.push([]);

      for (let column = 0; column < 9; column++) {
        const freeInRow = Board.freeInRow(row, this.cells);
        const freeInColumn = Board.freeInColumn(column, this.cells);
        const freeInQuadrant = Board.freeInQuadrant(row, column, this.cells);
        const availables = Utils.intersection(freeInColumn, freeInRow, freeInQuadrant);

        if (availables.length === 0) {
          if (triesPerRow < MAX_TRIES_PER_ROW) {
            this.cells = this.cells.slice(0, row);
            row = row - 1;
            triesPerRow += 1;
          } else if (triesPerQuadrant < MAX_TRIES_PER_QUADRANT) {
            this.cells = this.cells.slice(0, row - (row % 3));
            row = row - (row % 3) - 1;
            triesPerRow = 0;
            triesPerQuadrant += 1;
          } else {
            this.cells = [];
            row = -1;
            triesPerRow = 0;
            triesPerQuadrant = 0;
          }

          break;
        }

        const value = Random.pick(availables);
        this.cells[row].push(new Cell(value));
      }
    }

    return this.cells;
  }
}

export type difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
