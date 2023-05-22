import { expect, test } from "vitest";
import { GameType } from "../data/types";
import { sortGames } from "../utils/helper";

const games: GameType[] = [
  {
    id: 1,
    homeTeam: "Team A",
    awayTeam: "Team B",
    homeScore: 2,
    awayScore: 1,
    status: "final",
  },
  {
    id: 2,
    homeTeam: "Team C",
    awayTeam: "Team D",
    homeScore: 3,
    awayScore: 0,
    status: "final",
  },
  {
    id: 3,
    homeTeam: "Team E",
    awayTeam: "Team F",
    homeScore: 7,
    awayScore: 1,
    status: "in progress",
  },
];

test("should return games sorted in descending order based on total number of goals", () => {
  const expectedSortedGames: GameType[] = [
    {
      id: 3,
      homeTeam: "Team E",
      awayTeam: "Team F",
      homeScore: 7,
      awayScore: 1,
      status: "in progress",
    },
    {
      id: 1,
      homeTeam: "Team A",
      awayTeam: "Team B",
      homeScore: 2,
      awayScore: 1,
      status: "final",
    },
    {
      id: 2,
      homeTeam: "Team C",
      awayTeam: "Team D",
      homeScore: 3,
      awayScore: 0,
      status: "final",
    },
  ];

  const sortedGames: GameType[] = sortGames(games);

  expect(sortedGames).toEqual(expectedSortedGames);
});
