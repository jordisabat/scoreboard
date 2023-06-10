import { expect, test } from "vitest";
import { GameEvent, GameType } from "../data/types"; // Replace "your-module" with the actual path to your module
import { isGameEventValid, isGameValid } from "../utils/validations";

test("Valid game item with scheduled status", () => {
  const gameItem: GameType = {
    id: 0,
    homeTeam: "Team A",
    awayTeam: "Team B",
    gameEvents: [],
    status: "scheduled",
  };

  const isValid = isGameValid(gameItem);
  expect(isValid).toBe(true);
});

test("InValid game item with completed status", () => {
  const gameItem: GameType = {
    id: 0,
    homeTeam: "",
    awayTeam: "Team B",
    gameEvents: [],
    status: "scheduled",
  };

  const isValid = isGameValid(gameItem);
  expect(isValid).toBe(false);
});

test("Invalid game item when there is not player name", () => {
  const gameItem: GameType = {
    id: 1,
    homeTeam: "Team A",
    awayTeam: "Team B",
    gameEvents: [
      {
        id: 1,
        type: "goal",
        player: "",
        team: "home",
        time: "10",
      },
    ],
    status: "in progress",
  };

  const isValid =
    isGameValid(gameItem) && isGameEventValid(gameItem.gameEvents[0]);
  expect(isValid).toBe(false);
});

test("Invalid game item when there is not team name", () => {
  const gameItem: GameType = {
    id: 1,
    homeTeam: "Team A",
    awayTeam: "Team B",
    gameEvents: [
      {
        id: 1,
        type: "goal",
        player: "Messi",
        team: "",
        time: "10",
      },
    ],
    status: "in progress",
  };

  const isValid =
    isGameValid(gameItem) && isGameEventValid(gameItem.gameEvents[0]);
  expect(isValid).toBe(false);
});

test("Invalid game item when there is not time", () => {
  const gameItem: GameType = {
    id: 1,
    homeTeam: "Team A",
    awayTeam: "Team B",
    gameEvents: [
      {
        id: 1,
        type: "goal",
        player: "Messi",
        team: "Team A",
        time: "",
      },
    ],
    status: "in progress",
  };

  const isValid =
    isGameValid(gameItem) && isGameEventValid(gameItem.gameEvents[0]);
  expect(isValid).toBe(false);
});
