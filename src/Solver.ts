import { Cell } from './Cell';
import cloneDeep from 'lodash.clonedeep';
import { Board } from './utils/Board';
import { Logger } from './utils/Logger';
import { Utils } from './utils/Utils';

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

      if (!anySolution) break;
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
        cell.possibilites = possibleValues;
        if (possibleValues.length > 1) continue;

        cell.value = possibleValues[0];
        return true;
      }
    }

    return this.solveWithPossibleValues();
  }

  private solveWithPossibleValues(): boolean {
    for (let i = 0; i < 9; i++) {
      const cellsInRow = this.cells[i];
      const cellsInColumn = this.cells.map((row) => row[i]);
      const cellsInQuadrant = this.getQuadrant(i, this.cells);

      const uniqueSolutionInRow = this.anyUniqueSolution(cellsInRow);
      const uniqueSolutionInColumn = this.anyUniqueSolution(cellsInColumn);
      const uniqueSolutionInQuadrant = this.anyUniqueSolution(cellsInQuadrant);

      let x, y;
      if (uniqueSolutionInRow) {
        x = i;
        y = cellsInRow.findIndex((cell) =>
          cell.possibilites.includes(uniqueSolutionInRow)
        );

        this.cells[x][y].value = uniqueSolutionInRow;
        return true;
      }
      if (uniqueSolutionInColumn) {
        y = i;
        x = cellsInColumn.findIndex((cell) =>
          cell.possibilites.includes(uniqueSolutionInColumn)
        );

        this.cells[x][y].value = uniqueSolutionInColumn;
        return true;
      }
      if (uniqueSolutionInQuadrant) {
        const foundIndex = cellsInQuadrant.findIndex((cell) =>
          cell.possibilites.includes(uniqueSolutionInQuadrant)
        );

        x = Math.floor(foundIndex / 3) + Math.floor(i / 3) * 3;
        y = (foundIndex % 3) + (i % 3) * 3;

        this.cells[x][y].value = uniqueSolutionInQuadrant;
        return true;
      }
    }

    return this.removePairs();
  }

  private removePairs(): boolean {
    for (let i = 0; i < 9; i++) {
      const row = this.cells[i];
      const pairsInRow = row
        .map((cell) => cell.possibilites)
        .filter((cell) => cell.length === 2);
      const equal = Utils.getRepeated(pairsInRow);

      if (equal.length > 0) {
        this.removeSolutionFromNumbers(row, equal);
      }
    }

    for (let i = 0; i < 9; i++) {
      const column = this.cells.map((row) => row[i]);
      const pairsInColumn = column
        .map((cell) => cell.possibilites)
        .filter((cell) => cell.length === 2);
      const equal = Utils.getRepeated(pairsInColumn);

      if (equal.length > 0) {
        this.removeSolutionFromNumbers(column, equal);
      }
    }

    for (let i = 0; i < 9; i++) {
      const quadrant = this.getQuadrant(i, this.cells);
      const pairsInQuadrant = quadrant
        .map((cell) => cell.possibilites)
        .filter((cell) => cell.length === 2);
      const equal = Utils.getRepeated(pairsInQuadrant);

      if (equal.length > 0) {
        this.removeSolutionFromNumbers(quadrant, equal);
      }
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = this.cells[i][j];

        if (cell.possibilites.length === 1) {
          cell.value = cell.possibilites[0];
          return true;
        }
      }
    }

    return false;
  }

  private removeSolutionFromNumbers(cells: Cell[], solution: number[][]) {
    for (const cell of cells) {
      if (cell.value !== null) continue;

      for (const x of solution) {
        if (JSON.stringify(x) === JSON.stringify(cell.possibilites)) continue;

        cell.possibilites = cell.possibilites.filter((value) => !x.includes(value));
      }
    }
  }

  private anyUniqueSolution(cells: Cell[]) {
    for (let i = 1; i <= 9; i++) {
      const solve = cells.filter((cell) => cell.possibilites.includes(i));
      if (solve.length === 1) return i;
    }
  }

  private getQuadrant(index: number, cells: Cell[][]) {
    const centerRow = Math.floor(index / 3) * 3 + 1;
    const centerColumn = (index % 3) * 3 + 1;
    const quadrant = [];

    for (let row = centerRow - 1; row <= centerRow + 1; row++) {
      for (let column = centerColumn - 1; column <= centerColumn + 1; column++) {
        quadrant.push(cells[row][column]);
      }
    }

    return quadrant;
  }
}
