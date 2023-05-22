import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import ScoreBoards from "../components/ScoreBoards";

test("displays a default message", () => {
  const scores = render(<ScoreBoards />);
  expect(scores.getByText("No scores yet")).toBeTruthy();
});
