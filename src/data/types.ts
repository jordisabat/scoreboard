export type GameStatus = "scheduled" | "in progress" | "final";

export interface GameType {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: GameStatus;
}
