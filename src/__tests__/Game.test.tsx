import { expect, test } from "vitest";
import { cleanup, render, RenderResult } from "@testing-library/react";
import { GameProps } from "../components/Interfaces";
import Game from "../components/Game";

const match: GameProps = {
  id: 1,
  homeTeam: "Home Team",
  awayTeam: "Away Team",
  homeScore: 3,
  awayScore: 1,
  status: "scheduled",
};

test("renders the game information correctly", () => {
  const screen: RenderResult = render(
    <Game
      id={match.id}
      homeTeam={match.homeTeam}
      awayTeam={match.awayTeam}
      homeScore={match.homeScore}
      awayScore={match.awayScore}
      status={match.status}
      key={match.id}
    />
  );

  expect(screen.getByText("Home Team")).toBeTruthy();
  expect(screen.getByText("Away Team")).toBeTruthy();
  expect(screen.getByText("Game 1 - Scheduled")).toBeTruthy();
  expect(screen.getByText("3")).toBeTruthy();
  expect(screen.getByText("1")).toBeTruthy();

  cleanup();
  screen.unmount();
});
