import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import ScoreBoard from "../components/ScoreBoard";
import testData from "./fixtures/games.fixtures";

test("if there are no games it should displays a default message", () => {
  const games = render(<ScoreBoard games={[]} />);
  expect(games.getByText("No games yet")).toBeTruthy();
});

test("if there are games it should render correctly with some games", () => {
  const games = render(<ScoreBoard games={testData} />);
  expect(games.getByTestId("scoreboard")).toBeTruthy();
});
