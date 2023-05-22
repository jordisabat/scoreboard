import { expect, test } from "vitest";
import { cleanup, render, RenderResult } from "@testing-library/react";
import { ScoreProps } from "../components/Interfaces";
import Score from "../components/Score";

const match: ScoreProps = {
  id: 1,
  homeTeam: "Home Team",
  awayTeam: "Away Team",
  homeScore: 3,
  awayScore: 1,
  status: "Final",
};

test("renders the score information correctly", async () => {
  const score: RenderResult = render(
    <Score
      id={match.id}
      homeTeam={match.homeTeam}
      awayTeam={match.awayTeam}
      homeScore={match.homeScore}
      awayScore={match.awayScore}
      status={match.status}
      key={match.id}
    />
  );

  const scoreWrapper: HTMLElement = await score.findByTestId("score");
  expect(scoreWrapper.textContent).toContain(
    "1. Home Team 3 - Away Team 1 (Final)"
  );
  cleanup();
});
