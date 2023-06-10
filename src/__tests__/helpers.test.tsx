import { expect, test, describe } from "vitest";
import { GameType } from "../data/types";
import {
  filterGames,
  capitalize,
  getInitials,
  getMinutesPassed,
} from "../utils/helper";

describe("filterGames", () => {
  const games: GameType[] = [
    {
      id: 1,
      homeTeam: "Team A",
      awayTeam: "Team B",
      gameEvents: [],
      status: "in progress",
      startTime: "",
    },
    {
      id: 2,
      homeTeam: "Team C",
      awayTeam: "Team D",
      gameEvents: [],
      status: "scheduled",
      startTime: "",
    },
    {
      id: 3,
      homeTeam: "Team E",
      awayTeam: "Team F",
      gameEvents: [
        {
          id: 1,
          type: "goal",
          player: "Neymar",
          time: "2021-07-01T18:05:00.000Z",
          team: "Team E",
        },
        {
          id: 2,
          type: "goal",
          player: "Neymar",
          time: "2021-07-01T18:10:00.000Z",
          team: "Team F",
        },
      ],
      status: "in progress",
      startTime: "2021-07-01T18:00:00.000Z",
    },
    {
      id: 4,
      homeTeam: "Team E",
      awayTeam: "Team F",
      gameEvents: [
        {
          id: 1,
          type: "goal",
          player: "Neymar",
          time: "2021-07-01T18:05:00.000Z",
          team: "Team C",
        },
        {
          id: 2,
          type: "goal",
          player: "Neymar",
          time: "2021-07-01T18:10:00.000Z",
          team: "Team D",
        },
      ],
      status: "finished",
      startTime: "2021-07-01T18:00:00.000Z",
    },
  ];

  test("should return active games sorted in descending order based on total number of goals", () => {
    const sortedGames: GameType[] = filterGames(games);
    expect(sortedGames.map((g) => g.id)).toEqual([3, 1, 2]);
  });

  test("should return an empty array if are no games", () => {
    const sortedGames: GameType[] = filterGames([] as GameType[]);

    expect(sortedGames).toEqual([]);
  });

  test("if games have same number of goals it should return sorted by descending id", () => {
    const initialGames: GameType[] = [
      {
        id: 3,
        homeTeam: "Team E",
        awayTeam: "Team F",
        gameEvents: [
          {
            id: 1,
            type: "goal",
            player: "Neymar",
            time: "2021-07-01T18:05:00.000Z",
            team: "Team E",
          },
          {
            id: 2,
            type: "goal",
            player: "Neymar",
            time: "2021-07-01T18:10:00.000Z",
            team: "Team F",
          },
        ],
        status: "in progress",
        startTime: "2021-07-01T18:00:00.000Z",
      },
      {
        id: 2,
        homeTeam: "Team C",
        awayTeam: "Team D",
        gameEvents: [],
        status: "scheduled",
        startTime: "2021-07-01T18:00:00.000Z",
      },
      {
        id: 1,
        homeTeam: "Team E",
        awayTeam: "Team F",
        gameEvents: [
          {
            id: 1,
            type: "goal",
            player: "Neymar",
            time: "2021-07-01T18:05:00.000Z",
            team: "Team E",
          },
          {
            id: 2,
            type: "goal",
            player: "Neymar",
            time: "2021-07-01T18:10:00.000Z",
            team: "Team F",
          },
        ],
        status: "in progress",
        startTime: "2021-07-01T18:00:00.000Z",
      },
      {
        id: 4,
        homeTeam: "Team E",
        awayTeam: "Team F",
        gameEvents: [],
        status: "finished",
        startTime: "2021-07-01T18:00:00.000Z",
      },
    ];

    const sortedGames: GameType[] = filterGames(initialGames);

    expect(sortedGames.map((g) => g.id)).toEqual([1, 3, 2]);
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

describe("getInitials", () => {
  test("returns the capitalized initials of a football player name", () => {
    const playerName = "Lionel Andres Messi";
    const result = getInitials(playerName);
    expect(result).toEqual("LAM");
  });

  test("returns an empty string when the name is empty", () => {
    const emptyName = "";
    const result = getInitials(emptyName);
    expect(result).toEqual("");
  });

  test("handles names with single word", () => {
    const singleWordName = "Neymar";
    const result = getInitials(singleWordName);
    expect(result).toEqual("N");
  });

  test("handles names with multiple spaces between words", () => {
    const multipleSpacesName = "  Cristiano    Ronaldo  ";
    const result = getInitials(multipleSpacesName);
    expect(result).toEqual("CR");
  });
});

describe("getMinutesPassed", () => {
  test("calculates minutes passed correctly", () => {
    const startDateTime = "2023-06-09T09:00:00.000Z";
    const endDateTime = "2023-06-09T09:30:00.000Z";
    const expectedMinutesPassed = 30;

    const minutesPassed = getMinutesPassed(startDateTime, endDateTime);

    expect(minutesPassed).toEqual(expectedMinutesPassed);
  });

  test("returns 0 minutes passed when start and end times are the same", () => {
    const startDateTime = "2023-06-09T09:00:00.000Z" as string;
    const endDateTime = "2023-06-09T09:00:00.000Z" as string;

    const minutesPassed = getMinutesPassed(startDateTime, endDateTime);

    expect(minutesPassed).toEqual(0);
  });
});
