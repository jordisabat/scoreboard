import { expect, test } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import testData from "./fixtures/games.fixtures";
import ControlBoard from "../components/ControlBoard";

test("if there are no games it should displays a default game", () => {
  const screen = render(<ControlBoard games={[]} onSave={() => {}} />);
  // TODO - add tests for selectors
  const gameSelector = screen.getByTestId("game-selector") as HTMLSelectElement;
  const statusSelector = screen.getByTestId(
    "status-selector"
  ) as HTMLSelectElement;
  const homeTeamInput = screen.getByPlaceholderText(
    "Home Team"
  ) as HTMLInputElement;
  const awayTeamInput = screen.getByPlaceholderText(
    "Away Team"
  ) as HTMLInputElement;
  const homeScoreInput = screen.getByPlaceholderText(
    "Home Score"
  ) as HTMLInputElement;
  const awayScoreInput = screen.getByPlaceholderText(
    "Away Score"
  ) as HTMLInputElement;

  expect(gameSelector.value).toBe("0");
  expect(statusSelector.value).toBe("scheduled");
  expect(homeTeamInput.value).toBe("");
  expect(awayTeamInput.value).toBe("");
  expect(homeScoreInput.value).toBe("0");
  expect(awayScoreInput.value).toBe("0");
  expect(
    screen.getByRole("button", {
      name: "Add Game",
    })
  ).toBeTruthy();
  screen.unmount();
});

test("on start it should have empty form", () => {
  const screen = render(<ControlBoard games={testData} onSave={() => {}} />);

  // TODO - add tests for selectors
  const gameSelector = screen.getByTestId("game-selector") as HTMLSelectElement;
  const statusSelector = screen.getByTestId(
    "status-selector"
  ) as HTMLSelectElement;
  const homeTeamInput = screen.getByPlaceholderText(
    "Home Team"
  ) as HTMLInputElement;
  const awayTeamInput = screen.getByPlaceholderText(
    "Away Team"
  ) as HTMLInputElement;
  const homeScoreInput = screen.getByPlaceholderText(
    "Home Score"
  ) as HTMLInputElement;
  const awayScoreInput = screen.getByPlaceholderText(
    "Away Score"
  ) as HTMLInputElement;

  expect(gameSelector.value).toBe("0");
  expect(statusSelector.value).toBe("scheduled");
  expect(homeTeamInput.value).toBe("");
  expect(awayTeamInput.value).toBe("");
  expect(homeScoreInput.value).toBe("0");
  expect(awayScoreInput.value).toBe("0");
  expect(
    screen.getByRole("button", {
      name: "Add Game",
    })
  ).toBeTruthy();
  screen.unmount();
});

test("When a game is selected it should pre-fill that game", () => {
  const screen = render(<ControlBoard games={testData} onSave={() => {}} />);
  const gameSelector = screen.getByTestId("game-selector") as HTMLSelectElement;
  const statusSelector = screen.getByTestId(
    "status-selector"
  ) as HTMLSelectElement;
  const homeTeamInput = screen.getByPlaceholderText(
    "Home Team"
  ) as HTMLInputElement;
  const awayTeamInput = screen.getByPlaceholderText(
    "Away Team"
  ) as HTMLInputElement;
  const homeScoreInput = screen.getByPlaceholderText(
    "Home Score"
  ) as HTMLInputElement;
  const awayScoreInput = screen.getByPlaceholderText(
    "Away Score"
  ) as HTMLInputElement;

  fireEvent.change(gameSelector, { target: { value: "1" } });

  expect(gameSelector.value).toBe("1");
  expect(statusSelector.value).toBe("in progress");
  expect(homeTeamInput.value).toBe("France");
  expect(awayTeamInput.value).toBe("Brazil");
  expect(homeScoreInput.value).toBe("3");
  expect(awayScoreInput.value).toBe("1");
  expect(
    screen.getByRole("button", {
      name: "Update Game",
    })
  ).toBeTruthy();

  screen.unmount();
});
