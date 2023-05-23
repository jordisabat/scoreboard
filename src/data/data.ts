import { GameType } from "./types";

export const initialData: GameType[] = [
  {
    id: 1,
    homeTeam: "France",
    awayTeam: "Brazil",
    homeScore: 0,
    awayScore: 0,
    status: "scheduled",
  },
  {
    id: 2,
    homeTeam: "Germany",
    awayTeam: "Italy",
    homeScore: 2,
    awayScore: 2,
    status: "finished",
  },
  {
    id: 3,
    homeTeam: "England",
    awayTeam: "Spain",
    homeScore: 1,
    awayScore: 0,
    status: "scheduled",
  },
  {
    id: 4,
    homeTeam: "Netherlands",
    awayTeam: "Argentina",
    homeScore: 0,
    awayScore: 0,
    status: "in progress",
  },
  {
    id: 5,
    homeTeam: "Portugal",
    awayTeam: "Belgium",
    homeScore: 0,
    awayScore: 0,
    status: "scheduled",
  },
];
