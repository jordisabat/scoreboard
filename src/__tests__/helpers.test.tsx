import { expect, test } from "vitest";
import { GameType } from "../data/types";
import { filterGames } from "../utils/helper";

const games: GameType[] = [
  {
    id: 1,
    homeTeam: "Team A",
    awayTeam: "Team B",
    homeScore: 2,
    awayScore: 1,
    status: "in progress",
  },
  {
    id: 2,
    homeTeam: "Team C",
    awayTeam: "Team D",
    homeScore: 3,
    awayScore: 0,
    status: "scheduled",
  },
  {
    id: 3,
    homeTeam: "Team E",
    awayTeam: "Team F",
    homeScore: 7,
    awayScore: 1,
    status: "in progress",
  },
  {
    id: 4,
    homeTeam: "Team E",
    awayTeam: "Team F",
    homeScore: 3,
    awayScore: 3,
    status: "finished",
  },
];

test("should return active games sorted in descending order based on total number of goals", () => {
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
      status: "in progress",
    },
    {
      id: 2,
      homeTeam: "Team C",
      awayTeam: "Team D",
      homeScore: 3,
      awayScore: 0,
      status: "scheduled",
    },
  ];

  const sortedGames: GameType[] = filterGames(games);

  expect(sortedGames).toEqual(expectedSortedGames);
});

test("should return an empty array if are no games", () => {
  const sortedGames: GameType[] = filterGames([] as GameType[]);

  expect(sortedGames).toEqual([]);
});
