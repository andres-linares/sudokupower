import { Difficulty } from '../interfaces';

export const FREE_CELLS_PERCENTAGE_BY_DIFFICULTY: { [key in Difficulty]: number } = {
  EASY: 0.35,
  MEDIUM: 0.45,
  HARD: 0.55,
  EXPERT: 0.7,
};
