import easyGames from '../fixtures/easy.json';
import mediumGames from '../fixtures/medium.json';
import hardGames from '../fixtures/hard.json';
import expertGames from '../fixtures/expert.json';
import invalidGames from '../fixtures/invalid.json';
import { Validator } from '../../src/Validator';
import { arrayToCells } from '../../src/io';

it('should return valid for all valid boards', () => {
  const allGames = [
    ...easyGames.games,
    ...mediumGames.games,
    ...hardGames.games,
    ...expertGames.games,
  ];

  allGames.forEach((game) => {
    const { start, finish } = game;
    const startGame = arrayToCells(start);
    const finishGame = arrayToCells(finish);

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
    const startGame = arrayToCells(start);
    const finishGame = arrayToCells(finish);

    const startValidator = new Validator(startGame);
    const finishValidator = new Validator(finishGame);

    const validStartGame = startValidator.isValid();
    const validFinishGame = finishValidator.isValid();

    expect(validStartGame).toEqual(false);
    expect(validFinishGame).toEqual(false);
  });
});
