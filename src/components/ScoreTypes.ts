export type GameStatus = "scheduled" | "inProgress" | "final";

export interface Score {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: GameStatus;
}
