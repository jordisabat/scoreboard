import { GameType, GameEvent } from "../data/types";

export const isGameValid = (gameItem: GameType): boolean => {
  return gameItem.homeTeam !== "" && gameItem.awayTeam !== "";
};

export const isGameEventValid = (gameEvent: GameEvent): boolean => {
  return (
    gameEvent.team !== "" &&
    gameEvent.player !== "" &&
    gameEvent.time !== "" &&
    gameEvent.type !== undefined &&
    gameEvent.type !== null
  );
};
