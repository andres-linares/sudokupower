import { Cell } from './Cell';

export class Validator {
  private readonly cells: Cell[][];

  constructor(cells: Cell[][]) {
    this.cells = cells;
  }

  isValid(): boolean {
    const validRows = this.rowsAreValid();
    const validColumns = this.columnsAreValid();
    const validQuadrants = this.quadrantsAreValid();

    return validRows && validColumns && validQuadrants;
  }

  private rowsAreValid() {
    for (let i = 0; i < 9; i++) {
      const row = this.cells[i];
      if (this.areCellsRepeated(row)) return false;
    }

    return true;
  }

  private columnsAreValid() {
    for (let i = 0; i < 9; i++) {
      const column = this.cells.map((row) => row[i]);
      if (this.areCellsRepeated(column)) return false;
    }

    return true;
  }

  private quadrantsAreValid() {
    for (let i = 0; i < 9; i++) {
      const centerRow = Math.floor(i / 3) * 3 + 1;
      const centerColumn = (i % 3) * 3 + 1;
      const quadrant: Cell[] = [];

      for (let row = centerRow - 1; row <= centerRow + 1; row++) {
        for (let column = centerColumn - 1; column <= centerColumn + 1; column++) {
          quadrant.push(this.cells[row][column]);
        }
      }

      if (this.areCellsRepeated(quadrant)) return false;
    }

    return true;
  }

  private areCellsRepeated(cells: Cell[]) {
    const values = cells.map((cell) => cell.value);
    const numericValues = values.filter((value) => value !== null) as number[];
    const uniqueValues = [...new Set(numericValues)];

    return numericValues.length !== uniqueValues.length;
  }
}
