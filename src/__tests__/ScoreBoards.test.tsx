import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import ScoreBoards from "../components/ScoreBoard";
import dummyData from "./fixtures/scores.fixtures";

test("if there are no scores it should displays a default message", () => {
  const scores = render(<ScoreBoards scores={[]} />);
  expect(scores.getByText("No scores yet")).toBeTruthy();
});

test("if there are scores it should render correctly with some scores", () => {
  const scores = render(<ScoreBoards scores={dummyData} />);
  expect(scores.getByTestId("scoreboard")).toBeTruthy();
});
