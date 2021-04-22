import easyGames from '../fixtures/easy.json';
import mediumGames from '../fixtures/medium.json';
import hardGames from '../fixtures/hard.json';
import expertGames from '../fixtures/expert.json';
import invalidGames from '../fixtures/invalid.json';
import { Cell } from '../../src/Cell';
import { Validator } from '../../src/Validator';

it('should return valid for all valid boards', () => {
  const allGames = [
    ...easyGames.games,
    ...mediumGames.games,
    ...hardGames.games,
    ...expertGames.games,
  ];

  allGames.forEach((game) => {
    const { start, finish } = game;
    const startGame = transformGameFixtureToCells(start);
    const finishGame = transformGameFixtureToCells(finish);

    const startValidator = new Validator(startGame);
    const finishValidator = new Validator(finishGame);

    const validStartGame = startValidator.isValid();
    const validFinishGame = finishValidator.isValid();

    expect(validStartGame).toEqual(true);
    expect(validFinishGame).toEqual(true);
  });
});

it('should return invalid for all invalid boards', () => {
  const allGames = [...invalidGames.games];

  allGames.forEach((game) => {
    const { start, finish } = game;
    const startGame = transformGameFixtureToCells(start);
    const finishGame = transformGameFixtureToCells(finish);

    const startValidator = new Validator(startGame);
    const finishValidator = new Validator(finishGame);

    const validStartGame = startValidator.isValid();
    const validFinishGame = finishValidator.isValid();

    expect(validStartGame).toEqual(false);
    expect(validFinishGame).toEqual(false);
  });
});

function transformGameFixtureToCells(game: number[][]): Cell[][] {
  const cells: Cell[][] = [];

  for (let row = 0; row < 9; row++) {
    const rowOfCells: Cell[] = [];

    for (let column = 0; column < 9; column++) {
      const value = game[row][column];
      const cell = new Cell(value === 0 ? null : value);

      rowOfCells.push(cell);
    }

    cells.push(rowOfCells);
  }

  return cells;
}
