export type GameStatus = "scheduled" | "in progress" | "finished";
export type typeEvent = "goal" | "yellow" | "red" | "start" | "end";

export type GameEvent = {
  id: number;
  player: string;
  time: string;
  type: typeEvent;
  team: string;
};

export interface GameType {
  id: number;
  homeTeam: string;
  awayTeam: string;
  gameEvents: GameEvent[];
  status: GameStatus;
  startTime: string;
}
