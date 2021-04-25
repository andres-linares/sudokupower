import { Cell } from '../../src/Cell';
import { arrayToCells } from '../../src/io';
import { Solver } from '../../src/Solver';
import easyGames from '../fixtures/easy.json';

describe('cloneDeep', () => {
  it('clones deep the values when clone is true', () => {
    const cells = arrayToCells(easyGames.games[0].start);
    const firstEmptyCell = getFirstEmptyCell(cells);

    const solver = new Solver(cells);
    solver.isSolvable();

    if (!firstEmptyCell) return;
    expect(firstEmptyCell.manipulated).toEqual(false);
  });

  it('no clones the values when clone is false', () => {
    const cells = arrayToCells(easyGames.games[0].start);
    const firstEmptyCell = getFirstEmptyCell(cells);

    const solver = new Solver(cells, false);
    solver.isSolvable();

    if (!firstEmptyCell) return;
    expect(firstEmptyCell.manipulated).toEqual(true);
  });
});

function getFirstEmptyCell(cells: Cell[][]): Cell | undefined {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = cells[i][j];

      if (cell.value === null) return cell;
    }
  }
}
