import { Cell } from './Cell';
import { Generator } from './Generator';
import { Difficulty } from './interfaces';
import { cellsToArray } from './io';

export class Game {
  private difficulty: Difficulty;
  private generator: Generator;
  private cells: Cell[][];

  constructor(difficulty: Difficulty) {
    this.difficulty = difficulty;
    this.generator = new Generator(this.difficulty);
    this.cells = this.generator.generate();
  }

  get board(): number[][] {
    return cellsToArray(this.cells);
  }
}
