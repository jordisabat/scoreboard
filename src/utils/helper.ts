import { GameType } from "../data/types";

export const sortGames = (games: GameType[]): GameType[] => {
  return games.sort((current, next) => {
    const currentTotalGoals = current.homeScore + current.awayScore;
    const nextTotalGoals = next.homeScore + next.awayScore;
    return nextTotalGoals - currentTotalGoals;
  });
};
