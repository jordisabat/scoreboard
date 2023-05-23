import { GameType } from "../data/types";

const sortGames = (games: GameType[]): GameType[] => {
  return games.sort((current, next) => {
    const currentTotalGoals = current.homeScore + current.awayScore;
    const nextTotalGoals = next.homeScore + next.awayScore;
    return nextTotalGoals === currentTotalGoals
      ? current.id - next.id // If total goals are the same, sort by game ID in ascending order
      : nextTotalGoals - currentTotalGoals; // Sort by total goals in descending order
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
