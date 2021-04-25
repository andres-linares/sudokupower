import { Cell } from '../../src/Cell';
import { arrayToCells, cellsToArray } from '../../src/io';
import { Solver } from '../../src/Solver';
import easyGames from '../fixtures/easy.json';
import mediumGames from '../fixtures/medium.json';
import hardGames from '../fixtures/hard.json';
import expertGames from '../fixtures/expert.json';

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

it('solves easy games', () => {
  easyGames.games.forEach((game) => {
    const theGame = arrayToCells(game.start);
    const solver = new Solver(theGame, false);

    solver.isSolvable();
    const finishGame = cellsToArray(theGame);

    expect(finishGame).toEqual(game.finish);
  });
});

it('solves medium games', () => {
  mediumGames.games.forEach((game) => {
    const theGame = arrayToCells(game.start);
    const solver = new Solver(theGame, false);

    solver.isSolvable();
    const finishGame = cellsToArray(theGame);

    expect(finishGame).toEqual(game.finish);
  });
});

it('solves hard games', () => {
  hardGames.games.forEach((game) => {
    const theGame = arrayToCells(game.start);
    const solver = new Solver(theGame, false);

    solver.isSolvable();
    const finishGame = cellsToArray(theGame);

    expect(finishGame).toEqual(game.finish);
  });
});

it.skip('solves expert games', () => {
  expertGames.games.forEach((game) => {
    const theGame = arrayToCells(game.start);
    const solver = new Solver(theGame, false);

    solver.isSolvable();
    const finishGame = cellsToArray(theGame);

    expect(finishGame).toEqual(game.finish);
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
