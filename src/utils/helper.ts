import { GameType } from "../data/types";

const sortGames = (games: GameType[]): GameType[] => {
  return games.sort((current, next) => {
    const currentTotalGoals = current.homeScore + current.awayScore;
    const nextTotalGoals = next.homeScore + next.awayScore;
    return nextTotalGoals - currentTotalGoals;
  });
};

export const filterGames = (games: GameType[]): GameType[] => {
  const activeGames = games.filter((game) => {
    return game.status !== "finished";
  });
  return sortGames(activeGames);
};

export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
