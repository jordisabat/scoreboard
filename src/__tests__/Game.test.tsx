import { expect, test } from "vitest";
import { cleanup, render, RenderResult } from "@testing-library/react";
import { GameProps } from "../components/Interfaces";
import Game from "../components/Game";

const match: GameProps = {
  id: 1,
  homeTeam: "Brazil",
  awayTeam: "Argentina",
  gameEvents: [
    {
      id: 1,
      type: "goal",
      player: "Neymar",
      time: "2021-07-01T18:00:00.000Z",
      team: "Brazil",
    },
  ],
  status: "scheduled",
  startTime: "",
};

test("renders the game information correctly", () => {
  const screen: RenderResult = render(
    <Game
      id={match.id}
      homeTeam={match.homeTeam}
      awayTeam={match.awayTeam}
      gameEvents={match.gameEvents}
      startTime={match.startTime}
      status={match.status}
      key={match.id}
    />
  );

  expect(screen.getByText("Brazil")).toBeTruthy();
  expect(screen.getByText("Argentina")).toBeTruthy();
  expect(screen.getByText("Game 1 - Scheduled")).toBeTruthy();
  expect(screen.getByText("1")).toBeTruthy();
  expect(screen.getByText("0")).toBeTruthy();

  cleanup();
  screen.unmount();
});
