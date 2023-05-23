import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import ScoreBoard from "../components/ScoreBoard";
import testData from "./fixtures/games.fixtures";

test("if there are no games it should displays a default message", () => {
  const screen = render(<ScoreBoard games={[]} />);
  expect(screen.getByText("No games yet")).toBeTruthy();
});

test("if there are games it should render correctly with some games", () => {
  const screen = render(<ScoreBoard games={testData} />);
  expect(screen.getByTestId("scoreboard")).toBeTruthy();
});
