import { expect, test } from "vitest";
import { GameType } from "../data/types"; // Replace "your-module" with the actual path to your module
import { isGameValid } from "../utils/validations";

test("Valid game item with scheduled status", () => {
  const gameItem: GameType = {
    id: 1,
    homeTeam: "Team A",
    awayTeam: "Team B",
    homeScore: 0,
    awayScore: 0,
    status: "scheduled",
  };

  const isValid = isGameValid(gameItem);
  expect(isValid).toBe(true);
});

test("Valid game item with completed status", () => {
  const gameItem: GameType = {
    id: 1,
    homeTeam: "Team A",
    awayTeam: "Team B",
    homeScore: 2,
    awayScore: 1,
    status: "in progress",
  };

  const isValid = isGameValid(gameItem);
  expect(isValid).toBe(true);
});

test("Invalid game item with missing home team", () => {
  const gameItem: GameType = {
    id: 1,
    homeTeam: "",
    awayTeam: "Team B",
    homeScore: 0,
    awayScore: 0,
    status: "scheduled",
  };

  const isValid = isGameValid(gameItem);
  expect(isValid).toBe(false);
});

test("Invalid game item with negative scores", () => {
  const gameItem: GameType = {
    id: 1,
    homeTeam: "Team A",
    awayTeam: "Team B",
    homeScore: -1,
    awayScore: 2,
    status: "finished",
  };

  const isValid = isGameValid(gameItem);
  expect(isValid).toBe(false);
});
