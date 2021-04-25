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
    const possibleValues: number[][][] = [];

    for (let i = 0; i < 9; i++) {
      const possibleValuesInRow: number[][] = [];

      for (let j = 0; j < 9; j++) {
        const cell = this.cells[i][j];
        if (cell.value !== null) {
          possibleValuesInRow.push([]);
          continue;
        }

        const possibleValues = Board.freeInPosition(i, j, this.cells);
        possibleValuesInRow.push(possibleValues);
        if (possibleValues.length > 1) continue;

        cell.value = possibleValues[0];
        return true;
      }

      possibleValues.push(possibleValuesInRow);
    }

    return this.solveWithPossibleValues(possibleValues);
  }

  private solveWithPossibleValues(possibleValues: number[][][]): boolean {
    // Check unique in row
    for (let i = 0; i < 9; i++) {
      const solutionsInRow = possibleValues[i];
      const solutionsInColumn = possibleValues.map((row) => row[i]);
      const solutionsInQuadrant = this.getQuadrant(i, possibleValues) as number[][];

      const uniqueSolutionInRow = this.anyUniqueSolution(solutionsInRow);
      const uniqueSolutionInColumn = this.anyUniqueSolution(solutionsInColumn);
      const uniqueSolutionInQuadrant = this.anyUniqueSolution(solutionsInQuadrant);

      let x, y;
      if (uniqueSolutionInRow) {
        x = i;
        y = solutionsInRow.findIndex((solutions) =>
          solutions.includes(uniqueSolutionInRow)
        );

        this.cells[x][y].value = uniqueSolutionInRow;
        return true;
      }
      if (uniqueSolutionInColumn) {
        y = i;
        x = solutionsInColumn.findIndex((solutions) =>
          solutions.includes(uniqueSolutionInColumn)
        );

        this.cells[x][y].value = uniqueSolutionInColumn;
        return true;
      }
      if (uniqueSolutionInQuadrant) {
        const foundIndex = solutionsInQuadrant.findIndex((solutions) =>
          solutions.includes(uniqueSolutionInQuadrant)
        );

        x = Math.floor(foundIndex / 3) + Math.floor(i / 3) * 3;
        y = (foundIndex % 3) + (i % 3) * 3;

        this.cells[x][y].value = uniqueSolutionInQuadrant;
        return true;
      }
    }

    return false;
  }

  private anyUniqueSolution(solutions: number[][]) {
    for (let i = 1; i <= 9; i++) {
      const solve = solutions.filter((solution) => solution.includes(i));
      if (solve.length === 1) return i;
    }
  }

  private getQuadrant(index: number, values: any) {
    const centerRow = Math.floor(index / 3) * 3 + 1;
    const centerColumn = (index % 3) * 3 + 1;
    const quadrant = [];

    for (let row = centerRow - 1; row <= centerRow + 1; row++) {
      for (let column = centerColumn - 1; column <= centerColumn + 1; column++) {
        quadrant.push(values[row][column]);
      }
    }

    return quadrant;
  }
}
