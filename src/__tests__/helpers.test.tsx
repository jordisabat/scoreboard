import { expect, test } from "vitest";
import { Score as ScoreType } from "../data/types";
import { sortScores } from "../utils/helper";

const scores: ScoreType[] = [
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

test("should return scores sorted in descending order based on total number of goals", () => {
  const expectedSortedScores: ScoreType[] = [
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

  const sortedScores: ScoreType[] = sortScores(scores);

  expect(sortedScores).toEqual(expectedSortedScores);
});
