import { expect, test, describe } from "vitest";
import { GameType } from "../data/types";
import { filterGames, capitalize } from "../utils/helper";

describe("filterGames", () => {
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

  test("if games have same number of goals it should return sorted by descending id", () => {
    const initialGames: GameType[] = [
      {
        id: 3,
        homeTeam: "Team A",
        awayTeam: "Team B",
        homeScore: 3,
        awayScore: 3,
        status: "in progress",
      },
      {
        id: 2,
        homeTeam: "Team C",
        awayTeam: "Team D",
        homeScore: 1,
        awayScore: 3,
        status: "scheduled",
      },
      {
        id: 1,
        homeTeam: "Team E",
        awayTeam: "Team F",
        homeScore: 3,
        awayScore: 3,
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

    const expectedSortedGames: GameType[] = [
      {
        id: 1,
        homeTeam: "Team E",
        awayTeam: "Team F",
        homeScore: 3,
        awayScore: 3,
        status: "in progress",
      },
      {
        id: 3,
        homeTeam: "Team A",
        awayTeam: "Team B",
        homeScore: 3,
        awayScore: 3,
        status: "in progress",
      },
      {
        id: 2,
        homeTeam: "Team C",
        awayTeam: "Team D",
        homeScore: 1,
        awayScore: 3,
        status: "scheduled",
      },
    ];

    const sortedGames: GameType[] = filterGames(initialGames);

    expect(sortedGames).toEqual(expectedSortedGames);
  });
});

describe("capitalize", () => {
  test("capitalizes the first letter of a string", () => {
    const input = "hello";
    const expectedOutput = "Hello";
    const result = capitalize(input);
    expect(result).toEqual(expectedOutput);
  });

  test("returns an empty string for an empty input", () => {
    const input = "";
    const expectedOutput = "";
    const result = capitalize(input);
    expect(result).toEqual(expectedOutput);
  });

  test("keeps the first letter capitalized for an already capitalized string", () => {
    const input = "World";
    const expectedOutput = "World";
    const result = capitalize(input);
    expect(result).toEqual(expectedOutput);
  });

  test("capitalizes only the first letter and keeps the rest unchanged for a string with multiple words", () => {
    const input = "hello world";
    const expectedOutput = "Hello world";
    const result = capitalize(input);
    expect(result).toEqual(expectedOutput);
  });
});
