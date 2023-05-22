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
  status: "Final",
};

test("renders the game information correctly", async () => {
  const game: RenderResult = render(
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

  const gameWrapper: HTMLElement = await game.findByTestId("game");
  expect(gameWrapper.textContent).toContain(
    "1. Home Team 3 - Away Team 1 (Final)"
  );
  cleanup();
});