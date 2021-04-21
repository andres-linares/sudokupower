import { Cell } from './Cell';

export class Validator {
  private readonly cells: Cell[][];

  constructor(cells: Cell[][]) {
    this.cells = cells;
  }

  isValid() {}
}
