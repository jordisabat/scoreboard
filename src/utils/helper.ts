import { GameType } from "../data/types";

const sortGames = (games: GameType[]): GameType[] => {
  return games.sort((current, next) => {
    const currentTotalGoals = current.gameEvents.filter(
      (g) => g.type === "goal"
    ).length;
    const nextTotalGoals = next.gameEvents.filter(
      (g) => g.type === "goal"
    ).length;
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

export const getInitials = (name: string): string => {
  if (name === "") return "";
  const words: string[] = name.split(" ");
  const initials: string[] = words.map((word: string) =>
    word.charAt(0).toUpperCase()
  );
  return initials.join("");
};

export const getMinutesPassed = (
  startTime: string,
  endTime: string
): number => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  // Calculate the time difference in milliseconds
  const timeDiff = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to minutes
  const minutesPassed = Math.floor(timeDiff / (1000 * 60));

  return minutesPassed;
};
