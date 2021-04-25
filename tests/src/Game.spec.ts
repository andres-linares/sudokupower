import { Game } from '../../src/Game';

it('generates harder games depending on the difficulty', () => {
  const easyGame = new Game('EASY');
  const mediumGame = new Game('MEDIUM');
  const hardGame = new Game('HARD');
  const expertGame = new Game('EXPERT');

  const countFreeCells = (game: number[][]) => {
    let count = 0;
    game.forEach((row) => row.forEach((cell) => cell === 0 && count++));

    return count;
  };

  const freeCellsInEasyGame = countFreeCells(easyGame.board);
  const freeCellsInMediumGame = countFreeCells(mediumGame.board);
  const freeCellsInHardGame = countFreeCells(hardGame.board);
  const freeCellsInExpertGame = countFreeCells(expertGame.board);

  expect(freeCellsInEasyGame).toBeLessThan(freeCellsInMediumGame);
  expect(freeCellsInMediumGame).toBeLessThan(freeCellsInHardGame);
  expect(freeCellsInHardGame).toBeLessThan(freeCellsInExpertGame);
});
