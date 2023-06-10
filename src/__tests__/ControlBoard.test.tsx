import { expect, Mock, test, vitest, beforeEach, afterEach } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import ControlBoard from "../components/ControlBoard";
import { GameType } from "../data/types";

const defaultGame: GameType = {
  id: 0,
  homeTeam: "",
  awayTeam: "",
  gameEvents: [],
  status: "scheduled",
  startTime: "",
};

const scheduledGame: GameType = {
  id: 3,
  homeTeam: "Brazil",
  awayTeam: "Argentina",
  gameEvents: [],
  status: "scheduled",
  startTime: "",
};

const activeGame: GameType = {
  id: 3,
  homeTeam: "Brazil",
  awayTeam: "Argentina",
  gameEvents: [
    {
      id: 1,
      type: "goal",
      player: "Neymar",
      time: "2021-07-01T18:05:00.000Z",
      team: "Brazil",
    },
  ],
  status: "in progress",
  startTime: "2021-07-01T18:00:00.000Z",
};

let onSaveMock: Mock;
beforeEach(() => {
  // Create a new mock function before each test
  vitest.resetModules();
  onSaveMock = vitest.fn();
});

afterEach(() => {
  // Clean up any necessary state or perform cleanup actions
  // This example resets the mockOnSave function
  onSaveMock.mockReset();
});

test("when new game is passed it should show Home and Away team fields", () => {
  const screen = render(<ControlBoard game={defaultGame} onSave={() => {}} />);

  const homeTeamInput = screen.getByPlaceholderText(
    "Home Team"
  ) as HTMLInputElement;
  const awayTeamInput = screen.getByPlaceholderText(
    "Away Team"
  ) as HTMLInputElement;

  expect(homeTeamInput.value).toBe("");
  expect(awayTeamInput.value).toBe("");
  expect(
    screen.getByRole("button", {
      name: "Add Game",
    })
  ).toBeTruthy();

  cleanup();
  screen.unmount();
});

test("when we add a new game it should save valid data", () => {
  const screen = render(
    <ControlBoard game={defaultGame} onSave={onSaveMock} />
  );
  const addButton = screen.getByText("Add Game") as HTMLButtonElement;

  // Fill in form fields with valid data
  const homeTeamInput = screen.getByLabelText("Home Team");
  fireEvent.change(homeTeamInput, { target: { value: "Home Team" } });

  const awayTeamInput = screen.getByLabelText("Away Team");
  fireEvent.change(awayTeamInput, { target: { value: "Away Team" } });

  fireEvent.click(addButton);

  expect(onSaveMock).toHaveBeenCalledWith({
    id: 1,
    homeTeam: "Home Team",
    awayTeam: "Away Team",
    gameEvents: [],
    status: "scheduled",
    startTime: "",
  });
});

test("when a new game is scheduled we should show Start Game button", () => {
  const screen = render(
    <ControlBoard game={scheduledGame} onSave={() => {}} />
  );

  expect(
    screen.getByRole("button", {
      name: "Start Game",
    })
  ).toBeTruthy();

  cleanup();
  screen.unmount();
});

test("when we start a new game it should save valid data", () => {
  const screen = render(
    <ControlBoard game={scheduledGame} onSave={onSaveMock} />
  );
  const addButton = screen.getByText("Start Game") as HTMLButtonElement;
  const fakeCurrentTime = new Date("2023-06-09T12:34:56.789Z");

  vitest.spyOn(global, "Date").mockImplementation(() => fakeCurrentTime);

  fireEvent.click(addButton);

  expect(onSaveMock).toHaveBeenCalledWith({
    id: 3,
    homeTeam: "Brazil",
    awayTeam: "Argentina",
    gameEvents: [],
    status: "in progress",
    startTime: fakeCurrentTime.toISOString(),
  });
});

test("when active game is passed it should event fields", () => {
  const screen = render(<ControlBoard game={activeGame} onSave={() => {}} />);
  const teamSelector = screen.getByTestId("team-selector");
  const typeSelector = screen.getByTestId("type-selector");

  const playerInput = screen.getByPlaceholderText("Player") as HTMLInputElement;

  expect(teamSelector.childNodes[0].textContent).toBe("");
  expect(typeSelector.childNodes[0].textContent).toBe("");

  expect(playerInput.value).toBe("");
  expect(
    screen.getByRole("button", {
      name: "Add Event",
    })
  ).toBeTruthy();

  cleanup();
  screen.unmount();
});

test("when we add a new event on active game it should add new event to the game event", () => {
  const screen = render(<ControlBoard game={activeGame} onSave={onSaveMock} />);
  const teamSelector = screen.getByTestId("team-selector");
  const typeSelector = screen.getByTestId("type-selector");
  const playerInput = screen.getByPlaceholderText("Player") as HTMLInputElement;
  const addButton = screen.getByText("Add Event") as HTMLButtonElement;
  const fakeCurrentTime = new Date("2023-06-09T12:34:56.789Z");

  vitest.spyOn(global, "Date").mockImplementation(() => fakeCurrentTime);

  fireEvent.change(playerInput, { target: { value: "Neymar2" } });

  fireEvent.click(teamSelector);
  let option = screen.getByText("Brazil");
  fireEvent.click(option);

  fireEvent.click(typeSelector);
  option = screen.getByText("Goal");
  fireEvent.click(option);

  fireEvent.click(addButton);

  expect(teamSelector.childNodes[0].textContent).toBe("Brazil");
  expect(typeSelector.childNodes[0].textContent).toBe("Goal");
  expect(onSaveMock).toHaveBeenCalledWith({
    id: 3,
    homeTeam: "Brazil",
    awayTeam: "Argentina",
    gameEvents: [
      {
        id: 1,
        type: "goal",
        player: "Neymar",
        time: "2021-07-01T18:05:00.000Z",
        team: "Brazil",
      },
      {
        id: 2,
        type: "goal",
        player: "Neymar2",
        time: fakeCurrentTime.toISOString(),
        team: "Brazil",
      },
    ],
    status: "in progress",
    startTime: "2021-07-01T18:00:00.000Z",
  });
});

test("when a new game is active we should show End Game button", () => {
  const screen = render(<ControlBoard game={activeGame} onSave={() => {}} />);

  expect(screen.getAllByText("End Game")[0]).toBeTruthy();

  cleanup();
  screen.unmount();
});

test("when we click end game it should set the game as finished", () => {
  const active: GameType = {
    id: 3,
    homeTeam: "Brazil",
    awayTeam: "Argentina",
    gameEvents: [],
    status: "in progress",
    startTime: "2021-07-01T18:00:00.000Z",
  };

  const screen = render(<ControlBoard game={active} onSave={onSaveMock} />);

  const endButton = screen.getAllByText("End Game")[0] as HTMLButtonElement;
  expect(endButton).toBeTruthy();

  fireEvent.click(endButton);

  expect(onSaveMock).toHaveBeenCalledWith({
    id: 3,
    homeTeam: "Brazil",
    awayTeam: "Argentina",
    gameEvents: [],
    status: "finished",
    startTime: "2021-07-01T18:00:00.000Z",
  });

  cleanup();
  screen.unmount();
});
