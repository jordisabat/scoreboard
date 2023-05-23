import { expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";
import ControlBoard from "../components/ControlBoard";
import { GameType } from "../data/types";

const defaultGame: GameType = {
  id: 0,
  homeTeam: "",
  awayTeam: "",
  homeScore: 0,
  awayScore: 0,
  status: "scheduled",
};

test("if default game is passed it should displays a default game", () => {
  const screen = render(<ControlBoard game={defaultGame} onSave={() => {}} />);

  const statusSelector = screen.getByTestId("status-selector");
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

  expect(statusSelector.childNodes[0].textContent).toBe("Scheduled");
  expect(homeTeamInput.value).toBe("");
  expect(awayTeamInput.value).toBe("");
  expect(homeScoreInput.value).toBe("0");
  expect(awayScoreInput.value).toBe("0");
  expect(
    screen.getByRole("button", {
      name: "Add Game",
    })
  ).toBeTruthy();

  cleanup();
  screen.unmount();
});

test("when a game is passed it should pre-fill that game", () => {
  const testGame: GameType = {
    id: 1,
    homeTeam: "France",
    awayTeam: "Brazil",
    homeScore: 3,
    awayScore: 1,
    status: "in progress",
  };
  const screen = render(<ControlBoard game={testGame} onSave={() => {}} />);

  const statusSelector = screen.getByTestId("status-selector");
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

  expect(statusSelector.childNodes[0].textContent).toBe("In progress");
  expect(homeTeamInput.value).toBe("France");
  expect(awayTeamInput.value).toBe("Brazil");
  expect(homeScoreInput.value).toBe("3");
  expect(awayScoreInput.value).toBe("1");
  expect(
    screen.getByRole("button", {
      name: "Update Game",
    })
  ).toBeTruthy();

  cleanup();
  screen.unmount();
});
