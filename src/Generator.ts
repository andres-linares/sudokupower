import { Cell } from './Cell';
import { Random } from './utils/Random';

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
      const rowOfCells = [];
      let availables = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      for (let column = 0; column < 9; column++) {
        const value = Random.pick(availables);
        rowOfCells.push(new Cell(value));

        availables = availables.filter((number) => number !== value);
      }

      this.cells.push(rowOfCells);
    }

    return this.cells;
  }
}

export type difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
