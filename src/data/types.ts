export type GameStatus = "scheduled" | "in progress" | "final";

export interface ScoreType {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: GameStatus;
}
