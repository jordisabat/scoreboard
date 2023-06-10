import { GameEvent } from "../data/types";

export interface GameProps {
  id: number;
  homeTeam: string;
  awayTeam: string;
  gameEvents: GameEvent[];
  status: string;
  startTime: string;
}
