import { GameType } from "../data/types";

const formIsValid = (gameItem: GameType): boolean => {
  return (
    gameItem.homeTeam !== "" &&
    gameItem.awayTeam !== "" &&
    gameItem.homeScore >= 0 &&
    gameItem.awayScore >= 0
  );
};

const scoreIsValid = (gameItem: GameType): boolean => {
  return gameItem.status === "scheduled"
    ? gameItem.homeScore === 0 && gameItem.awayScore === 0
    : true;
};

export const isGameValid = (gameItem: GameType): boolean => {
  return formIsValid(gameItem) && scoreIsValid(gameItem);
};
